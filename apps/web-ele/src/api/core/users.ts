// apps/web-ele/src/api/core/users.ts
import { baseRequestClient } from '#/api/request';
import type { Recordable } from '@vben/types';

// Define el namespace para la API de usuarios
export namespace UserApi {
  /** Información básica del usuario */
  export interface UserInfo {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: string;
    last_login: string | null;
    roles: string[];
  }

  /** Parámetros para crear un usuario */
  export interface CreateUserParams {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
    is_staff?: boolean;
    role_name?: string;
  }

  /** Parámetros para actualizar un usuario */
  export interface UpdateUserParams {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
    is_staff?: boolean;
    role_name?: string;
  }

  /** Parámetros para cambiar contraseña */
  export interface ChangePasswordParams {
    new_password: string;
    confirm_password: string;
  }

  /** Información del rol */
  export interface RoleInfo {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
  }

  /** Resultado de operaciones */
  export interface ApiResult {
    success: boolean;
    message: string;
    data?: any;
    errors?: Recordable<string[]>;
  }
}

/**
 * Función para obtener la lista de usuarios
 */
export async function getUserListApi(): Promise<UserApi.UserInfo[]> {
  const response = await baseRequestClient.get('/auth/users/');
  return response.data || response; // Extraer data si existe, sino usar response directamente
}

/**
 * Función para crear un nuevo usuario
 */
export async function createUserApi(userData: UserApi.CreateUserParams): Promise<UserApi.ApiResult> {
  return baseRequestClient.post('/auth/users/create/', userData);
}

/**
 * Función para actualizar un usuario
 */
export async function updateUserApi(userId: number, userData: UserApi.UpdateUserParams): Promise<UserApi.ApiResult> {
  return baseRequestClient.put(`/auth/users/${userId}/`, userData);
}

/**
 * Función para eliminar un usuario
 */
export async function deleteUserApi(userId: number): Promise<UserApi.ApiResult> {
  return baseRequestClient.delete(`/auth/users/${userId}/`);
}

/**
 * Función para cambiar la contraseña de un usuario
 */
export async function changeUserPasswordApi(userId: number, passwordData: UserApi.ChangePasswordParams): Promise<UserApi.ApiResult> {
  return baseRequestClient.post(`/auth/users/${userId}/change-password/`, passwordData);
}

/**
 * Función para obtener la lista de roles
 */
export async function getRoleListApi(): Promise<UserApi.RoleInfo[]> {
  const response = await baseRequestClient.get('/auth/roles/');
  return response.data || response; // Extraer data si existe, sino usar response directamente
}

/**
 * Función para asignar un rol a un usuario
 */
export async function assignRoleApi(userId: number, roleId: number): Promise<UserApi.ApiResult> {
  return baseRequestClient.post('/auth/assign-role/', {
    user_id: userId,
    role_id: roleId
  });
}

/**
 * Función para obtener información de un usuario específico
 */
export async function getUserDetailApi(userId: number): Promise<UserApi.UserInfo> {
  const response = await baseRequestClient.get(`/auth/users/${userId}/`);
  return response.data || response; // Extraer data si existe, sino usar response directamente
}
