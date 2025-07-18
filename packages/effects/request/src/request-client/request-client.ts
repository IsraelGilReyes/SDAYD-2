// Tipos importados de axios
import type { AxiosInstance, AxiosResponse } from 'axios';

// Tipos personalizados del cliente de peticiones
import type { RequestClientConfig, RequestClientOptions } from './types';

// Funciones utilitarias
import { bindMethods, isString, merge } from '@vben/utils';

import axios from 'axios';
import qs from 'qs';

// Módulos para manejar descargas, interceptores y cargas de archivos
import { FileDownloader } from './modules/downloader';
import { InterceptorManager } from './modules/interceptor';
import { FileUploader } from './modules/uploader';

/**
 * Función auxiliar para obtener el serializador de parámetros.
 * Permite personalizar cómo se formatean los arrays en las URLs.
 */
function getParamsSerializer(
  paramsSerializer: RequestClientOptions['paramsSerializer'],
) {
  if (isString(paramsSerializer)) {
    switch (paramsSerializer) {
      case 'brackets': {
        return (params: any) =>
          qs.stringify(params, { arrayFormat: 'brackets' }); // ?a[]=1&a[]=2
      }
      case 'comma': {
        return (params: any) => qs.stringify(params, { arrayFormat: 'comma' }); // ?a=1,2
      }
      case 'indices': {
        return (params: any) =>
          qs.stringify(params, { arrayFormat: 'indices' }); // ?a[0]=1&a[1]=2
      }
      case 'repeat': {
        return (params: any) => qs.stringify(params, { arrayFormat: 'repeat' }); // ?a=1&a=2
      }
    }
  }
  // Si ya es una función personalizada, la devuelve directamente
  return paramsSerializer;
}

/**
 * Clase principal para el cliente de peticiones HTTP basado en Axios.
 */
class RequestClient {
  // Métodos públicos para agregar interceptores
  public addRequestInterceptor: InterceptorManager['addRequestInterceptor'];
  public addResponseInterceptor: InterceptorManager['addResponseInterceptor'];

  // Método para descargar archivos
  public download: FileDownloader['download'];

  // Estado para saber si se está renovando el token
  public isRefreshing = false;

  // Cola para almacenar funciones a ejecutar una vez que se renueve el token
  public refreshTokenQueue: ((token: string) => void)[] = [];

  // Método para subir archivos
  public upload: FileUploader['upload'];

  // Instancia interna de Axios
  private readonly instance: AxiosInstance;

  /**
   * Constructor: configura la instancia de Axios con opciones personalizadas
   */
  constructor(options: RequestClientOptions = {}) {
    // Configuración por defecto del cliente
    const defaultConfig: RequestClientOptions = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      responseReturn: 'raw', // Devuelve la respuesta completa por defecto
      timeout: 60_000, // Tiempo de espera: 10 segundos
       withCredentials: true,
    };

    // Mezcla la configuración por defecto con la configuración personalizada
    const { ...axiosConfig } = options;
    const requestConfig = merge(axiosConfig, defaultConfig);

    // Configura la forma en que se serializan los parámetros de la URL
    requestConfig.paramsSerializer = getParamsSerializer(
      requestConfig.paramsSerializer,
    );

    // Crea la instancia de Axios
    this.instance = axios.create(requestConfig);

    // Asegura que los métodos de clase mantengan el contexto correcto
    bindMethods(this);

    // Inicializa el manejador de interceptores
    const interceptorManager = new InterceptorManager(this.instance);
    this.addRequestInterceptor =
      interceptorManager.addRequestInterceptor.bind(interceptorManager);
    this.addResponseInterceptor =
      interceptorManager.addResponseInterceptor.bind(interceptorManager);

    // Inicializa el gestor de subida de archivos
    const fileUploader = new FileUploader(this);
    this.upload = fileUploader.upload.bind(fileUploader);

    // Inicializa el gestor de descarga de archivos
    const fileDownloader = new FileDownloader(this);
    this.download = fileDownloader.download.bind(fileDownloader);
  }

  /**
   * Método para enviar peticiones DELETE
   */
  public delete<T = any>(
    url: string,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  /**
   * Método para enviar peticiones GET
   */
  public get<T = any>(url: string, config?: RequestClientConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * Método para enviar peticiones POST
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'POST' });
  }

  /**
   * Método para enviar peticiones PUT
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'PUT' });
  }

  /**
   * Método genérico para enviar cualquier tipo de petición
   */
  public async request<T>(
    url: string,
    config: RequestClientConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
        ...(config.paramsSerializer
          ? { paramsSerializer: getParamsSerializer(config.paramsSerializer) }
          : {}),
      });
      // Retorna directamente la respuesta o los datos según la configuración
      return response as T;
    } catch (error: any) {
      // Si hay un error de red o del servidor, lanza el mensaje de error adecuado
      throw error.response ? error.response.data : error;
    }
  }
}

export { RequestClient };
