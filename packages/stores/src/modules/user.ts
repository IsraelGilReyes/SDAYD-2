import { acceptHMRUpdate, defineStore } from 'pinia';

interface BasicUserInfo {
  [key: string]: any;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 用户昵称
   */
  realName: string;
  /**
   * 用户角色
   */
  roles?: string[];
  /**
   * 用户id
   */
  userId: string;
  /**
   * 用户名
   */
  username: string;
}

interface AccessState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null;
  /**
   * 用户角色
   */
  userRoles: string[];
}

// Plugin de persistencia simple para el user store
const persistencePlugin = {
  USER_INFO_KEY: 'vben_user_info',
  USER_ROLES_KEY: 'vben_user_roles',

  saveUserInfo(userInfo: BasicUserInfo | null) {
    if (userInfo) {
      try {
        localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
      } catch (error) {
        console.warn('Error saving user info to localStorage:', error);
      }
    } else {
      localStorage.removeItem(this.USER_INFO_KEY);
    }
  },

  loadUserInfo(): BasicUserInfo | null {
    try {
      const saved = localStorage.getItem(this.USER_INFO_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Error loading user info from localStorage:', error);
      localStorage.removeItem(this.USER_INFO_KEY);
    }
    return null;
  },

  saveUserRoles(roles: string[]) {
    try {
      localStorage.setItem(this.USER_ROLES_KEY, JSON.stringify(roles));
    } catch (error) {
      console.warn('Error saving user roles to localStorage:', error);
    }
  },

  loadUserRoles(): string[] {
    try {
      const saved = localStorage.getItem(this.USER_ROLES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Error loading user roles from localStorage:', error);
      localStorage.removeItem(this.USER_ROLES_KEY);
    }
    return [];
  },

  clear() {
    localStorage.removeItem(this.USER_INFO_KEY);
    localStorage.removeItem(this.USER_ROLES_KEY);
  }
};

/**
 * @zh_CN 用户信息相关
 */
export const useUserStore = defineStore('core-user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo | null) {
      // 设置用户信息
      this.userInfo = userInfo;
      // 设置角色信息
      const roles = userInfo?.roles ?? [];
      this.setUserRoles(roles);
      
      // Persistir la información del usuario
      persistencePlugin.saveUserInfo(userInfo);
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles;
      // Persistir los roles del usuario
      persistencePlugin.saveUserRoles(roles);
    },
    
    // Nuevo método para cargar datos desde localStorage
    loadFromPersistence() {
      const savedUserInfo = persistencePlugin.loadUserInfo();
      const savedRoles = persistencePlugin.loadUserRoles();
      
      if (savedUserInfo) {
        this.userInfo = savedUserInfo;
        this.userRoles = savedRoles;
        console.log('🔄 Datos del usuario cargados desde localStorage:', savedUserInfo);
        return true;
      }
      return false;
    },
    
    // Nuevo método para limpiar datos
    clearUserData() {
      this.userInfo = null;
      this.userRoles = [];
      persistencePlugin.clear();
    },
    
    // Limpiar persistencia al hacer reset
    $reset() {
      this.userInfo = null;
      this.userRoles = [];
      persistencePlugin.clear();
    }
  },
  state: (): AccessState => {
    // Intentar cargar datos desde localStorage al inicializar
    const savedUserInfo = persistencePlugin.loadUserInfo();
    const savedRoles = persistencePlugin.loadUserRoles();
    
    if (savedUserInfo) {
      console.log('🚀 Inicializando store con datos persistidos:', savedUserInfo);
      return {
        userInfo: savedUserInfo,
        userRoles: savedRoles,
      };
    }
    
    return {
      userInfo: null,
      userRoles: [],
    };
  },
});

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
