<template>
  <el-card class="incident-card">
    <template #header>
      <div class="incident-card-header">
        <el-icon style="margin-right: 8px;"><i-ep-warning /></el-icon>
        <span>Gestión de Incidentes</span>
      </div>
    </template>
    <!-- Barra de búsqueda mejorada con SVG -->
    <div class="search-bar">
      <div class="search-input-wrapper">
        <span class="search-svg-icon">
          <!-- SVG lupa profesional -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="#6366f1" stroke-width="2.2" fill="#C0C9EE" filter="drop-shadow(0 1px 4px #898AC4AA)"/>
            <rect x="16.2" y="16.2" width="4.5" height="2.2" rx="1.1" transform="rotate(45 16.2 16.2)" fill="#898AC4" filter="drop-shadow(0 1px 4px #898AC4AA)"/>
          </svg>
        </span>
        <el-input 
          v-model="searchQuery" 
          placeholder="Buscar en la tabla de incidentes..." 
          clearable
          class="custom-search-input"
        />
      </div>
    </div>
    <el-divider />
    <el-table
      v-if="paginatedIncidents.length"
      :data="paginatedIncidents"
      stripe
      border
      class="incident-table custom-bg-table"
      size="small"
    >
      <el-table-column prop="id" label="ID único" width="110" />
      <el-table-column prop="type" label="Tipo de incidente" width="150" />
      <el-table-column prop="briefDescription" label="Descripción" width="200" />
      <el-table-column prop="date" label="Fecha" width="120" />
      <el-table-column label="Hora" width="100">
        <template #default="scope">
          {{ formatTime(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" width="150" />
      <el-table-column prop="phone" label="Teléfono" width="120" />
      <el-table-column prop="personType" label="Tipo" width="100" />
      <el-table-column prop="calle" label="Calle" width="150" />
      <el-table-column prop="numero" label="Número" width="80" />
      <el-table-column prop="colonia" label="Colonia, Localidad o Barrio" width="180" />
      <el-table-column prop="codigo_postal" label="Código Postal" width="120" />
      <el-table-column prop="ciudad" label="Ciudad" width="120" />
      <el-table-column prop="pais" label="País" width="100" />
      <el-table-column prop="referencias" label="Referencias" width="150" />
      <el-table-column label="Acciones" width="160">
        <template #default="scope">
          <div class="action-buttons">
            <el-button size="small" type="primary" @click="editIncident(scope.row)">
              <el-icon><i-ep-edit /></el-icon> <span class="btn-label">Editar</span>
            </el-button>
            <el-button size="small" type="danger" @click="deleteIncident(scope.$index)">
              <el-icon><i-ep-delete /></el-icon> <span class="btn-label">Eliminar</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- Paginación tipo Excel -->
    <div v-if="totalPages > 1" class="pagination-container">
      <el-button
        v-for="page in totalPages"
        :key="page"
        :type="page === currentPage ? 'primary' : 'default'"
        class="pagination-btn"
        @click="goToPage(page)"
      >
        Página {{ page }}
      </el-button>
    </div>

    <!-- Modal de edición -->
    <el-dialog v-model="editDialogVisible" title="Editar Incidente" width="80%">
      <el-form :model="editingIncident" label-width="200px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Tipo de incidente">
              <el-select v-model="editingIncident.type">
                <el-option label="Robo" value="Robo" />
                <el-option label="Accidente" value="Accidente" />
                <el-option label="Emergencia médica" value="Emergencia médica" />
                <el-option label="Agresiones sexuales" value="Agresiones sexuales" />
                <el-option label="Fraudes y estafas" value="Fraudes y estafas" />
                <el-option label="Daño a la propiedad" value="Daño a la propiedad" />
                <el-option label="Agresiones" value="Agresiones" />
                <el-option label="Amenazas" value="Amenazas" />
                <el-option label="Otro" value="Otro" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Descripción breve">
              <el-input v-model="editingIncident.briefDescription" type="textarea" maxlength="250" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Fecha">
              <el-date-picker v-model="editingIncident.date" type="date" format="DD/MM/YYYY" value-format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Hora">
              <div class="time-picker-container">
                <el-time-picker v-model="editingIncident.time" format="HH:mm" />
                <el-select v-model="editingIncident.timePeriod" placeholder="a.m./p.m." style="width: 80px; margin-left: 8px;">
                  <el-option label="a.m." value="AM" />
                  <el-option label="p.m." value="PM" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Nombre">
              <el-input v-model="editingIncident.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Teléfono">
              <el-input v-model="editingIncident.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Tipo de persona">
              <el-select v-model="editingIncident.personType">
                <el-option label="Testigo" value="testigo" />
                <el-option label="Víctima" value="victima" />
                <el-option label="Familiar" value="familiar" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Calle">
              <el-input v-model="editingIncident.calle" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Número">
              <el-input v-model="editingIncident.numero" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Colonia, Localidad o Barrio">
              <el-input v-model="editingIncident.colonia" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Código Postal">
              <el-input v-model="editingIncident.codigo_postal" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Ciudad">
              <el-input v-model="editingIncident.ciudad" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="País">
              <el-input v-model="editingIncident.pais" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Referencias">
              <el-input v-model="editingIncident.referencias" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="saveEdit">Guardar</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit as IepEdit, Delete as IepDelete, Warning as IepWarning, Search as IepSearch } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useIncidentsStore } from '@/store/incidents';

const incidentsStore = useIncidentsStore();
const { incidents } = storeToRefs(incidentsStore);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = 2; // Cambiado a 2 para pruebas
const editDialogVisible = ref(false);
const editingIncident = ref({});

// Asegurar que cada incidente tenga un ID único y los campos necesarios
watch(incidents, (newVal) => {
  newVal.forEach((incident, idx) => {
    if (!incident.id) {
      incident.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${idx}`;
    }
    // Asegurar que todos los campos existan con los nombres correctos del formulario
    incident.briefDescription = incident.briefDescription || incident.description || '';
    incident.calle = incident.calle || incident.street || '';
    incident.numero = incident.numero || incident.number || '';
    incident.colonia = incident.colonia || '';
    incident.codigo_postal = incident.codigo_postal || incident.postalCode || '';
    incident.ciudad = incident.ciudad || incident.city || '';
    incident.pais = incident.pais || incident.country || '';
    incident.referencias = incident.referencias || incident.references || '';
    incident.timePeriod = incident.timePeriod || 'AM';
  });
}, { immediate: true });

const filteredIncidents = computed(() => {
  if (!searchQuery.value.trim()) return incidents.value;
  
  const query = searchQuery.value.toLowerCase().trim();
  return incidents.value.filter(incident => {
    // Buscar en campos específicos
    const searchableFields = [
      incident.id,
      incident.type,
      incident.briefDescription,
      incident.date,
      incident.time,
      incident.name,
      incident.phone,
      incident.personType,
      incident.calle,
      incident.numero,
      incident.colonia,
      incident.codigo_postal,
      incident.ciudad,
      incident.pais,
      incident.referencias
    ];
    
    // Verificar si la consulta está contenida en alguno de los campos
    return searchableFields.some(field => {
      if (field === null || field === undefined) return false;
      return String(field).toLowerCase().includes(query);
    });
  });
});

const totalPages = computed(() => Math.ceil(filteredIncidents.value.length / pageSize));
const paginatedIncidents = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredIncidents.value.slice(start, start + pageSize);
});

function formatTime(time: string) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'p.m.' : 'a.m.';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function goToPage(page: number) {
  currentPage.value = page;
}

function editIncident(incident: any) {
  editingIncident.value = { ...incident };
  editDialogVisible.value = true;
}

function saveEdit() {
  const idx = incidents.value.findIndex(i => i.id === editingIncident.value.id);
  if (idx !== -1) {
    // Combinar hora con período a.m./p.m.
    if (editingIncident.value.time && editingIncident.value.timePeriod) {
      const [hours, minutes] = editingIncident.value.time.split(':');
      let hour = parseInt(hours);
      
      if (editingIncident.value.timePeriod === 'PM' && hour !== 12) {
        hour += 12;
      } else if (editingIncident.value.timePeriod === 'AM' && hour === 12) {
        hour = 0;
      }
      
      editingIncident.value.time = `${hour.toString().padStart(2, '0')}:${minutes}`;
    }
    
    incidents.value[idx] = { ...editingIncident.value };
    ElMessage.success('Incidente actualizado correctamente');
    editDialogVisible.value = false;
  }
}

function deleteIncident(index: number) {
  ElMessageBox.confirm('¿Estás seguro de que deseas eliminar este incidente?', 'Eliminar incidente', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    type: 'warning',
  })
    .then(() => {
      const idToDelete = paginatedIncidents.value[index].id;
      const idx = incidents.value.findIndex(i => i.id === idToDelete);
      if (idx !== -1) incidentsStore.deleteIncident(idx);
      ElMessage.success('Incidente eliminado');
    })
    .catch(() => {
      ElMessage.info('Eliminación cancelada');
    });
}
</script>

<style scoped>
.incident-card {
  max-width: 1200px;
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
.search-bar {
  margin: 16px 0 8px 0;
  display: flex;
  justify-content: flex-end;
}
.search-input-wrapper {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #C0C9EE 0%, #898AC4 100%);
  border: 2.5px solid #898AC4;
  border-radius: 16px;
  box-shadow: 0 4px 16px #C0C9EE55;
  padding: 0 12px 0 0;
  transition: box-shadow 0.2s, border-color 0.2s;
  width: 340px;
  max-width: 100%;
}
.search-input-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px #898AC455;
}
.search-svg-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px #898AC433;
}
.custom-search-input {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 1.08rem;
  font-weight: 500;
  color: #2D3748;
  width: 100%;
  padding: 0 0 0 0;
}
.custom-search-input :deep(.el-input__wrapper) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.custom-search-input :deep(.el-input__inner) {
  background: transparent !important;
  color: #2D3748;
  font-weight: 500;
  font-size: 1.08rem;
  border: none;
  box-shadow: none;
}
.custom-search-input :deep(.el-input__inner::placeholder) {
  color: #4A5568;
  font-weight: 400;
  opacity: 0.8;
}
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 8px;
  padding: 12px 0;
  border-radius: 10px;
  background: #578FCA;
  box-shadow: 0 2px 8px #b6a58c33;
}
.pagination-btn {
  min-width: 90px;
  font-weight: 600;
  border-radius: 8px;
  border: 1.5px solid #b6a58c;
  background: #fff;
  color: #0A97B0;
  margin: 0 2px;
  transition: background 0.2s, color 0.2s;
}
.pagination-btn.el-button--primary {
  background: #0A97B0;
  color: #fff;
  border-color: #0A97B0;
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
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.time-picker-container {
  display: flex;
  align-items: center;
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
  .search-input-wrapper {
    width: 100%;
    min-width: 0;
    padding: 0 4px 0 0;
  }
}
.el-divider {
  border-color: #0A97B0 !important;
  background: #0A97B0 !important;
}
</style> 
