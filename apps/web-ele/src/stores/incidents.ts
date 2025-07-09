import { defineStore } from 'pinia';

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
 