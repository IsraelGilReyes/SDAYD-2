// apps/web-ele/src/api/core/auth.ts
// Importa dos clientes de solicitud HTTP desde el módulo de peticiones de la aplicación
import { baseRequestClient, requestClient } from '#/api/request';


// Define un espacio de nombres (namespace) llamado AuthApi que contiene interfaces relacionadas con la autenticación
export namespace AuthApi {
  /** Parámetros esperados para el inicio de sesión */
  export interface LoginParams {
    password?: string; // Contraseña del usuario (opcional)
    username?: string; // Nombre de usuario (opcional)
  }

  /** Resultado que devuelve el servidor al iniciar sesión */
  export interface LoginResult {
  status: string;
  message?: string;
  user: {
    id: number;
    username: string;
    email: string;
  };

}

  /** Resultado al refrescar el token de acceso */
  export interface RefreshTokenResult {
    status: string;
    message?: string;
  }
}

/**
 * Función para iniciar sesión.
 * Envía una solicitud POST al endpoint '/auth/login/' con los datos de inicio de sesión.
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login/', data);
}

/**
 * Función para refrescar el token de acceso (accessToken).
 * Envía una solicitud POST al endpoint '/auth/refresh/'.
 * Se incluyen las cookies con la solicitud (withCredentials: true).
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh/', {
    withCredentials: true,
  });
}

/**
 * Función para cerrar sesión.
 * Envía una solicitud POST al endpoint '/auth/logout/'.
 * También incluye las cookies para poder eliminar la sesión en el servidor.
 */

  export async function logoutApi() {

  return baseRequestClient.post('/auth/logout/', {}, {
    withCredentials: true,
  });
}



/**
 * Función para obtener los códigos de acceso (permisos del usuario).
 * Envía una solicitud GET al endpoint '/auth/codes/'.
 * Devuelve un array de strings con los códigos de permiso.
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes/');
}
