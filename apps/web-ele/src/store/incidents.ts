import { defineStore } from 'pinia';
import { createIncidentApi, type IncidentApi } from '#/api';

export interface Incident {
  type: string;
  date: string;
  time: string;
  lugar: string;
  name: string;
  phone: string;
  personType: string;
  exactAddress: string;
  description: string;
  officerObservations: string;
  officerConclusions: string;
  latitude?: string;
  longitude?: string;
  referencePoints?: string;
  escapeRoutes?: string;
  securityCameras?: string;
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
        
        // Si la creación es exitosa, también agregar al store local
        if (response.success && response.incident) {
          this.incidents.push({
            type: response.incident.type,
            date: response.incident.date,
            time: response.incident.time,
            lugar: '', // El backend no devuelve este campo
            name: response.incident.name,
            phone: response.incident.phone,
            personType: response.incident.personType,
            exactAddress: '', // El backend no devuelve este campo
            description: response.incident.briefDescription,
            officerObservations: '',
            officerConclusions: '',
          });
        }
        
        return response;
      } catch (error: any) {
        console.error('Error creating incident:', error);
        throw error;
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
 