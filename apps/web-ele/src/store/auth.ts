

//apps/web-ele/src/store/auth.ts

import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import { getUserInfoApi, loginApi, logoutApi, registerUserApi } from '#/api';
import { $t } from '#/locales';
import { persistencePlugin } from '#/stores/plugins/persistence';
//import { ca } from 'element-plus/es/locales.mjs';
//import { to } from '@vben/utils';


export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */

  async function authLogin(
  params: Recordable<any>,
  onSuccess?: () => Promise<void> | void,
) {
  let userInfo: null | UserInfo = null;

  try {
    loginLoading.value = true;

    // 👇 Asegúrate que `loginApi` use `withCredentials: true` en la llamada HTTP
    const response = await loginApi(params);

    if (response && response.status === 'success') {
      // ✅ Establecer token ficticio para indicar que está autenticado
      // El token real está en la cookie HttpOnly, pero necesitamos esto para el router guard
      accessStore.setAccessToken('authenticated-via-cookie');

      // Guardar la información del usuario
      userInfo = {
        username: response.user.username,
        realName: response.user.username,
        email: response.user.email,
        avatar: '',
        userId: response.user.id.toString(),
        roles: (response.user as any).roles || ['usuario'], // ✅ Roles del backend
        desc: '',
        homePath: '/dashboard/incidents', // ✅ Redirigir directamente a incidentes
        // ✅ Token ficticio para el router guard (el real está en cookie)
        token: 'authenticated-via-cookie',
      };

      userStore.setUserInfo(userInfo);

      // 🔥 Persistir datos del usuario
      persistencePlugin.saveUserInfo(userInfo);
      persistencePlugin.saveUserRoles(userInfo.roles || []);

      // Redirigir al dashboard de incidentes
      await router.push('/dashboard/incidents');

      ElNotification({
        message: response.message || $t('authentication.loginSuccessDesc'),
        title: $t('authentication.loginSuccess'),
        type: 'success',
      });

      if (onSuccess) {
        await onSuccess();
      }
    } else {
      const errorMessage = response?.message || $t('authentication.loginFailed');
      ElNotification({
        message: errorMessage,
        title: $t('authentication.loginFailed'),
        type: 'error',
      });
    }
  } catch (error: any) {
    console.error('Login error:', error);

    let errorMessage = $t('authentication.loginFailed');
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = $t('authentication.invalidCredentials');
      } else if (error.response.status === 400) {
        errorMessage = error.response.data?.message || $t('authentication.invalidCredentials');
      } else {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      }
    } else if (error.request) {
      errorMessage = $t('authentication.connectionError');
    }

    ElNotification({
      message: errorMessage,
      title: $t('authentication.loginFailed'),
      type: 'error',
    });
  } finally {
    loginLoading.value = false;
  }

  return {
    userInfo,
  };
}



  async function logout(redirect: boolean = true) {
  try {
    const response = await logoutApi();

    if (response?.data?.status === 'success') {
      ElNotification({
        title: $t('logoutSuccess') || 'Sesión cerrada',
        message: response.message || 'Cierre de sesión exitoso.',
        type: 'success',
      });
    } else {
      ElNotification({
        title: $t('authentication.logoutFailed') || 'Error al cerrar sesión',
        message: response?.message || 'No se pudo cerrar la sesión.',
        type: 'warning',
      });
    }
  } catch (error: any) {
    console.error('Logout error:', error);

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.message ||
      'Ocurrió un error al cerrar sesión.';

    ElNotification({
      title: $t('authentication.logoutFailed') || 'Error al cerrar sesión',
      message,
      type: 'error',
    });
  } finally {
    resetAllStores();
    accessStore.setLoginExpired(false);
    
    // 🔥 Limpiar datos persistidos al hacer logout
    persistencePlugin.clear();

    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }
}


async function fetchUserInfo() {
    let userInfo: null | UserInfo = null;
    try {
      console.log('🔍 Iniciando fetchUserInfo...');
      const response = await getUserInfoApi();
      console.log('📝 Respuesta getUserInfoApi:', response);
      
      // Extraer los datos del usuario desde la respuesta
      const userData = response.user || response;
      console.log('👤 Datos del usuario:', userData);
      
      userInfo = {
        username: userData.username || 'Test User',
        realName: userData.username || 'Test User',
        email: userData.email || 'test@example.com',
        avatar: '',
        userId: userData.id?.toString() || '1',
        roles: userData.roles || ['usuario'], // ✅ Roles del backend
        desc: '',
        homePath: '/dashboard/incidents', // ✅ Redirigir directamente a incidentes
        token: 'authenticated-via-cookie',
      };
      
      console.log('✅ userInfo creado:', userInfo);
      userStore.setUserInfo(userInfo);
      
      // 🔥 Persistir datos del usuario tras fetchUserInfo
      persistencePlugin.saveUserInfo(userInfo);
      persistencePlugin.saveUserRoles(userInfo.roles || []);
    } catch (error) {
      console.error('❌ Error fetching user info:', error);
      ElNotification({
        message: $t('authentication.fetchUserInfoError'),
        type: 'error',
      });
      
      // En caso de error, crear un usuario temporal para evitar bucles infinitos
      userInfo = {
        username: 'Usuario Temporal',
        realName: 'Usuario Temporal',
        email: 'temp@example.com',
        avatar: '',
        userId: '1',
        roles: ['usuario'],
        desc: '',
        homePath: '/dashboard/incidents', // ✅ Redirigir directamente a incidentes
        token: 'authenticated-via-cookie',
      };
      userStore.setUserInfo(userInfo);
    }
    return userInfo;
}

async function registerUser(userData: Recordable<any>) {
  try {
    const response = await registerUserApi(userData);
    
    return {
      status: response.status,
      success: true,
      data: response.data,
      message: response.data?.message || 'Successfully registered user'
    };

  } catch (error: any) {
    console.error('Error details:', error); // Debug detallado
    
    // Extrae los datos de error correctamente
    const errorData = error.response?.data || error;
    
    return {
      success: false,
      status: error.response?.status || 500,
      message: errorData.message || 'Error al registrar el usuario',
      errors: errorData.errors || {}  // Asegúrate de capturar los errores aquí
    };
  }
}

function $reset() {
    loginLoading.value = false;
}

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
    registerUser,
  };
});
