import { defineStore } from 'pinia';
import { createIncidentApi, getIncidentsApi, updateIncidentApi, deleteIncidentApi, type IncidentApi } from '#/api';
import { ElMessage } from 'element-plus';

export interface Incident {
  id?: number; // ID real de la base de datos
  type: string;
  otherType?: string;
  briefDescription: string;
  name: string;
  phone: string;
  personType: string;
  priority: string;
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

export const useIncidentsStore = defineStore('incidents', {
  state: () => ({
    incidents: [] as Incident[],
  }),
  actions: {
    addIncident(incident: Incident) {
      this.incidents.push(incident);
    },
    async createIncident(incidentData: IncidentApi.CreateIncidentParams): Promise<IncidentApi.CreateIncidentResult> {
      try {
        const response = await createIncidentApi(incidentData);
        // Si la creación es exitosa, también agregar al store local SOLO el incidente que regresa el backend
        if (response.success && response.incident) {
          const incident = response.incident as any;
          this.incidents.push({
            id: incident.id, // Usar el id real de la base de datos
            type: incident.type,
            otherType: incident.otherType,
            briefDescription: incident.briefDescription,
            name: incident.name,
            phone: incident.phone,
            personType: incident.personType,
            priority: incident.priority || 'media',
            date: incident.date,
            time: incident.time,
            calle: incident.calle,
            numero: incident.numero,
            colonia: incident.colonia,
            codigo_postal: incident.codigo_postal,
            ciudad: incident.ciudad,
            pais: incident.pais,
            referencias: incident.referencias,
            operatorName: incident.operador_nombre || '',
            operatorRole: incident.operador_rol || '',
            operatorId: incident.operatorId || '',
            submittedAt: incident.submittedAt,
          });
        }
        return response;
      } catch (error: any) {
        console.error('Error creating incident:', error);
        throw error;
      }
    },
    async fetchIncidents() {
      console.log('fetchIncidents ejecutado');
      try {
        const response = await getIncidentsApi();
        console.log('Respuesta de getIncidentsApi:', response);
        let incidentesArray = [];
        if (Array.isArray(response)) {
          incidentesArray = response;
        } else if (response && typeof response === 'object') {
          // Buscar la primera propiedad que sea un array
          const arrKey = Object.keys(response).find(key => Array.isArray(response[key]));
          if (arrKey) {
            incidentesArray = response[arrKey];
          } else {
            console.warn('No se encontró un array de incidentes en la respuesta:', response);
          }
        }
        // Asume que incidentesArray es un array de incidentes
        if (Array.isArray(incidentesArray)) {
          this.incidents = incidentesArray.map((incident: any) => ({
            id: incident.id_incidente,
            name: incident.ciudadano_nombre,
            type: incident.tipo_incidente,
            calle: incident.calle,
            numero: incident.numero,
            colonia: incident.colonia,
            codigo_postal: incident.codigo_postal,
            ciudad: incident.ciudad,
            pais: incident.pais,
            referencias: incident.referencias,
            priority: incident.prioridad,
            briefDescription: incident.descripcion,
            date: incident.fecha_hora_registro,
            time: incident.fecha_hora_registro ? new Date(incident.fecha_hora_registro).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : '',
            phone: incident.no_telefono || '',
            personType: incident.tipo_persona || '',
            operatorName: incident.operador_nombre || '',
            operatorRole: incident.operador_rol || '',
            operatorId: incident.operatorId || '',
            submittedAt: incident.submittedAt || '',
          }));
          console.log('Incidentes mapeados:', this.incidents);
        } else {
          this.incidents = [];
          console.warn('No se pudo obtener un array de incidentes.');
        }
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    },

    // --- NUEVA ACCIÓN: updateIncident ---
    async updateIncident(updatedIncident: Incident): Promise<boolean> {
      if (updatedIncident.id === undefined || updatedIncident.id === null) {
        console.error('Error: ID de incidente no definido para actualizar.');
        ElMessage.error('Error: ID de incidente no definido para actualizar.');
        return false;
      }

      try {
        // Mapear los campos del frontend a los que espera el backend
        const dataToSendToApi = {
          prioridad: updatedIncident.priority,
          descripcion: updatedIncident.briefDescription,
          ciudadano_nombre: updatedIncident.name,
          no_telefono: updatedIncident.phone,
          tipo_persona: updatedIncident.personType,
          tipo_incidente: updatedIncident.type,
          calle: updatedIncident.calle,
          numero: updatedIncident.numero,
          colonia: updatedIncident.colonia,
          codigo_postal: updatedIncident.codigo_postal,
          ciudad: updatedIncident.ciudad,
          pais: updatedIncident.pais,
          referencias: updatedIncident.referencias,
        };

        console.log('Datos a enviar al backend:', dataToSendToApi);

        const response = await updateIncidentApi(updatedIncident.id, dataToSendToApi);

        if (response.success) {
          // Si la actualización en la API fue exitosa, actualiza el estado local de Pinia
          const index = this.incidents.findIndex(inc => inc.id === updatedIncident.id);
          if (index !== -1) {
            // Reemplaza el incidente completo en el store para asegurar reactividad
            this.incidents[index] = { ...updatedIncident };
          }
          ElMessage.success('Incidente actualizado correctamente.');
          return true;
        } else {
          ElMessage.error(`Error al actualizar incidente: ${response.message || 'Desconocido'}`);
          return false;
        }
      } catch (error: any) {
        console.error('Error updating incident:', error);
        ElMessage.error(`Error al guardar el incidente: ${error.message || 'Desconocido'}`);
        return false;
      }
    },
    async deleteIncident(id: number) {
      try {
        // Hacer la llamada al backend para eliminar el incidente
        await deleteIncidentApi(id);
        // Si es exitoso, eliminar del store local
        const index = this.incidents.findIndex(incident => incident.id === id);
        if (index !== -1) {
          this.incidents.splice(index, 1);
        }
        ElMessage.success('Incidente eliminado correctamente');
        return { success: true, message: 'Incidente eliminado correctamente' };
      } catch (error) {
        console.error('Error deleting incident:', error);
        ElMessage.error('Error al eliminar el incidente');
        throw error;
      }
    },
    setIncidents(incidents: Incident[]) {
      this.incidents = incidents;
    },
    clearIncidents() {
      this.incidents = [];
    },
  },
}); 
 