import { defineStore } from 'pinia';
import { createIncidentApi, type IncidentApi } from '#/api';

export interface Incident {
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
        
        // Si la creación es exitosa, también agregar al store local
        if (response.success && response.incident) {
          const incident = response.incident as any; // Usar any para acceder a campos dinámicos
          this.incidents.push({
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
 