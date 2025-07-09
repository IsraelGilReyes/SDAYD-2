<template>
  <el-card class="incident-card">
    <template #header>
      <div class="incident-card-header">
        <el-icon style="margin-right: 8px;"><i-ep-warning /></el-icon>
        <span>Gestión de Incidentes</span>
      </div>
    </template>
    <!-- Quitar <IncidentForm /> -->
    <el-divider />
    
    <el-table
      v-if="incidents.length"
      :data="showAllIncidents ? incidents : incidents.slice(-20)"
      stripe
      border
      class="incident-table custom-bg-table"
      size="small"
    >
      <el-table-column prop="type" label="Tipo de Incidente" width="180" />
      <el-table-column prop="date" label="Fecha" width="120" />
      <el-table-column prop="time" label="Hora" width="100" />
      <el-table-column prop="lugar" label="Lugar" width="160" />
      <el-table-column prop="name" label="Nombre" width="150" />
      <el-table-column prop="phone" label="Teléfono" width="120" />
      <el-table-column prop="personType" label="Tipo de Persona" width="120" />
      <el-table-column prop="exactAddress" label="Dirección Exacta" width="180" />
      <el-table-column prop="description" label="Descripción" width="200" />
      <el-table-column prop="officerObservations" label="Observaciones" width="150" />
      <el-table-column prop="officerConclusions" label="Conclusiones" width="150" />
      <el-table-column label="Acciones" width="160">
        <template #default="scope">
          <div class="action-buttons">
            <el-button size="small" type="primary" @click="editIncident(scope.$index)">
              <el-icon><i-ep-edit /></el-icon> <span class="btn-label">Editar</span>
            </el-button>
            <el-button size="small" type="danger" @click="deleteIncident(scope.$index)">
              <el-icon><i-ep-delete /></el-icon> <span class="btn-label">Eliminar</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- Botón Ver más incidentes -->
    <div v-if="incidents.length > 20" class="show-more-incidents-container">
      <el-button 
        type="info" 
        @click="showAllIncidents = !showAllIncidents"
        class="show-more-incidents-btn"
      >
        <span v-if="!showAllIncidents">
          👇 Ver más incidentes ({{ incidents.length - 20 }} más)
        </span>
        <span v-else>
          👆 Ver menos (últimos 20)
        </span>
      </el-button>
    </div>
    
    <!-- Quitar mensaje de tabla vacía -->
    <!-- <div v-else class="empty-message">
      <el-empty description="No hay incidentes registrados." />
    </div> -->
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import IncidentForm from './IncidentForm.vue';
import { Edit as IepEdit, Delete as IepDelete, Warning as IepWarning } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useIncidentsStore } from '@/stores/incidents';

interface Incident {
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

const incidentsStore = useIncidentsStore();
const { incidents } = storeToRefs(incidentsStore);
const showAllIncidents = ref(false);

function addIncident(incident: any) {
  incidentsStore.addIncident({
    type: incident.type,
    date: incident.date,
    time: incident.time,
    lugar: incident.lugar,
    name: incident.name,
    phone: incident.phone,
    personType: incident.personType,
    exactAddress: incident.exactAddress,
    description: incident.description,
    officerObservations: incident.officerObservations,
    officerConclusions: incident.officerConclusions,
    latitude: incident.latitude,
    longitude: incident.longitude,
    referencePoints: incident.referencePoints,
    escapeRoutes: incident.escapeRoutes,
    securityCameras: incident.securityCameras,
  });
}

function editIncident(index: number) {
  ElMessageBox.alert('Funcionalidad de edición próximamente.', 'Editar incidente', {
    confirmButtonText: 'OK',
  });
}

function deleteIncident(index: number) {
  ElMessageBox.confirm('¿Estás seguro de que deseas eliminar este incidente?', 'Eliminar incidente', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    type: 'warning',
  })
    .then(() => {
      incidentsStore.deleteIncident(index);
      ElMessage.success('Incidente eliminado');
    })
    .catch(() => {
      ElMessage.info('Eliminación cancelada');
    });
}
</script>

<style scoped>
.incident-card {
  max-width: 900px;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: 0 0 0 4px #78B3CE, 0 8px 32px #78B3CE;
  background: transparent;
  padding-bottom: 32px;
  border: 2.5px solid #78B3CE;
}
.incident-card-header {
  display: flex;
  align-items: center;
  font-size: 1.45rem;
  font-weight: 800;
  color: #0A97B0;
  letter-spacing: 1.2px;
  text-shadow: 0 2px 8px #fff8, 0 1px 2px #0A97B033;
}
.incident-table.custom-bg-table {
  margin-top: 24px;
  border-radius: 14px;
  background: #DED3C4;
  font-size: 0.85rem;
  box-shadow: 0 2px 12px #FFE893;
  overflow-x: auto;
}
.el-table, .el-table__header, .el-table__body, .el-table th, .el-table td {
  background: #DED3C4 !important;
  font-size: 0.85rem;
}
.el-table__body tr:nth-child(odd) > td {
  background: #B2D8CE !important;
}
.el-table__body tr:nth-child(even) > td {
  background: #DED3C4 !important;
}
.el-table th {
  font-weight: 700;
  background: #b6a58c !important;
  color: #2d3a4b !important;
  font-size: 0.89rem;
}
.el-table__body tr:hover > td {
  background: #e0e7ff !important;
}
.action-buttons {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
}
.el-button {
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 3px 8px;
  min-width: 0;
  height: 28px;
  transition: background 0.2s, color 0.2s;
}
.el-button--primary {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  border: none;
}
.el-button--primary:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
}
.el-button--danger {
  /* Degradado rosa profesional */
  background: linear-gradient(90deg, #f472b6 0%, #ec4899 100%) !important;
  border: none;
  color: #fff !important;
  box-shadow: 0 2px 8px #f472b633;
}
.el-button--danger:hover {
  background: linear-gradient(90deg, #ec4899 0%, #f472b6 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px #ec489933;
}
.btn-label {
  font-size: 0.92em;
  font-weight: bold;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-message {
  margin-top: 32px;
  text-align: center;
}
@media (max-width: 600px) {
  .incident-card {
    padding: 0 2px 16px 2px;
  }
  .incident-table.custom-bg-table {
    font-size: 0.78rem;
  }
  .el-table th, .el-table td {
    font-size: 0.78rem;
  }
  .el-button {
    font-size: 0.78rem;
    padding: 4px 8px;
  }
}
.el-divider {
  border-color: #0A97B0 !important;
  background: #0A97B0 !important;
}

/* Estilos para botón Ver más incidentes */
.show-more-incidents-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 16px;
}

.show-more-incidents-btn {
  border-radius: 12px;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 1rem;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.show-more-incidents-btn:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}
</style> 
