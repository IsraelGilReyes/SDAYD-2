

//apps/web-ele/src/store/auth.ts

import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import { getUserInfoApi, loginApi, logoutApi } from '#/api';
import { $t } from '#/locales';
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
      // ✅ No guardamos access token, porque ya está en cookie HttpOnly

      // Guardar la información del usuario
      userInfo = {
        username: response.user.username,
        realName: response.user.username,
        email: response.user.email,
        avatar: '',
        userId: response.user.id.toString(),
        roles: [],
        desc: '',
        homePath: '/dashboard',
        // ❌ Ya no se guarda el token
        token: '',
      };

      userStore.setUserInfo(userInfo);

      // Redirigir al dashboard
      await router.push('/dashboard');

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
      userInfo = await getUserInfoApi();
      userStore.setUserInfo(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
      ElNotification({
        message: $t('authentication.fetchUserInfoError'),
        type: 'error',
      });
    }
    return userInfo;
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
  };
});
