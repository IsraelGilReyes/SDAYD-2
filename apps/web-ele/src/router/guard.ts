import type { Router } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * Verifica si hay una sesión activa mediante cookies
 */
function hasActiveSession(): boolean {
  // Verifica si existe la cookie de access_token de nuestro sistema
  const sessionCookie = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('access_token='));
  
  console.log('🔍 Verificando cookies de sesión:', document.cookie);
  console.log('🔍 Cookie encontrada:', sessionCookie);
  
  return !!sessionCookie;
}

/**
 * 通用守卫配置
 * @param router
 */
function setupCommonGuard(router: Router) {
  // 记录已经加载的页面
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // 页面加载进度条
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // 记录页面是否加载,如果已经加载，后续的页面切换动画等效果不在重复执行

    loadedPaths.add(to.path);

    // 关闭页面加载进度条
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // 基本路由，这些路由不需要进入权限拦截
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && (accessStore.accessToken || hasActiveSession())) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
            userStore.userInfo?.homePath ||
            preferences.app.defaultHomePath,
        );
      }
      return true;
    }

    // 🔒 Verificación de autenticación PRIMERO
    const hasValidCookies = hasActiveSession();
    const hasTokenInStore = !!accessStore.accessToken;
    const hasUserInfo = !!userStore.userInfo;
    
    console.log('🔍 Estado de autenticación:', {
      hasValidCookies,
      hasTokenInStore,
      hasUserInfo,
      currentPath: to.fullPath
    });

    // Si NO hay cookies válidas Y NO hay token en store, redirigir al login
    if (!hasValidCookies && !hasTokenInStore) {
      // Permitir rutas que ignoran autenticación (como login, register)
      if (to.meta.ignoreAccess) {
        return true;
      }

      console.log('❌ No hay autenticación válida, redirigiendo al login');
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          query: to.fullPath === preferences.app.defaultHomePath
            ? {}
            : { redirect: encodeURIComponent(to.fullPath) },
          replace: true,
        };
      }
      return to;
    }

    // Si hay cookies pero no hay información del usuario, obtenerla del servidor
    if (hasValidCookies && !hasUserInfo) {
      console.log('🔄 Cookies válidas pero sin info de usuario, obteniendo del servidor...');
      try {
        const userInfo = await authStore.fetchUserInfo();
        if (userInfo) {
          accessStore.setAccessToken('authenticated-via-cookie');
        } else {
          // Si no se puede obtener la información, limpiar cookies y redirigir
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          return {
            path: LOGIN_PATH,
            query: { redirect: encodeURIComponent(to.fullPath) },
            replace: true,
          };
        }
      } catch (error) {
        console.error('❌ Error obteniendo info del usuario:', error);
        // Limpiar cookies corruptas y redirigir al login
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        return {
          path: LOGIN_PATH,
          query: { redirect: encodeURIComponent(to.fullPath) },
          replace: true,
        };
      }
    } else if (hasUserInfo && !hasTokenInStore) {
      // Si hay info del usuario pero no token en store, establecerlo
      console.log('✅ Restaurando token desde localStorage');
      accessStore.setAccessToken('authenticated-via-cookie');
    }

    // 是否已经生成过动态路由
    if (accessStore.isAccessChecked) {
      return true;
    }

    // 生成路由表 - En este punto YA TENEMOS información del usuario
    const userInfo = userStore.userInfo;
    
    if (!userInfo) {
      // Esto no debería pasar, pero por seguridad redirigir al login
      console.error('❌ No hay información del usuario después de la verificación');
      return {
        path: LOGIN_PATH,
        query: { redirect: encodeURIComponent(to.fullPath) },
        replace: true,
      };
    }
    
    const userRoles = userInfo.roles ?? [];

    // 生成菜单和路由
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      // 则会在菜单中显示，但是访问会被重定向到403
      routes: accessRoutes,
    });

    // 保存菜单信息和路由信息
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ??
      (to.path === preferences.app.defaultHomePath
        ? (userInfo?.homePath || preferences.app.defaultHomePath)
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 通用 */
  setupCommonGuard(router);
  /** 权限访问 */
  setupAccessGuard(router);
}

export { createRouterGuard };
