// apps/web-ele/src/api/core/incidents.ts
import { baseRequestClient } from '#/api/request';
import type { Recordable } from '@vben/types';

// Define el namespace para la API de incidentes
export namespace IncidentApi {
  /** Parámetros para crear un incidente */
  export interface CreateIncidentParams {
    type: string;
    otherType?: string;
    briefDescription: string;
    name: string;
    phone: string;
    personType: string;
    date: string;
    time: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    codigo_postal?: string;
    ciudad?: string;
    pais?: string;
    referencias?: string;
    operatorName?: string;
    operatorRole?: string;
    operatorId?: string;
    submittedAt?: string;
  }

  /** Resultado al crear un incidente */
  export interface CreateIncidentResult {
    success: boolean;
    message: string;
    incident?: {
      id: number;
      type: string;
      briefDescription: string;
      name: string;
      phone: string;
      personType: string;
      date: string;
      time: string;
      operatorName: string;
      operatorRole: string;
      submittedAt: string;
    };
    errors?: Recordable<string[]>;
  }

  /** Parámetros para actualizar un incidente */
  export interface UpdateIncidentParams {
    prioridad?: string;
    descripcion?: string;
    ciudadano_nombre?: string;
    no_telefono?: string;
    tipo_persona?: string;
    tipo_incidente?: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    codigo_postal?: string;
    ciudad?: string;
    pais?: string;
    referencias?: string;
  }

  /** Resultado al actualizar un incidente */
  export interface UpdateIncidentResult {
    success: boolean;
    message: string;
    incident?: {
      id_incidente: number;
      // ... los campos del incidente actualizado que el backend devuelve
    };
    errors?: Recordable<string[]>;
  }
}

/** Interfaz para representar un incidente */
export interface Incident {
  id: number;
  type: string;
  otherType?: string;
  briefDescription: string;
  name: string;
  phone: string;
  personType: string;
  date: string;
  time: string;
  priority?: string;
  calle?: string;
  numero?: string;
  colonia?: string;
  codigo_postal?: string;
  ciudad?: string;
  pais?: string;
  referencias?: string;
  operatorName?: string;
  operatorRole?: string;
  operatorId?: string;
  submittedAt?: string;
}
/**
 * Función para crear un nuevo incidente.
 * Envía una solicitud POST al endpoint '/incidents/create/'.
 */
export async function createIncidentApi(incidentData: IncidentApi.CreateIncidentParams): Promise<IncidentApi.CreateIncidentResult> {
  const response = await baseRequestClient.post('/incidents/create/', incidentData);
  return response.data || response; // Extrae data si existe, sino usa la respuesta directa
}

/**
 * Función para obtener todos los incidentes.
 * Envía una solicitud GET al endpoint '/incidents/'.
 */
export async function getIncidentsApi() {
  return baseRequestClient.get('/incidents/url/');
}

/**
 * Función para obtener un incidente específico por ID.
 * Envía una solicitud GET al endpoint '/incidents/{id}/'.
 */
export async function getIncidentApi(id: number) {
  return baseRequestClient.get(`/incidents/${id}/`);
}

/**
 * Función para actualizar un incidente.
 * Envía una solicitud PUT al endpoint '/incidents/{id}/update/'.
 */
export async function updateIncidentApi(id: number, incidentData: IncidentApi.UpdateIncidentParams): Promise<IncidentApi.UpdateIncidentResult> {
  const response = await baseRequestClient.put(`/incidents/${id}/update/`, incidentData);
  return response.data || response;
}

/**
 * Función para eliminar un incidente.
 * Envía una solicitud DELETE al endpoint '/incidents/{id}/delete/'.
 */
export async function deleteIncidentApi(id: number) {
  return baseRequestClient.delete(`/incidents/${id}/delete/`);
}
