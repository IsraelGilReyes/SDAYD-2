/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { RequestClientOptions } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';
import { LOGIN_PATH } from '@vben/constants';

import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

import { useAuthStore } from '#/store';
import { $t } from '#/locales';

import { refreshTokenApi } from './core';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

// Configuración de la URL base del API
const API_BASE_URL = '';  // Cambiado a string vacío ya que usamos rutas relativas

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000, // 10 segundos de timeout
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
  });

  // 处理返回的响应数据格式
  client.addResponseInterceptor({
    fulfilled: (response) => {
      // Si la respuesta es exitosa, devolver los datos directamente
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return response;
    },
    rejected: (error) => {
      return Promise.reject(error);
    },
  });

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? msg;
      // 如果没有错误信息，则会根据状态码进行提示
      ElMessage.error(errorMessage);
    }),
  );

  // Interceptor para manejar errores de red
  client.addResponseInterceptor({
    rejected: (error: any) => {
      const router = useRouter();
      
      if (!error.response) {
        ElMessage.error($t('authentication.connectionError'));
      } else if (error.response.status === 401) {
        ElMessage.error($t('authentication.unauthorized'));
        // Redirigir al login si no estamos ya en esa página
        const currentPath = window.location.pathname;
        if (!currentPath.includes(LOGIN_PATH)) {
          router.replace({
            path: LOGIN_PATH,
            query: {
              redirect: encodeURIComponent(currentPath),
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

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
