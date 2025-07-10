// apps/web-ele/src/store/users.ts
import { defineStore } from 'pinia';
import { 
  getUserListApi, 
  createUserApi, 
  updateUserApi, 
  deleteUserApi, 
  changeUserPasswordApi,
  getRoleListApi,
  assignRoleApi,
  type UserApi 
} from '#/api/core/users';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as UserApi.UserInfo[],
    roles: [] as UserApi.RoleInfo[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    /**
     * Cargar la lista de usuarios
     */
    async loadUsers() {
      this.loading = true;
      this.error = null;
      
      try {
        const users = await getUserListApi();
        // Asegurar que users sea un array
        this.users = Array.isArray(users) ? users : [];
        return { success: true, data: this.users };
      } catch (error: any) {
        this.error = error.message || 'Error al cargar usuarios';
        this.users = []; // Asegurar que users sea un array vacío en caso de error
        console.error('Error loading users:', error);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Cargar la lista de roles
     */
    async loadRoles() {
      try {
        const roles = await getRoleListApi();
        // Asegurar que roles sea un array
        this.roles = Array.isArray(roles) ? roles : [];
        return { success: true, data: this.roles };
      } catch (error: any) {
        console.error('Error loading roles:', error);
        this.roles = []; // Asegurar que roles sea un array vacío en caso de error
        return { success: false, message: error.message || 'Error al cargar roles' };
      }
    },

    /**
     * Crear un nuevo usuario
     */
    async createUser(userData: UserApi.CreateUserParams) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await createUserApi(userData);
        
        if (result.success) {
          // Recargar la lista de usuarios
          await this.loadUsers();
        }
        
        return result;
      } catch (error: any) {
        this.error = error.message || 'Error al crear usuario';
        console.error('Error creating user:', error);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Actualizar un usuario existente
     */
    async updateUser(userId: number, userData: UserApi.UpdateUserParams) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await updateUserApi(userId, userData);
        
        if (result.success) {
          // Recargar la lista de usuarios
          await this.loadUsers();
        }
        
        return result;
      } catch (error: any) {
        this.error = error.message || 'Error al actualizar usuario';
        console.error('Error updating user:', error);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Eliminar un usuario
     */
    async deleteUser(userId: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await deleteUserApi(userId);
        
        if (result.success) {
          // Recargar la lista de usuarios
          await this.loadUsers();
        }
        
        return result;
      } catch (error: any) {
        this.error = error.message || 'Error al eliminar usuario';
        console.error('Error deleting user:', error);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Cambiar la contraseña de un usuario
     */
    async changeUserPassword(userId: number, passwordData: UserApi.ChangePasswordParams) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await changeUserPasswordApi(userId, passwordData);
        return result;
      } catch (error: any) {
        this.error = error.message || 'Error al cambiar contraseña';
        console.error('Error changing password:', error);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Asignar un rol a un usuario
     */
    async assignRole(userId: number, roleId: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const result = await assignRoleApi(userId, roleId);
        
        if (result.success) {
          // Recargar la lista de usuarios
          await this.loadUsers();
        }
        
        return result;
      } catch (error: any) {
        this.error = error.message || 'Error al asignar rol';
        console.error('Error assigning role:', error);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Limpiar errores
     */
    clearError() {
      this.error = null;
    },

    /**
     * Obtener usuario por ID
     */
    getUserById(userId: number) {
      return this.users.find(user => user.id === userId);
    },

    /**
     * Obtener rol por nombre
     */
    getRoleByName(roleName: string) {
      return this.roles.find(role => role.name === roleName);
    }
  },

  getters: {
    /**
     * Obtener usuarios activos
     */
    activeUsers: (state) => {
      return Array.isArray(state.users) ? state.users.filter(user => user.is_active) : [];
    },

    /**
     * Obtener administradores
     */
    adminUsers: (state) => {
      return Array.isArray(state.users) ? state.users.filter(user => user.roles.includes('administrador')) : [];
    },

    /**
     * Obtener usuarios normales
     */
    normalUsers: (state) => {
      return Array.isArray(state.users) ? state.users.filter(user => user.roles.includes('usuario')) : [];
    },

    /**
     * Contar usuarios por rol
     */
    userCountByRole: (state) => {
      if (!Array.isArray(state.users)) return {};
      
      const counts: Record<string, number> = {};
      state.users.forEach(user => {
        user.roles.forEach(role => {
          counts[role] = (counts[role] || 0) + 1;
        });
      });
      return counts;
    }
  }
});
