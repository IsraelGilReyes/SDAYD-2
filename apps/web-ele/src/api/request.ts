/**
 * apps/web-ele/src/api/request.ts
 * Este archivo puede ser modificado libremente según la lógica del negocio
 */
import type { RequestClientOptions } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor, // Interceptor para manejar autenticación (e.g., renovación de token)
  errorMessageResponseInterceptor, // Interceptor para mostrar errores de forma amigable
  RequestClient, // Cliente HTTP personalizado
} from '@vben/request';
import { useAccessStore } from '@vben/stores';
import { LOGIN_PATH } from '@vben/constants';

import { ElMessage } from 'element-plus'; // Para mostrar mensajes de error
import { useRouter } from 'vue-router'; // Para redirecciones en caso de error (por ejemplo, a login)

import { useAuthStore } from '#/store';
import { $t } from '#/locales'; // Función para traducción (i18n)

import { refreshTokenApi } from './core'; // API para renovar el token

// Obtiene la URL base del API desde la configuración de la aplicación
const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

// Se define manualmente como cadena vacía para usar rutas relativas
const API_BASE_URL = 'http://localhost:8000/';

/**
 * Función para crear una instancia personalizada de RequestClient
 */
function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL: API_BASE_URL,
    withCredentials: true, // Enviar cookies con cada petición
    timeout: 10000, // Tiempo máximo de espera: 10 segundos
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  /**
   * Función que se ejecuta cuando el token de acceso no es válido o ha expirado
   */
  async function doReAuthenticate() {
    console.warn('El access token o refresh token es inválido o ha expirado.');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      // Mostrar modal de sesión expirada
      accessStore.setLoginExpired(true);
    } else {
      // Cierra sesión directamente
      await authStore.logout();
    }
  }

  /**
   * Lógica para renovar el token de acceso utilizando un refresh token
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  // Formatea el token para el encabezado Authorization
  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // Interceptor para añadir cabeceras antes de enviar una solicitud
  client.addRequestInterceptor({
  fulfilled: async (config) => {
    const accessStore = useAccessStore();
    
    // Excluir rutas públicas que no necesitan token
    const publicRoutes = ['/auth/login/', '/auth/refresh/'];
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
    
    if (!isPublicRoute && accessStore.accessToken) {
      config.headers.Authorization = `Bearer ${accessStore.accessToken}`;
    }
    
    // Configuración especial para logout
    if (config.url?.includes('/auth/logout/')) {
      config.withCredentials = true;
      // Forzar el envío del token incluso si el interceptor falló
      if (!config.headers.Authorization && accessStore.accessToken) {
        config.headers.Authorization = `Bearer ${accessStore.accessToken}`;
      }
    }
    
    return config;
  }
});

  // Interceptor para manejar las respuestas exitosas
  client.addResponseInterceptor({
    fulfilled: (response) => {
      // Si la respuesta fue exitosa, devolver solo los datos
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return response;
    },
    rejected: (error) => {
      return Promise.reject(error);
    },
  });

  // Interceptor para manejar la expiración del token
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate, // Qué hacer si la autenticación falla
      doRefreshToken,   // Qué hacer si se necesita renovar el token
      enableRefreshToken: preferences.app.enableRefreshToken, // ¿Se permite usar refresh token?
      formatToken,
    }),
  );

  // Interceptor para errores genéricos, muestra mensajes amigables
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? msg;
      ElMessage.error(errorMessage); // Muestra mensaje de error al usuario
    }),
  );

  // Interceptor para errores específicos de red y autenticación
  client.addResponseInterceptor({
    rejected: (error: any) => {
      const router = useRouter();
      
      if (!error.response) {
        // No hay conexión con el servidor
        ElMessage.error($t('authentication.connectionError'));
      } else if (error.response.status === 401) {
        // No autorizado
        ElMessage.error($t('authentication.unauthorized'));
        const currentPath = window.location.pathname;
        if (!currentPath.includes(LOGIN_PATH)) {
          router.replace({
            path: LOGIN_PATH,
            query: {
              redirect: encodeURIComponent(currentPath), // Guarda la ruta original para volver luego
            },
          });
        }
      } else if (error.response.status === 403) {
        ElMessage.error($t('authentication.forbidden'));
      } else if (error.response.status === 404) {
        ElMessage.error($t('authentication.notFound'));
      } else if (error.response.status === 500) {
        ElMessage.error($t('authentication.serverError'));
      }
      return Promise.reject(error);
    }
  });

  return client;
}

// Crea y exporta el cliente principal de solicitudes (con interceptores y lógica personalizada)
export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data', // Solo retorna la propiedad 'data' de la respuesta
});

// Cliente base sin interceptores, más simple
export const baseRequestClient = new RequestClient({ baseURL: API_BASE_URL, withCredentials: true });
