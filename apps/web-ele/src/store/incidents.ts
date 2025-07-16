import { defineStore } from 'pinia';
import { createIncidentApi, getIncidentsApi, type IncidentApi } from '#/api';

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
            operatorName: incident.operatorName,
            operatorRole: incident.operatorRole,
            operatorId: incident.operatorId,
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
            // Otros campos opcionales
            phone: incident.phone || '',
            personType: incident.personType || '',
            time: incident.time || '',
            otherType: incident.otherType || '',
            operatorName: incident.operatorName || '',
            operatorRole: incident.operatorRole || '',
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
    setIncidents(incidents: Incident[]) {
      this.incidents = incidents;
    },
    clearIncidents() {
      this.incidents = [];
    },
    deleteIncident(index: number) {
      this.incidents.splice(index, 1);
    },
  },
}); 
 