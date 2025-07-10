<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>🚔 Sistema de Gestión de Incidentes</h1>
      <p>Panel de control para el registro y seguimiento de incidentes</p>
    </div>
    <div class="dashboard-content">
      <IncidentForm @add-incident="handleAddIncident" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IncidentForm from '../_core/incident/IncidentForm.vue'
import { useIncidentsStore, type Incident } from '#/store';

const incidentsStore = useIncidentsStore();

function handleAddIncident(incident: Incident) {
  incidentsStore.addIncident(incident);
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  min-height: 100vh;
  background: #2A4759;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dashboard-header h1 {
  color: #0A97B0;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-header p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}


</style> 
