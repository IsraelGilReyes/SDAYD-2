/**
 * apps/web-ele/src/api/request.ts
 * Este archivo puede ser modificado libremente según la lógica del negocio
 */
import type { RequestClientOptions } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import {
  errorMessageResponseInterceptor, // Interceptor para mostrar errores de forma amigable
  RequestClient, // Cliente HTTP personalizado
} from '@vben/request';

import { LOGIN_PATH } from '@vben/constants';

import { ElMessage } from 'element-plus'; // Para mostrar mensajes de error

// import { useAuthStore } from '#/store'; // Temporalmente comentado
import { $t } from '#/locales'; // Función para traducción (i18n)



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
    baseURL: API_BASE_URL, // Usar la URL base del API
    withCredentials: true, // Enviar cookies con cada petición
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  // 🔐 Manejo de sesión expirada
  // Temporalmente comentado
  /*
  async function doReAuthenticate() {
    console.warn('La sesión ha expirado o el token no es válido.');
    const authStore = useAuthStore();

    await authStore.logout(); // Cerrar sesión directamente
  }

  // ✅ Implementar lógica de refresh token
  async function doRefreshToken() {
    try {
      console.log('Intentando refrescar el token...');
      const response = await baseRequestClient.post('/auth/refresh/', {}, {
        withCredentials: true,
      });
      
      if (response && response.status === 'success') {
        console.log('Token refrescado exitosamente');
        return 'success';
      } else {
        throw new Error('Error al refrescar token');
      }
    } catch (error) {
      console.error('Error al refrescar token:', error);
      throw error;
    }
  }
  */

  // ✅ Agregar interceptor para refresh automático
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      // Solo marcar que las cookies deben enviarse en peticiones protegidas
      const publicRoutes = ['/auth/login/', '/auth/refresh/'];
      const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

      if (!isPublicRoute) {
        config.withCredentials = true;
      }

      // Logout también debe enviar cookies
      if (config.url?.includes('/auth/logout/')) {
        config.withCredentials = true;
      }

      return config;
    }
  });

  // ✅ Devolver solo los datos si la respuesta es exitosa
  client.addResponseInterceptor({
    fulfilled: (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return response;
    },
    rejected: (error) => {
      return Promise.reject(error);
    },
  });

  // 🧠 Mostrar errores de forma amigable
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? msg;
      ElMessage.error(errorMessage);
    }),
  );

  // ❗ Manejo de errores de red y autenticación
  client.addResponseInterceptor({
    rejected: (error: any) => {
      if (!error.response) {
        ElMessage.error($t('authentication.connectionError'));
      } else if (error.response.status === 401) {
        ElMessage.error($t('authentication.unauthorized'));

        const currentPath = window.location.pathname;
        if (!currentPath.includes(LOGIN_PATH)) {
          // ✅ Usar window.location en lugar de router para evitar problemas de contexto
          window.location.href = `${LOGIN_PATH}?redirect=${encodeURIComponent(currentPath)}`;
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

  // ✅ Agregar interceptor de refresh automático del token
  // Temporalmente comentado para evitar conflictos
  /*
  client.addResponseInterceptor({
    rejected: async (error: any) => {
      // Si es error 401 y no estamos ya intentando refrescar
      if (error.response?.status === 401 && !client.isRefreshing) {
        client.isRefreshing = true;
        
        try {
          // Intentar refrescar el token
          await doRefreshToken();
          
          // Si el refresh fue exitoso, reintentar la petición original
          const originalRequest = error.config;
          return client.request(originalRequest.url, originalRequest);
          
        } catch (refreshError) {
          // Si el refresh falla, hacer logout
          await doReAuthenticate();
          return Promise.reject(refreshError);
        } finally {
          client.isRefreshing = false;
        }
      }
      
      return Promise.reject(error);
    }
  });
  */

  return client;
}


// Crea y exporta el cliente principal de solicitudes (con interceptores y lógica personalizada)
export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data', // Solo retorna la propiedad 'data' de la respuesta
});

// Cliente base sin interceptores, más simple
export const baseRequestClient = new RequestClient({ baseURL: API_BASE_URL, withCredentials: true });
