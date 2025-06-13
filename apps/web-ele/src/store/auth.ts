import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import { getUserInfoApi, loginApi, logoutApi } from '#/api';
import { $t } from '#/locales';

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
      const response = await loginApi(params);

      // Verificar si la respuesta es exitosa
      if (response && response.status === 'success') {
        // Guardar la información del usuario
        userInfo = {
          username: response.user.username,
          realName: response.user.username,
          avatar: '',
          userId: response.user.id.toString(),
          roles: [],
          desc: '',
          homePath: '/dashboard',
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
        // Manejar respuesta no exitosa
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
        // Error de respuesta del servidor S
        if (error.response.status === 401) {
          errorMessage = $t('authentication.invalidCredentials');
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.message || $t('authentication.invalidCredentials');
        } else {
          errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
        }
      } else if (error.request) {
        // Error de red (no se recibió respuesta)
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
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
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
