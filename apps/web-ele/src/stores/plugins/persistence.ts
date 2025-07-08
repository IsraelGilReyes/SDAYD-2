// apps/web-ele/src/stores/plugins/persistence.ts
import type { UserInfo } from '@vben/types';

const USER_INFO_KEY = 'vben_user_info';
const USER_ROLES_KEY = 'vben_user_roles';

export const persistencePlugin = {
  // Guardar información del usuario
  saveUserInfo(userInfo: UserInfo | null) {
    if (userInfo) {
      try {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
      } catch (error) {
        console.warn('Error saving user info to localStorage:', error);
      }
    } else {
      localStorage.removeItem(USER_INFO_KEY);
    }
  },

  // Cargar información del usuario
  loadUserInfo(): UserInfo | null {
    try {
      const saved = localStorage.getItem(USER_INFO_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Error loading user info from localStorage:', error);
      localStorage.removeItem(USER_INFO_KEY); // Limpiar datos corruptos
    }
    return null;
  },

  // Guardar roles del usuario
  saveUserRoles(roles: string[]) {
    try {
      localStorage.setItem(USER_ROLES_KEY, JSON.stringify(roles));
    } catch (error) {
      console.warn('Error saving user roles to localStorage:', error);
    }
  },

  // Cargar roles del usuario
  loadUserRoles(): string[] {
    try {
      const saved = localStorage.getItem(USER_ROLES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Error loading user roles from localStorage:', error);
      localStorage.removeItem(USER_ROLES_KEY); // Limpiar datos corruptos
    }
    return [];
  },

  // Limpiar toda la información persistida
  clear() {
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(USER_ROLES_KEY);
  }
};
