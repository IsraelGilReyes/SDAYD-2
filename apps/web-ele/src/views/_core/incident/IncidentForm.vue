<template>
  <div class="modern-form-container">
    <div class="glass-card">
      <div class="form-header">
        <h1>
          <span class="shield-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 6V11C4 16.25 7.8 20.25 12 21C16.2 20.25 20 16.25 20 11V6L12 3Z" stroke="#48A6A7" stroke-width="2.2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
              <path d="M12 3V21" stroke="#48A6A7" stroke-width="2.2" filter="drop-shadow(0 1px 4px #0006)"/>
            </svg>
          </span>
          Registro de Incidente
        </h1>
        <p>Este formulario debe ser llenado por personal autorizado para registrar incidentes atendidos.</p>
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" class="neon-form">
        <!-- Información del Operador -->
        <div class="operator-info-section">
          <div class="operator-tags">
            <div class="operator-tag">
              <span class="tag-icon">👤</span>
              <span class="tag-label">Operador:</span>
              <span class="tag-value">{{ operatorName }}</span>
            </div>
            <div class="operator-tag">
              <span class="tag-icon">🏷️</span>
              <span class="tag-label">Rol:</span>
              <span class="tag-value">{{ operatorRole }}</span>
            </div>
          </div>
        </div>

        <!-- Sección 1 - Tipo de Incidente -->
        <div class="form-section">
          <h2 class="section-title">1. Tipo de Incidente</h2>
          <div class="type-options">
            <el-radio-group v-model="form.type">
              <el-radio-button label="Robo" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="8" y="11" width="8" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="10.5" y="7" width="3" height="5" rx="1.5" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Robo
              </el-radio-button>
              <el-radio-button label="Accidente" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="5" y="13" width="14" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="7" y="9" width="10" height="3" rx="1.5" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <circle cx="8.5" cy="17.5" r="1.2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <circle cx="15.5" cy="17.5" r="1.2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Accidente
              </el-radio-button>
              <el-radio-button label="Emergencia médica" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="11" y="6" width="2" height="12" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="6" y="11" width="12" height="2" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Emergencia
              </el-radio-button>
              <el-radio-button label="Agresiones sexuales" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <circle cx="12" cy="9" r="3" stroke="#fff" stroke-width="1.5" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="10" y="12" width="4" height="6" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Agresiones sexuales
              </el-radio-button>
              <el-radio-button label="Fraudes y estafas" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="7" y="10" width="10" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="9" y="14" width="6" height="2" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Fraudes y estafas
              </el-radio-button>
              <el-radio-button label="Daño a la propiedad" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="7" y="13" width="10" height="5" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="10" y="8" width="4" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Daño a la propiedad
              </el-radio-button>
              <el-radio-button label="Agresiones" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="8" y="13" width="8" height="3" rx="1.5" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="11" y="9" width="2" height="6" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Agresiones
              </el-radio-button>
              <el-radio-button label="Amenazas" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <polygon points="12,7 17,17 7,17" stroke="#fff" stroke-width="1.5" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="11" y="11" width="2" height="4" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Amenazas
              </el-radio-button>
              <el-radio-button label="Otro" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <text x="12" y="17" text-anchor="middle" font-size="14" fill="#fff" filter="drop-shadow(0 1px 4px #0006)">?</text>
                  </svg>
                </span> Otro
              </el-radio-button>
            </el-radio-group>
          </div>
          
          <el-form-item v-if="form.type === 'Otro'" prop="otherType" class="custom-input">
            <el-input 
              v-model="form.otherType" 
              placeholder="Especifica el tipo"
              prefix-icon="Edit"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>

          <!-- Descripción breve del incidente -->
          <div class="incident-description">
            <h4 class="description-title">📝 Descripción Breve del Incidente</h4>
            <el-form-item prop="briefDescription" class="custom-textarea">
              <el-input
                v-model="form.briefDescription"
                type="textarea"
                :rows="3"
                placeholder="Proporciona una descripción breve y clara del incidente (máximo 250 caracteres)..."
                resize="none"
                maxlength="250"
                show-word-limit
                :style="{ background: '#96BBBB' }"
              />
            </el-form-item>
          </div>
        </div>

        <!-- Fecha y Hora -->
        <div class="datetime-row">
          <div class="datetime-box">
            <span class="datetime-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="4" fill="#007074"/>
                <rect x="7" y="2" width="2" height="4" rx="1" fill="#FFB200"/>
                <rect x="15" y="2" width="2" height="4" rx="1" fill="#FFB200"/>
                <rect x="3" y="9" width="18" height="2" fill="#fff"/>
              </svg>
            </span>
            <el-form-item prop="date" class="datetime-form-item">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="Fecha"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
                :style="{ width: '100%' }"
              />
            </el-form-item>
          </div>
          <div class="datetime-box">
            <span class="datetime-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#007074"/>
                <circle cx="12" cy="12" r="8" fill="#fff"/>
                <rect x="11.2" y="7" width="1.6" height="6" rx="0.8" fill="#FFB200"/>
                <rect x="12" y="12" width="5" height="1.6" rx="0.8" fill="#FFB200" transform="rotate(45 12 12)"/>
              </svg>
            </span>
            <el-form-item prop="time" class="datetime-form-item">
              <div class="time-picker-container">
                <el-time-picker
                  v-model="form.time"
                  placeholder="Hora"
                  format="hh:mm A"
                  value-format="hh:mm A"
                  :style="{ width: '100%' }"
                />
              </div>
            </el-form-item>
          </div>
        </div>

        <!-- Sección 2 - Información Personal -->
        <div class="form-section">
          <h2 class="section-title">2. Información personal</h2>
          <el-form-item prop="name" class="custom-input">
            <el-input 
              v-model="form.name" 
              placeholder="Nombre de la persona que reporto"
              prefix-icon="User"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          
          <el-form-item prop="phone" class="custom-input">
            <el-input 
              v-model="form.phone" 
              placeholder="Teléfono de la persona que reporto"
              prefix-icon="Phone"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>

          <el-form-item prop="personType" class="custom-input">
            <el-select 
              v-model="form.personType" 
              placeholder="Tipo de persona"
              :style="{ width: '100%', background: '#96BBBB' }"
            >
              <el-option label="Testigo" value="testigo" />
              <el-option label="Víctima" value="victima" />
              <el-option label="Familiar" value="familiar" />
            </el-select>
          </el-form-item>

          <el-form-item prop="priority" class="custom-input">
            <el-select 
              v-model="form.priority" 
              placeholder="Prioridad del incidente"
              :style="{ width: '100%', background: '#96BBBB' }"
            >
              <el-option label="🔴 Alta" value="alta" />
              <el-option label="🟡 Media" value="media" />
              <el-option label="🟢 Baja" value="baja" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Sección 3 - Ubicación -->
        <div class="form-section">
          <h2 class="section-title">3. Ubicación</h2>
          
          <!-- Mapa Interactivo -->
          <div class="map-section">
            <h3 class="map-title">�️ Mapa Interactivo de Ubicación - Vista Ampliada</h3>
            
            <!-- Instrucciones de uso -->
            <div class="map-instructions">
              <div class="instruction-item">
                <span class="instruction-icon">🖱️</span>
                <span>Haz clic en el mapa para seleccionar una ubicación</span>
              </div>
              <div class="instruction-item">
                <span class="instruction-icon">🔄</span>
                <span>Arrastra el marcador para cambiar la posición</span>
              </div>
              <div class="instruction-item">
                <span class="instruction-icon">📍</span>
                <span>Los campos se llenarán automáticamente</span>
              </div>
            </div>
            
            <!-- Barra de búsqueda del mapa -->
            <div class="map-search-container">
              <el-input 
                v-model="mapSearchQuery" 
                placeholder="Buscar ubicación del incidente (ej: Calle 5 #10-20, Ciudad de México)"
                prefix-icon="Search"
                class="map-search-input"
                @keyup.enter="searchLocation"
              />
              <el-button 
                type="primary" 
                @click="searchLocation"
                class="search-btn"
              >
                <i class="el-icon-search"></i>
                Buscar
              </el-button>
            </div>
            
            <div class="map-container">
              <div id="map" class="osm-map"></div>
              
              <!-- Controles flotantes del mapa -->
              <div class="map-floating-controls" v-if="mapInstance">
                <!-- Botón para centrar el mapa en la ubicación seleccionada -->
                <el-button 
                  type="primary" 
                  size="small"
                  circle
                  @click="centerMapOnSelection"
                  title="Centrar mapa en la ubicación seleccionada"
                  class="floating-control-btn center-btn"
                >
                  🎯
                </el-button>
                
                <!-- Botón de recarga del mapa -->
                <el-button 
                  type="warning" 
                  size="small"
                  circle
                  @click="reloadMap"
                  title="Recargar mapa si no se ve correctamente"
                  class="floating-control-btn reload-btn"
                >
                  🔄
                </el-button>
              </div>
              
              <!-- Controles del mapa -->
              <div class="map-controls">
                <el-button 
                  type="primary" 
                  size="small" 
                  @click="getCurrentLocation"
                  class="map-control-btn location-btn"
                >
                  <i class="el-icon-location"></i>
                  Mi Ubicación
                </el-button>
                <el-button 
                  type="success" 
                  size="small" 
                  @click="copyCoordinates"
                  class="map-control-btn coords-btn"
                >
                  <i class="el-icon-document-copy"></i>
                  Copiar Coordenadas
                </el-button>

              </div>

                        <!-- Información del mapa -->
          <div class="map-info">
            <div class="coordinates-display">
              <span class="coords-label">Coordenadas:</span>
              <span class="coords-value">{{ form.latitude || 'No especificadas' }}, {{ form.longitude || 'No especificadas' }}</span>
            </div>
          </div>
            </div>
          </div>

          <!-- Campos detallados de ubicación -->
          <div class="detailed-location-section">
            <h4 class="location-fields-title">📍 Información Detallada de la Ubicación</h4>
            
            <div class="location-fields-grid">
              <!-- Primera fila -->
              <div class="location-row">
                <el-form-item prop="calle" class="custom-input location-field">
                  <el-input 
                    v-model="form.calle" 
                    placeholder="Calle"
                    prefix-icon="Location"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
                
                <el-form-item prop="numero" class="custom-input location-field">
                  <el-input 
                    v-model="form.numero" 
                    placeholder="Número"
                    prefix-icon="House"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
              </div>
              
              <!-- Segunda fila -->
              <div class="location-row">
                <el-form-item prop="colonia" class="custom-input location-field">
                  <el-input 
                    v-model="form.colonia" 
                    placeholder="Colonia"
                    prefix-icon="Map"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
                
                <el-form-item prop="codigo_postal" class="custom-input location-field">
                  <el-input 
                    v-model="form.codigo_postal" 
                    placeholder="Código Postal"
                    prefix-icon="Postcard"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
              </div>
              
              <!-- Tercera fila -->
              <div class="location-row">
                <el-form-item prop="ciudad" class="custom-input location-field">
                  <el-input 
                    v-model="form.ciudad" 
                    placeholder="Ciudad"
                    prefix-icon="Office"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
                
                <el-form-item prop="pais" class="custom-input location-field">
                  <el-input 
                    v-model="form.pais" 
                    placeholder="País"
                    prefix-icon="Place"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
              </div>
              
              <!-- Referencias (campo completo) -->
              <div class="location-row">
                <el-form-item prop="referencias" class="custom-input location-field-full">
                  <el-input 
                    v-model="form.referencias" 
                    placeholder="Referencias (ej: Entre calle A y B, frente al parque, etc.)"
                    prefix-icon="Flag"
                    :style="{ background: '#96BBBB' }"
                  />
                </el-form-item>
              </div>
              
              <!-- Botón para limpiar campos de ubicación -->
              <div class="location-actions">
                <el-button 
                  type="info" 
                  size="small" 
                  @click="clearLocationFields"
                  class="clear-location-btn"
                >
                  <i class="el-icon-delete"></i>
                  Limpiar Campos de Ubicación
                </el-button>
              </div>
            </div>
          </div>


        </div>

        <!-- Botón de Envío -->
        <el-button 
          type="primary" 
          @click="submitForm" 
          class="submit-btn"
          round
        >
          <span class="btn-content">
            📤 Enviar Reporte
          </span>
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUserStore } from '@vben/stores';
import { useIncidentsStore } from '#/store';

// Declaraciones de tipos para Leaflet
declare global {
  interface Window {
    L: any;
  }
}

const emit = defineEmits(['add-incident']);

const formRef = ref();
const userStore = useUserStore();
const incidentsStore = useIncidentsStore();

// Obtener información del usuario de la sesión
const currentUser = computed(() => userStore.userInfo || {});
const operatorName = computed(() => {
  const user = currentUser.value as any;
  return user.realName || user.username || 'Usuario no identificado';
});
const operatorRole = computed(() => {
  const user = currentUser.value as any;
  return user.roles?.[0] || 'Rol no asignado';
});

// Configuración de OpenStreetMap
const OSM_CONFIG = {
  DEFAULT_LOCATION: { lat: 19.4326, lng: -99.1332 }, // México
  DEFAULT_ZOOM: 13,
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '© OpenStreetMap contributors'
};

// Variables para el mapa interactivo
let mapInstance: any = null;
let mapMarker: any = null;

const mapSearchQuery = ref('');

const form = ref({
  type: '',
  otherType: '',
  briefDescription: '',
  name: '',
  phone: '',
  personType: '',
  priority: 'media', // Prioridad por defecto
  date: '',
  time: '',
  lugar: '',
  latitude: '',
  longitude: '',
  // Campos de ubicación detallada
  calle: '',
  numero: '',
  colonia: '',
  codigo_postal: '',
  ciudad: '',
  pais: '',
  referencias: '',
});

const rules = {
  type: [ { required: true, message: 'Selecciona el tipo de incidente', trigger: 'change' } ],
  otherType: [
    { 
      validator: (_rule: any, value: any, callback: any) => {
        if (form.value.type === 'Otro' && (!value || value.trim() === '')) {
          callback(new Error('Especifica el tipo de incidente'));
        } else {
          callback();
        }
      }, 
      trigger: 'blur' 
    }
  ],
  briefDescription: [ 
    { required: true, message: 'Ingresa una descripción breve del incidente', trigger: 'blur' },
    { min: 10, message: 'La descripción debe tener al menos 10 caracteres', trigger: 'blur' },
    { max: 250, message: 'La descripción no debe exceder 250 caracteres', trigger: 'blur' }
  ],
  date: [ { required: true, message: 'Selecciona la fecha', trigger: 'change' } ],
  time: [ { required: true, message: 'Selecciona la hora', trigger: 'change' } ],
  name: [ { required: true, message: 'Ingresa el nombre', trigger: 'blur' } ],
  phone: [ { required: true, message: 'Ingresa el teléfono', trigger: 'blur' } ],
  personType: [ { required: true, message: 'Selecciona el tipo de persona', trigger: 'change' } ],
  priority: [ { required: true, message: 'Selecciona la prioridad del incidente', trigger: 'change' } ],
  // Validaciones opcionales para campos de ubicación
  codigo_postal: [ 
    { pattern: /^\d{5}$/, message: 'El código postal debe tener 5 dígitos', trigger: 'blur' } 
  ],
};

// Función para cargar Leaflet.js dinámicamente
async function loadLeaflet() {
  if (window.L) return; // Ya está cargado
  
  try {
    // Cargar CSS de Leaflet
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    linkElement.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    linkElement.crossOrigin = '';
    document.head.appendChild(linkElement);
    
    // Esperar a que el CSS se cargue
    await new Promise(resolve => {
      linkElement.onload = resolve;
      linkElement.onerror = resolve; // Continuar aunque falle el CSS
    });
    
    // Cargar JS de Leaflet
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        console.log('Leaflet cargado correctamente');
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('Error cargando Leaflet:', error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error('Error en loadLeaflet:', error);
    throw error;
  }
}

// Función para actualizar la vista del mapa
function updateMapView(lat: number, lng: number) {
  if (!mapInstance) return;
  
  // Centrar el mapa en la nueva ubicación
  mapInstance.setView([lat, lng], OSM_CONFIG.DEFAULT_ZOOM);
  
  // Actualizar o crear marcador
  updateMarker(lat, lng);
}

// Función para actualizar el marcador
function updateMarker(lat: number, lng: number) {
  if (!mapInstance || !window.L) return;
  
  // Remover marcador anterior si existe
  if (mapMarker) {
    mapInstance.removeLayer(mapMarker);
  }
  
  // Crear nuevo marcador
  mapMarker = window.L.marker([lat, lng], {
    draggable: true // Permite arrastrar el marcador
  }).addTo(mapInstance);
  
  // Agregar popup al marcador
  mapMarker.bindPopup(`
    <div style="text-align: center; font-family: Arial, sans-serif;">
      <strong>📍 Ubicación del Incidente</strong><br>
      <span style="font-family: monospace; color: #666;">
        ${lat.toFixed(6)}, ${lng.toFixed(6)}
      </span><br>
      <small style="color: #888;">Arrastra el marcador para cambiar la ubicación</small>
    </div>
  `).openPopup();
  
  // Evento cuando se arrastra el marcador
  mapMarker.on('dragend', function(event: any) {
    const marker = event.target;
    const position = marker.getLatLng();
    updateFormCoordinates(position.lat, position.lng);
    
    // Obtener información de la ubicación
    reverseGeocode(position.lat, position.lng);
    
    ElMessage.success(`Ubicación actualizada: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`);
  });
}

// Función para actualizar las coordenadas en el formulario
function updateFormCoordinates(lat: number, lng: number) {
  form.value.latitude = lat.toFixed(6);
  form.value.longitude = lng.toFixed(6);
}

// Función de geocodificación inversa (coordenadas a dirección)
async function reverseGeocode(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    
    if (data && data.display_name) {
      // Extraer componentes de la dirección si están disponibles
      const address = data.address || {};
      
      // Llenar campos específicos
      if (address.road || address.street) {
        form.value.calle = address.road || address.street || '';
      }
      
      if (address.house_number) {
        form.value.numero = address.house_number;
      }
      
      if (address.neighbourhood || address.suburb || address.quarter) {
        form.value.colonia = address.neighbourhood || address.suburb || address.quarter || '';
      }
      
      if (address.postcode) {
        form.value.codigo_postal = address.postcode;
      }
      
      if (address.city || address.town || address.village) {
        form.value.ciudad = address.city || address.town || address.village || '';
      }
      
      if (address.country) {
        form.value.pais = address.country;
      }
      
      ElMessage.success(`Dirección obtenida y campos actualizados automáticamente`);
    }
  } catch (error) {
    console.error('Error en geocodificación inversa:', error);
    ElMessage.warning('No se pudo obtener información detallada de la ubicación');
  }
}

// Inicializar mapa con OpenStreetMap
async function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error('Elemento del mapa no encontrado');
    return;
  }

  try {
    // Cargar Leaflet si no está cargado
    await loadLeaflet();
    
    // Limpiar contenedor del mapa
    mapContainer.innerHTML = '';
    
    // Asegurar que el contenedor tenga dimensiones explícitas (tamaño expandido)
    mapContainer.style.height = '500px';
    mapContainer.style.width = '100%';
    mapContainer.style.position = 'relative';
    mapContainer.style.zIndex = '1';
    mapContainer.style.background = '#f8f9fa';
    
    // Esperar un poco para que el DOM se actualice
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Crear mapa con Leaflet
    mapInstance = window.L.map('map', {
      preferCanvas: false,
      zoomControl: true,
      attributionControl: true,
      fadeAnimation: false,
      zoomAnimation: false,
      markerZoomAnimation: false
    }).setView(
      [OSM_CONFIG.DEFAULT_LOCATION.lat, OSM_CONFIG.DEFAULT_LOCATION.lng], 
      OSM_CONFIG.DEFAULT_ZOOM
    );
    
    // Añadir capa de OpenStreetMap
    window.L.tileLayer(OSM_CONFIG.TILE_URL, {
      attribution: OSM_CONFIG.ATTRIBUTION,
      maxZoom: 19,
      minZoom: 1,
      opacity: 1,
      fadeAnimation: false
    }).addTo(mapInstance);
    
    // Forzar que el mapa se redibuje correctamente múltiples veces
    const forceRedraw = () => {
      if (mapInstance) {
        mapInstance.invalidateSize();
      }
    };
    
    setTimeout(forceRedraw, 200);
    setTimeout(forceRedraw, 500);
    setTimeout(forceRedraw, 1000);
    
    // Crear marcador inicial
    updateMarker(OSM_CONFIG.DEFAULT_LOCATION.lat, OSM_CONFIG.DEFAULT_LOCATION.lng);
    
    // Actualizar coordenadas en el formulario
    updateFormCoordinates(OSM_CONFIG.DEFAULT_LOCATION.lat, OSM_CONFIG.DEFAULT_LOCATION.lng);
    
    // Evento de clic en el mapa
    mapInstance.on('click', function(event: any) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      
      // Actualizar marcador y formulario
      updateMarker(lat, lng);
      updateFormCoordinates(lat, lng);
      
      // Obtener información de la ubicación
      reverseGeocode(lat, lng);
      
      ElMessage.success(`Nueva ubicación seleccionada: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    });
    
    ElMessage.success('Mapa interactivo cargado correctamente');
    
  } catch (error) {
    console.error('Error cargando Leaflet:', error);
    ElMessage.error('Error al cargar el mapa interactivo');
  }
}



// Obtener ubicación actual del usuario
function getCurrentLocation() {
  if (navigator.geolocation) {
    ElMessage.info('Obteniendo tu ubicación actual...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Actualizar marcador y mapa
        setMarkerPosition(pos.lat, pos.lng);
        
        // Obtener información de la ubicación
        reverseGeocode(pos.lat, pos.lng);
        
        ElMessage.success(`Ubicación obtenida: ${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        let errorMessage = 'No se pudo obtener tu ubicación automáticamente.';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso denegado. Permite el acceso a la ubicación en tu navegador.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al obtener la ubicación.';
            break;
        }
        
        ElMessage.warning(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  } else {
    ElMessage.warning('Tu navegador no soporta geolocalización.');
  }
}



// Función para recargar el mapa si hay problemas
function reloadMap() {
  ElMessage.info('Recargando mapa...');
  
  // Limpiar mapa actual
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  if (mapMarker) {
    mapMarker = null;
  }
  
  // Reinicializar después de un breve delay
  setTimeout(() => {
    initMap();
  }, 500);
}

// Copiar coordenadas al portapapeles
function copyCoordinates() {
  const lat = form.value.latitude || 'No especificada';
  const lng = form.value.longitude || 'No especificada';
  const coords = `${lat}, ${lng}`;
  
  if (lat === 'No especificada' || lng === 'No especificada') {
    ElMessage.warning('Primero selecciona una ubicación en el mapa');
    return;
  }
  
  navigator.clipboard.writeText(coords).then(() => {
    ElMessage.success(`Coordenadas copiadas: ${coords}`);
  }).catch(() => {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = coords;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      ElMessage.success(`Coordenadas copiadas: ${coords}`);
    } catch (err) {
      ElMessage.error('No se pudieron copiar las coordenadas');
    }
    document.body.removeChild(textArea);
  });
}

// Función para limpiar campos de ubicación
function clearLocationFields() {
  ElMessageBox.confirm(
    '¿Estás seguro de que quieres limpiar todos los campos de ubicación?',
    'Limpiar campos',
    {
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  ).then(() => {
    // Limpiar campos de ubicación detallada
    form.value.calle = '';
    form.value.numero = '';
    form.value.colonia = '';
    form.value.codigo_postal = '';
    form.value.ciudad = '';
    form.value.pais = '';
    form.value.referencias = '';
    
    ElMessage.success('Campos de ubicación limpiados');
  }).catch(() => {
    // Usuario canceló
  });
}

// Buscar ubicación usando Nominatim (OpenStreetMap)
async function searchLocation() {
  if (!mapSearchQuery.value.trim()) {
    ElMessage.warning('Ingresa una dirección para buscar');
    return;
  }
  
  ElMessage.info('Buscando ubicación...');
  
  try {
    // Usar Nominatim (OpenStreetMap) para geocodificación
    const query = encodeURIComponent(mapSearchQuery.value);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      const location = data[0];
      const lat = parseFloat(location.lat);
      const lng = parseFloat(location.lon);
      
      // Actualizar coordenadas en el formulario
      form.value.latitude = lat.toFixed(6);
      form.value.longitude = lng.toFixed(6);
      
      // Actualizar mapa
      setMarkerPosition(lat, lng);
      
      ElMessage.success(`Ubicación encontrada: ${location.display_name}`);
      
      // Automáticamente obtener información adicional de la ubicación
      reverseGeocode(lat, lng);
      
    } else {
      ElMessage.warning('No se encontró la ubicación. Intenta con una dirección más específica.');
    }
  } catch (error) {
    console.error('Error buscando ubicación:', error);
    ElMessage.error('Error al buscar la ubicación. Verifica tu conexión a internet.');
  }
}

// Función para centrar el mapa en la ubicación seleccionada
function centerMapOnSelection() {
  const lat = parseFloat(form.value.latitude);
  const lng = parseFloat(form.value.longitude);
  
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    ElMessage.warning('Primero selecciona una ubicación en el mapa');
    return;
  }
  
  if (!mapInstance) {
    ElMessage.warning('El mapa no está disponible');
    return;
  }
  
  // Centrar el mapa en la ubicación seleccionada
  mapInstance.setView([lat, lng], OSM_CONFIG.DEFAULT_ZOOM, {
    animate: true,
    duration: 1
  });
  
  // Asegurar que el marcador esté visible
  if (mapMarker) {
    mapMarker.openPopup();
  }
  
  ElMessage.success('Mapa centrado en la ubicación seleccionada');
}

function submitForm() {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // La hora ya viene en formato de 12 horas con AM/PM
      let finalTime = form.value.time;

      try {
        // Mostrar loading
        ElMessage.info('Enviando incidente al servidor...');

        // Preparar datos para el backend
        const incidentData = {
          type: form.value.type === 'Otro' ? form.value.otherType : form.value.type,
          otherType: form.value.type === 'Otro' ? form.value.otherType : undefined,
          briefDescription: form.value.briefDescription,
          name: form.value.name,
          phone: form.value.phone,
          personType: form.value.personType,
          priority: form.value.priority,
          date: form.value.date,
          time: finalTime,
          calle: form.value.calle || undefined,
          numero: form.value.numero || undefined,
          colonia: form.value.colonia || undefined,
          codigo_postal: form.value.codigo_postal || undefined,
          ciudad: form.value.ciudad || undefined,
          pais: form.value.pais || undefined,
          referencias: form.value.referencias || undefined,
          operatorName: operatorName.value,
          operatorRole: operatorRole.value,
          operatorId: (currentUser.value as any).userId || 'unknown',
          submittedAt: new Date().toISOString()
        };
        
        // Enviar al backend
        const response = await incidentsStore.createIncident(incidentData);
        
        if (response.success) {
          ElMessage.success(response.message || 'Incidente registrado exitosamente en el servidor');
          
          // Limpiar el formulario
          Object.keys(form.value).forEach(key => {
            (form.value as any)[key] = '';
          });
          
          // Resetear mapa a ubicación por defecto
          const defaultLocation = OSM_CONFIG.DEFAULT_LOCATION;
          setMarkerPosition(defaultLocation.lat, defaultLocation.lng);
        } else {
          // Manejar errores del servidor
          let errorMessage = response.message || 'Error al registrar el incidente';
          
          // Si hay errores específicos de validación
          if (response.errors && Object.keys(response.errors).length > 0) {
            errorMessage = Object.values(response.errors)
              .flat()
              .join('\n');
          }
          
          ElMessage.error(errorMessage);
        }
      } catch (error: any) {
        console.error('Error submitting incident:', error);
        
        // Fallback: guardar localmente si falla el servidor
        const fallbackData = {
          type: form.value.type === 'Otro' ? form.value.otherType : form.value.type,
          otherType: form.value.type === 'Otro' ? form.value.otherType : undefined,
          briefDescription: form.value.briefDescription,
          name: form.value.name,
          phone: form.value.phone,
          personType: form.value.personType,
          priority: form.value.priority,
          date: form.value.date,
          time: finalTime,
          calle: form.value.calle || undefined,
          numero: form.value.numero || undefined,
          colonia: form.value.colonia || undefined,
          codigo_postal: form.value.codigo_postal || undefined,
          ciudad: form.value.ciudad || undefined,
          pais: form.value.pais || undefined,
          referencias: form.value.referencias || undefined,
          operatorName: operatorName.value,
          operatorRole: operatorRole.value,
          operatorId: (currentUser.value as any).userId || 'unknown',
          submittedAt: new Date().toISOString()
        };
        
        emit('add-incident', fallbackData);
        
        ElMessage.warning('No se pudo conectar al servidor. El incidente se guardó localmente.');
        
        // Limpiar el formulario
        Object.keys(form.value).forEach(key => {
          (form.value as any)[key] = '';
        });
        
        // Resetear mapa a ubicación por defecto
        const defaultLocation = OSM_CONFIG.DEFAULT_LOCATION;
        setMarkerPosition(defaultLocation.lat, defaultLocation.lng);
      }
    }
  });
}

// Función para establecer la posición del marcador
function setMarkerPosition(lat: number, lng: number) {
  updateFormCoordinates(lat, lng);
  updateMapView(lat, lng);
}

onMounted(() => {
  try {
    initMap();
  } catch (error) {
    console.error('Error en onMounted:', error);
    ElMessage.error('Error al inicializar el mapa');
  }
});

onUnmounted(() => {
  // Limpiar recursos del mapa
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  if (mapMarker) {
    mapMarker = null;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.modern-form-container {
  background: transparent;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0 40px 0;
  max-width: 1300px;
  margin: 0 auto;
}
.glass-card {
  background: #fff;
  border-radius: 24px;
  border: 2.5px solid #FFB200;
  width: 100%;
  max-width: 1150px;
  padding: 40px 32px 32px 32px;
  box-shadow: 0 8px 32px #FFE893, 0 2px 8px #FFE893;
}
.form-header {
  text-align: center;
  margin-bottom: 32px;
}
.form-header h1 {
  font-family: 'Lobster', cursive !important;
  font-size: 2.3rem;
  font-weight: 400;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(90deg, #0A97B0 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.shield-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  border: 2.5px solid #0A97B0;
  background: #B2D8CE;
  box-shadow: 0 2px 8px #0A97B033;
  margin-right: 8px;
}
.form-header p {
  color: #b6c2e1 ;
  font-size: 1rem;
}
.neon-form {
  margin-top: 0;
}

/* Estilos para la información del operador */
.operator-info-section {
  margin-bottom: 24px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 16px;
  border: 2px solid #0ea5e9;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
}

.operator-tags {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.operator-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #0ea5e9;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
  min-width: 200px;
  justify-content: flex-start;
}

.tag-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
  border-radius: 50%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tag-label {
  font-weight: 700;
  color: #0369a1;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.tag-value {
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
  flex: 1;
  text-align: left;
}

@media (max-width: 768px) {
  .operator-tags {
    flex-direction: column;
    gap: 12px;
  }
  
  .operator-tag {
    min-width: unset;
    width: 100%;
  }
  
  .operator-info-section {
    padding: 12px 16px;
  }
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e7eb;
}
.section-title {
  color: #6366f1;
  font-size: 1.18rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.type-options {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.el-radio-group {
  display: flex;
  gap: 12px;
}
.option-btn {
  background: #fff !important;
  color: #6366f1 !important;
  border-radius: 10px !important;
  border: 1.5px solid #b6c2e1 !important;
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 18px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%) !important;
  color: #fff !important;
  border-color: #6366f1 !important;
  box-shadow: 0 2px 8px #6366f144;
}
.custom-input .el-input__wrapper,
.custom-input .el-input__inner,
.custom-textarea .el-textarea__inner {
  background: #96BBBB !important;
  border-radius: 10px !important;
  border: 1.5px solid #b6c2e1 !important;
  box-shadow: 0 1px 4px rgba(0,60,120,0.06);
  font-size: 1rem;
  color: #2d3a4b;
}
.custom-input .el-input__wrapper:focus-within,
.custom-input .el-input__inner:focus,
.custom-textarea .el-textarea__inner:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 2px #6366f133;
}
.double-fields {
  display: flex;
  gap: 16px;
}
.half-width {
  width: calc(50% - 8px);
}
.custom-textarea .el-textarea__inner {
  min-height: 80px;
  resize: none;
}

/* Estilos para el mapa */
.map-section {
  margin-top: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #FFB200;
  box-shadow: 0 4px 12px rgba(255, 178, 0, 0.15);
}
.map-title {
  color: #0A97B0;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Estilos para las instrucciones del mapa */
.map-instructions {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
  border-radius: 12px;
  border: 1px solid #0ea5e9;
  flex-wrap: wrap;
  justify-content: center;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #0369a1;
  font-weight: 600;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.instruction-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .map-instructions {
    flex-direction: column;
    gap: 8px;
  }
  
  .instruction-item {
    justify-content: center;
  }
}

/* Estilos para la barra de búsqueda del mapa */
.map-search-container {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.map-search-input {
  flex: 1;
}

.map-search-input .el-input__wrapper {
  background: #96BBBB !important;
  border-radius: 8px !important;
  border: 1.5px solid #b6c2e1 !important;
}

.map-search-container {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.map-search-input {
  flex: 1;
}

.map-search-input .el-input__wrapper {
  background: #f8fafc !important;
  border-radius: 12px !important;
  border: 2px solid #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s ease !important;
}

.map-search-input .el-input__wrapper:focus-within {
  border-color: #6366f1 !important;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.15) !important;
  transform: translateY(-1px) !important;
}

.search-btn {
  border-radius: 12px;
  font-weight: 700;
  padding: 12px 20px;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
  color: white;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.search-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.search-btn:hover::before {
  left: 100%;
}

.search-btn:hover {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #8b5cf6 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}
.map-container {
  position: relative;
}

/* Controles flotantes del mapa */
.map-floating-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.floating-control-btn {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-control-btn:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

.center-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: rgba(255, 255, 255, 0.9);
  color: white;
}

.center-btn:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  color: white;
}

.reload-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: rgba(255, 255, 255, 0.9);
  color: white;
}

.reload-btn:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
  color: white;
}
.osm-map {
  width: 100% !important;
  height: 500px !important;
  border-radius: 12px;
  border: 2px solid #96BBBB;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  background: #f8f9fa;
  z-index: 1;
}

/* Estilos específicos para Leaflet */
.osm-map .leaflet-container {
  height: 100% !important;
  width: 100% !important;
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
  background: #f8f9fa !important;
}

.osm-map .leaflet-tile-pane {
  filter: none !important;
}

.osm-map .leaflet-tile {
  filter: none !important;
}

.osm-map .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.osm-map .leaflet-popup-content {
  margin: 12px 16px;
  line-height: 1.4;
}

.osm-map .leaflet-control-zoom {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.osm-map .leaflet-control-zoom a {
  border-radius: 0;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.2s ease;
  background: white !important;
  color: #333 !important;
}

.osm-map .leaflet-control-zoom a:hover {
  background: #6366f1 !important;
  color: white !important;
}

/* Asegurar que las tiles se carguen correctamente */
.osm-map .leaflet-tile-container {
  filter: none !important;
}

.osm-map .leaflet-layer {
  filter: none !important;
}
.map-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.map-control-btn {
  border-radius: 12px;
  font-weight: 700;
  padding: 12px 20px;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.map-control-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.map-control-btn:hover::before {
  left: 100%;
}

.map-control-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.location-btn {
  background: linear-gradient(135deg, #00d4aa 0%, #00b894 50%, #00a085 100%);
  color: white;
}

.location-btn:hover {
  background: linear-gradient(135deg, #00a085 0%, #00d4aa 50%, #00b894 100%);
}

.coords-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  color: white;
}

.coords-btn:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 50%, #764ba2 100%);
}



.map-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.coordinates-display {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  text-align: center;
  font-family: 'Courier New', monospace;
}
.coords-label {
  font-weight: 600;
  color: #6366f1;
  margin-right: 8px;
}
.coords-value {
  color: #2d3a4b;
  font-size: 0.9rem;
}
.map-stats {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 0.85rem;
}
.stat-item {
  color: #6366f1;
  font-weight: 600;
}

/* Estilos para campos de coordenadas manuales */
.coordinates-input-section {
  margin-top: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.coordinates-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.coordinate-input {
  flex: 1;
  margin-bottom: 0;
}

.coordinate-input .el-input__wrapper {
  background: #96BBBB !important;
  border-radius: 8px !important;
  border: 1.5px solid #b6c2e1 !important;
}

.coordinate-input .el-input__wrapper:focus-within {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 2px #6366f133;
}

/* Estilos para campos de ubicación detallada */
.detailed-location-section {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 16px;
  border: 2px solid #0ea5e9;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
}

.location-fields-title {
  color: #0369a1;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.location-fields-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.location-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.location-field {
  flex: 1;
  margin-bottom: 0;
}

.location-field-full {
  flex: 1;
  width: 100%;
  margin-bottom: 0;
}

.location-field .el-input__wrapper,
.location-field-full .el-input__wrapper {
  background: #96BBBB !important;
  border-radius: 10px !important;
  border: 1.5px solid #b6c2e1 !important;
  transition: all 0.3s ease;
}

.location-field .el-input__wrapper:focus-within,
.location-field-full .el-input__wrapper:focus-within {
  border-color: #0ea5e9 !important;
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
  transform: translateY(-1px);
}

.location-actions {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #cbd5e1;
}

.clear-location-btn {
  border-radius: 10px;
  font-weight: 600;
  padding: 8px 16px;
  font-size: 0.9rem;
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border: none;
  color: white;
  box-shadow: 0 2px 6px rgba(100, 116, 139, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.clear-location-btn:hover {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.4);
}

/* Responsive para campos de ubicación */
@media (max-width: 768px) {
  .location-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .location-field,
  .location-field-full {
    width: 100%;
  }
  
  .detailed-location-section {
    padding: 16px;
  }
}

/* Estilos para la descripción del incidente */
.incident-description {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
  border-radius: 12px;
  border: 2px solid #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
}

.description-title {
  color: #92400e;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0 0 0;
  padding: 14px 0;
  border-radius: 12px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #6366f144;
  border: none;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
  color: #fff;
  box-shadow: 0 4px 16px #6366f144;
}
.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}
/* Iconos más grandes y claros */
.el-input__prefix-inner, .el-input__prefix {
  font-size: 1.3rem !important;
  color: #6366f1 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-radio-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
  vertical-align: middle;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: #007074;
  box-shadow: 0 1px 4px #48A6A733;
}
.datetime-row {
  display: flex;
  gap: 24px;
  margin: 18px 0 0 0;
  justify-content: center;
}
.datetime-box {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px #b6c2e144;
  border: 1.5px solid #b6c2e1;
  padding: 16px 18px 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
  max-width: 180px;
}
.datetime-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.datetime-form-item {
  width: 100%;
  margin-bottom: 0;
}

.time-picker-container {
  display: flex;
  align-items: center;
  width: 100%;
}
@media (max-width: 700px) {
  .glass-card {
    padding: 20px 6px 16px 6px;
    border-radius: 16px;
  }
  .form-header h1 {
    font-size: 1.3rem;
  }
  .section-title {
    font-size: 1rem;
  }
  .datetime-row {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .datetime-box {
    min-width: 120px;
    max-width: 100%;
    padding: 10px 8px 8px 8px;
  }
  .osm-map {
    height: 350px !important;
  }
  .map-controls {
    flex-direction: column;
    align-items: center;
  }
  .map-floating-controls {
    top: 8px;
    right: 8px;
    gap: 6px;
  }
  .floating-control-btn {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  .map-stats {
    flex-direction: column;
    gap: 4px;
  }
  .map-search-container {
    flex-direction: column;
    gap: 8px;
  }
  .search-btn {
    width: 100%;
  }
  .location-item {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .location-actions {
    justify-content: center;
  }
}
</style>

