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
              <el-time-picker
                v-model="form.time"
                placeholder="Hora"
                format="HH:mm"
                value-format="HH:mm"
                :style="{ width: '100%' }"
              />
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
        </div>

        <!-- Sección 3 - Ubicación -->
        <div class="form-section">
          <h2 class="section-title">3. Ubicación</h2>
          
          <!-- Buscador de direcciones -->
          <el-form-item prop="exactAddress" class="custom-input">
            <el-input 
              v-model="form.exactAddress" 
              placeholder="Dirección exacta (ej: Calle 5 #10-20)"
              prefix-icon="Location"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>

          <!-- Mapa Interactivo -->
          <div class="map-section">
            <h3 class="map-title">📍 Mapa de Ubicación</h3>
            
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
            
            <div class="map-container" 
                 @mouseenter="expandMap" 
                 @mouseleave="shrinkMap">
              <div id="map" class="google-map" :class="{ 'expanded': isMapExpanded }"></div>
              
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
                <el-button 
                  type="info" 
                  size="small" 
                  @click="showSavedLocations"
                  class="map-control-btn saved-locations-btn"
                >
                  <i class="el-icon-folder-opened"></i>
                  Ubicaciones Guardadas
                </el-button>
              </div>

                        <!-- Información del mapa -->
          <div class="map-info">
            <div class="coordinates-display">
              <span class="coords-label">Coordenadas:</span>
              <span class="coords-value">{{ form.latitude || 'No especificadas' }}, {{ form.longitude || 'No especificadas' }}</span>
            </div>
          </div>
          
          <!-- Campos manuales de coordenadas -->
          <div class="coordinates-input-section">
            <h4 style="margin: 10px 0; color: #6366f1; font-size: 0.9rem;">📝 Coordenadas Manuales (si el GPS no funciona)</h4>
            <div class="coordinates-row">
              <el-form-item prop="latitude" class="coordinate-input">
                <el-input 
                  v-model="form.latitude" 
                  placeholder="Latitud (ej: 19.4326)"
                  prefix-icon="Location"
                  :style="{ background: '#96BBBB' }"
                />
              </el-form-item>
              <el-form-item prop="longitude" class="coordinate-input">
                <el-input 
                  v-model="form.longitude" 
                  placeholder="Longitud (ej: -99.1332)"
                  prefix-icon="Location"
                  :style="{ background: '#96BBBB' }"
                />
              </el-form-item>
            </div>
            <div style="text-align: center; margin-top: 10px;">
              <el-button 
                type="primary" 
                size="small" 
                @click="updateMapFromCoordinates"
                class="update-map-btn"
              >
                <i class="el-icon-refresh"></i>
                Actualizar Mapa
              </el-button>
            </div>
          </div>
            </div>
          </div>

          <el-form-item prop="securityCameras" class="custom-textarea">
            <el-input
              v-model="form.securityCameras"
              type="textarea"
              :rows="2"
              placeholder="Cámaras de seguridad cercanas"
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
        </div>

        <!-- Sección 4 - Descripción -->
        <div class="form-section">
          <h2 class="section-title">4. Detalles</h2>
          <el-form-item prop="description" class="custom-textarea">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="5"
              placeholder="Describe lo ocurrido con todos los detalles posibles..."
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          <el-form-item prop="officerObservations" class="custom-textarea">
            <el-input
              v-model="form.officerObservations"
              type="textarea"
              :rows="3"
              placeholder="Observaciones del oficial"
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          <el-form-item prop="officerConclusions" class="custom-textarea" :required="false">
            <el-input
              v-model="form.officerConclusions"
              type="textarea"
              :rows="3"
              placeholder="Conclusiones del oficial (opcional)"
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
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
    
    <!-- Modal de ubicaciones guardadas -->
    <el-dialog
      v-model="savedLocationsVisible"
      title="Ubicaciones Guardadas"
      width="700px"
      :close-on-click-modal="false"
      class="saved-locations-modal"
    >
      <div class="saved-locations-content">
        <div v-if="savedLocations.length === 0" class="empty-locations">
          <el-empty description="No hay ubicaciones guardadas" />
        </div>
        
        <div v-else class="locations-list">
          <div 
            v-for="(location, index) in (showAllLocations ? savedLocations : savedLocations.slice(0, 20))" 
            :key="index"
            class="location-item"
            @click="selectSavedLocation(location)"
          >
            <div class="location-info">
              <div class="location-name">
                <i class="el-icon-location"></i>
                {{ location.name }}
              </div>
              <div class="location-address">
                <i class="el-icon-house"></i>
                {{ location.address }}
              </div>
              <div class="location-coords">
                <i class="el-icon-coordinate"></i>
                {{ location.lat }}, {{ location.lng }}
              </div>
              <div class="location-date">
                <i class="el-icon-time"></i>
                {{ formatDate(location.timestamp) }}
              </div>
            </div>
            <div class="location-actions">
              <el-button 
                type="primary" 
                size="small" 
                @click.stop="selectSavedLocation(location)"
                class="action-btn use-btn"
              >
                <i class="el-icon-check"></i>
                Usar
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                @click.stop="deleteSavedLocation(index)"
                class="action-btn delete-btn"
              >
                <i class="el-icon-delete"></i>
                Eliminar
              </el-button>
            </div>
          </div>
          
          <!-- Botón Ver más -->
          <div v-if="savedLocations.length > 20" class="show-more-container">
            <el-button 
              type="info" 
              @click="showAllLocations = !showAllLocations"
              class="show-more-btn"
            >
              <span v-if="!showAllLocations">
                <i class="el-icon-arrow-down"></i>
                Ver más ({{ savedLocations.length - 20 }} más)
              </span>
              <span v-else>
                <i class="el-icon-arrow-up"></i>
                Ver menos
              </span>
            </el-button>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="savedLocationsVisible = false" class="close-btn">
            <i class="el-icon-close"></i>
            Cerrar
          </el-button>
          <el-button type="primary" @click="saveCurrentLocation" class="save-btn">
            <i class="el-icon-folder-add"></i>
            Guardar Ubicación Actual
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { GOOGLE_MAPS_CONFIG, getMapsApiUrl, isApiKeyConfigured, showAlternativeMap } from '../../../config/maps';

const emit = defineEmits(['add-incident']);

const formRef = ref();
let map: any = null;
let marker: any = null;
let autocomplete: any = null;
let referenceMarkers: any[] = [];
let escapeRouteMarkers: any[] = [];
let infoWindow: any = null;

const isMapExpanded = ref(false);
const mapSearchQuery = ref('');
const savedLocationsVisible = ref(false);
const savedLocations = ref<any[]>([]);
const showAllLocations = ref(false);

const form = ref({
  type: '',
  otherType: '',
  name: '',
  phone: '',
  personType: '',
  exactAddress: '',
  street: '',
  extNumber: '',
  intNumber: '',
  description: '',
  date: '',
  time: '',
  lugar: '',
  officerObservations: '',
  officerConclusions: '',
  latitude: '',
  longitude: '',
  securityCameras: '',
});

const rules = {
  type: [ { required: true, message: 'Selecciona el tipo de incidente', trigger: 'change' } ],
  date: [ { required: true, message: 'Selecciona la fecha', trigger: 'change' } ],
  time: [ { required: true, message: 'Selecciona la hora', trigger: 'change' } ],
  name: [ { required: true, message: 'Ingresa el nombre', trigger: 'blur' } ],
  phone: [ { required: true, message: 'Ingresa el teléfono', trigger: 'blur' } ],
  personType: [ { required: true, message: 'Selecciona el tipo de persona', trigger: 'change' } ],
  exactAddress: [ { required: true, message: 'Ingresa la dirección exacta', trigger: 'blur' } ],
  description: [ { required: true, message: 'Ingresa la descripción', trigger: 'blur' } ],
  officerObservations: [ { required: true, message: 'Ingresa las observaciones del oficial', trigger: 'blur' } ],
};

// Cargar Google Maps API
function loadGoogleMapsAPI() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    // Verificar si hay API key configurada
    if (!isApiKeyConfigured()) {
      // Sin API key, usar alternativa
      showAlternativeMap();
      reject(new Error('API key no configurada'));
      return;
    }

    try {
      const script = document.createElement('script');
      script.src = getMapsApiUrl();
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google.maps);
      script.onerror = reject;
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error cargando Google Maps:', error);
      showAlternativeMap();
      reject(error);
    }
  });
}



// Inicializar mapa
async function initMap() {
  try {
    const google = await loadGoogleMapsAPI();
    
    // Coordenadas por defecto (México)
    const defaultLocation = GOOGLE_MAPS_CONFIG.DEFAULT_LOCATION;
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado');
      return;
    }
    
    map = new google.Map(mapElement, {
      center: defaultLocation,
      zoom: GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM,
      styles: GOOGLE_MAPS_CONFIG.MAP_STYLES
    });

    // Crear marcador principal (rojo)
    marker = new google.Marker({
      position: defaultLocation,
      map: map,
      draggable: true,
      title: 'Ubicación del incidente',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#FE5D26" stroke="#FFFFFF" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="#FFFFFF"/>
          </svg>
        `),
        scaledSize: new google.Size(24, 24),
        anchor: new google.Point(12, 12)
      }
    });

    // Crear infowindow
    infoWindow = new google.InfoWindow();

    // Actualizar coordenadas cuando se mueve el marcador
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      form.value.latitude = position.lat().toFixed(6);
      form.value.longitude = position.lng().toFixed(6);
      updateInfoWindow();
    });

    // Permitir hacer clic en el mapa para mover el marcador
    map.addListener('click', (event: any) => {
      const position = event.latLng;
      marker.setPosition(position);
      form.value.latitude = position.lat().toFixed(6);
      form.value.longitude = position.lng().toFixed(6);
      updateInfoWindow();
    });

    // Configurar autocomplete
    const input = document.querySelector('input[placeholder="Buscar dirección del incidente..."]');
    if (input && google.places) {
      autocomplete = new google.places.Autocomplete(input as HTMLInputElement);
      autocomplete.addListener('place_changed', onPlaceChanged);
    }

    // Obtener ubicación actual
    getCurrentLocation();

  } catch (error) {
    console.error('Error cargando Google Maps:', error);
    showAlternativeMap();
  }
}

// Manejar cambio de lugar seleccionado
function onPlaceChanged() {
  const place = autocomplete.getPlace();
  if (place.geometry) {
    const position = place.geometry.location;
    map.setCenter(position);
    marker.setPosition(position);
    form.value.latitude = position.lat().toFixed(6);
    form.value.longitude = position.lng().toFixed(6);
    form.value.exactAddress = place.formatted_address || '';
    updateInfoWindow();
  }
}

// Actualizar infowindow
function updateInfoWindow() {
  const content = `
    <div style="padding: 10px; font-family: Arial, sans-serif;">
              <h4 style="margin: 0 0 8px 0; color: #FE5D26;">🚨 Incidente Reportado</h4>
      <p style="margin: 4px 0;"><strong>Fecha:</strong> ${form.value.date || 'No especificada'}</p>
      <p style="margin: 4px 0;"><strong>Hora:</strong> ${form.value.time || 'No especificada'}</p>
      <p style="margin: 4px 0;"><strong>Reportado por:</strong> ${form.value.name || 'No especificado'}</p>
      <p style="margin: 4px 0;"><strong>Tipo:</strong> ${form.value.type || 'No especificado'}</p>
    </div>
  `;
  infoWindow.setContent(content);
  infoWindow.open(map, marker);
}

// Obtener ubicación actual
function getCurrentLocation() {
  if (navigator.geolocation) {
    ElMessage.info('Obteniendo tu ubicación actual...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Actualizar coordenadas en el formulario
        form.value.latitude = pos.lat.toFixed(6);
        form.value.longitude = pos.lng.toFixed(6);
        
        // Si estamos usando Google Maps
        if (map && marker && window.google) {
          map.setCenter(pos);
          marker.setPosition(pos);
          updateInfoWindow();
        }
        
        // Si estamos usando OpenStreetMap, actualizar el iframe
        const mapContainer = document.getElementById('map');
        if (mapContainer && !window.google) {
          // Crear nuevo iframe con la ubicación actual
          const newIframe = document.createElement('iframe');
          newIframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${pos.lng-0.01},${pos.lat-0.01},${pos.lng+0.01},${pos.lat+0.01}&layer=mapnik&marker=${pos.lat},${pos.lng}`;
          newIframe.style.width = '100%';
          newIframe.style.height = '100%';
          newIframe.style.border = 'none';
          newIframe.style.borderRadius = '10px';
          newIframe.title = 'Mapa de ubicación';
          
          // Reemplazar el iframe existente
          const existingIframe = mapContainer.querySelector('iframe');
          if (existingIframe) {
            existingIframe.replaceWith(newIframe);
          }
        }
        
        ElMessage.success(`Ubicación actual obtenida: ${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`);
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



// Expandir mapa
function expandMap() {
  isMapExpanded.value = true;
}

// Contraer mapa
function shrinkMap() {
  isMapExpanded.value = false;
}

// Copiar coordenadas al portapapeles
function copyCoordinates() {
  const lat = form.value.latitude || 'No especificada';
  const lng = form.value.longitude || 'No especificada';
  const coords = `${lat}, ${lng}`;
  
  if (lat === 'No especificada' || lng === 'No especificada') {
    ElMessage.warning('Primero obtén tu ubicación actual o ingresa coordenadas manualmente');
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

// Actualizar mapa desde coordenadas manuales
function updateMapFromCoordinates() {
  const lat = parseFloat(form.value.latitude);
  const lng = parseFloat(form.value.longitude);
  
  if (isNaN(lat) || isNaN(lng)) {
    ElMessage.warning('Ingresa coordenadas válidas (números)');
    return;
  }
  
  if (lat < -90 || lat > 90) {
    ElMessage.warning('La latitud debe estar entre -90 y 90');
    return;
  }
  
  if (lng < -180 || lng > 180) {
    ElMessage.warning('La longitud debe estar entre -180 y 180');
    return;
  }
  
  // Si estamos usando Google Maps
  if (map && marker && window.google) {
    const pos = { lat, lng };
    map.setCenter(pos);
    marker.setPosition(pos);
    updateInfoWindow();
  }
  
  // Si estamos usando OpenStreetMap
  const mapContainer = document.getElementById('map');
  if (mapContainer && !window.google) {
    // Limpiar el contenedor del mapa
    mapContainer.innerHTML = '';
    
    // Crear nuevo iframe con las coordenadas
    const newIframe = document.createElement('iframe');
    newIframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
    newIframe.style.width = '100%';
    newIframe.style.height = '100%';
    newIframe.style.border = 'none';
    newIframe.style.borderRadius = '10px';
    newIframe.title = 'Mapa de ubicación';
    
    // Agregar el nuevo iframe
    mapContainer.appendChild(newIframe);
  }
  
  ElMessage.success(`Mapa actualizado a: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
}



// Buscar ubicación
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
      form.value.exactAddress = location.display_name;
      
      // Actualizar mapa
      updateMapFromCoordinates();
      
      ElMessage.success(`Ubicación encontrada: ${location.display_name}`);
      
      // Preguntar si quiere guardar la ubicación
      ElMessageBox.confirm(
        `¿Estás seguro de guardar esta ubicación?\n\n${location.display_name}`,
        'Guardar ubicación',
        {
          confirmButtonText: 'Sí, guardar',
          cancelButtonText: 'No, solo mostrar',
          type: 'info',
          center: true,
          customClass: 'location-save-dialog'
        }
      ).then(() => {
        // Guardar la ubicación
        const newLocation = {
          name: mapSearchQuery.value,
          address: location.display_name,
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
          timestamp: new Date().toISOString()
        };
        
        savedLocations.value.unshift(newLocation); // Agregar al inicio
        localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value));
        
        ElMessage.success('Ubicación guardada en tus ubicaciones favoritas');
      }).catch(() => {
        // Usuario canceló, solo mostrar en el mapa
        ElMessage.info('Ubicación mostrada en el mapa (no guardada)');
      });
      
    } else {
      ElMessage.warning('No se encontró la ubicación. Intenta con una dirección más específica.');
    }
  } catch (error) {
    console.error('Error buscando ubicación:', error);
    ElMessage.error('Error al buscar la ubicación. Verifica tu conexión a internet.');
  }
}

// Mostrar ubicaciones guardadas
function showSavedLocations() {
  savedLocationsVisible.value = true;
}

// Guardar ubicación actual
function saveCurrentLocation() {
  const lat = form.value.latitude;
  const lng = form.value.longitude;
  const address = form.value.exactAddress;
  
  if (!lat || !lng) {
    ElMessage.warning('Primero obtén una ubicación para guardar');
    return;
  }
  
  const locationName = prompt('Nombre para esta ubicación (ej: Casa, Trabajo, Plaza Central):');
  if (!locationName) return;
  
  const newLocation = {
    name: locationName,
    address: address || `${lat}, ${lng}`,
    lat: lat,
    lng: lng,
    timestamp: new Date().toISOString()
  };
  
  savedLocations.value.push(newLocation);
  
  // Guardar en localStorage
  localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value));
  
  ElMessage.success(`Ubicación "${locationName}" guardada`);
}

// Seleccionar ubicación guardada
function selectSavedLocation(location: any) {
  form.value.latitude = location.lat;
  form.value.longitude = location.lng;
  form.value.exactAddress = location.address;
  
  updateMapFromCoordinates();
  savedLocationsVisible.value = false;
  
  ElMessage.success(`Ubicación "${location.name}" seleccionada`);
}

// Eliminar ubicación guardada
function deleteSavedLocation(index: number) {
  const location = savedLocations.value[index];
  ElMessageBox.confirm(
    `¿Estás seguro de que quieres eliminar "${location.name}"?`,
    'Eliminar ubicación',
    {
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  ).then(() => {
    savedLocations.value.splice(index, 1);
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value));
    ElMessage.success('Ubicación eliminada');
  }).catch(() => {
    // Usuario canceló
  });
}

// Formatear fecha
function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function submitForm() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('add-incident', { ...form.value });
      ElMessage.success('Incidente registrado');
      
      // Limpiar el formulario
      Object.keys(form.value).forEach(key => form.value[key] = '');
      
          // Limpiar marcadores
    referenceMarkers.forEach(marker => marker.setMap(null));
    escapeRouteMarkers.forEach(marker => marker.setMap(null));
    referenceMarkers = [];
    escapeRouteMarkers = [];
      
      // Resetear marcador principal
      if (map && marker) {
        const defaultLocation = { lat: 19.4326, lng: -99.1332 };
        map.setCenter(defaultLocation);
        marker.setPosition(defaultLocation);
      }
    }
  });
}

onMounted(() => {
  try {
    initMap();
    
    // Cargar ubicaciones guardadas
    const saved = localStorage.getItem('savedLocations');
    if (saved) {
      savedLocations.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error en onMounted:', error);
    showAlternativeMap();
  }
});

onUnmounted(() => {
  if (map) {
    map = null;
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
.google-map {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  border: 2px solid #96BBBB;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}
.google-map.expanded {
  height: 500px;
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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

.saved-locations-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #f093fb 100%);
  color: white;
}

.saved-locations-btn:hover {
  background: linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #f5576c 100%);
}

.update-map-btn {
  border-radius: 12px;
  font-weight: 700;
  padding: 12px 24px;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(190, 91, 80, 0.3);
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #BE5B50 0%, #d67c72 50%, #BE5B50 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.update-map-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.update-map-btn:hover::before {
  left: 100%;
}

.update-map-btn:hover {
  background: linear-gradient(135deg, #d67c72 0%, #BE5B50 50%, #d67c72 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(190, 91, 80, 0.4);
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

/* Estilos para el modal de ubicaciones guardadas */
.saved-locations-modal .el-dialog {
  border-radius: 16px;
  overflow: hidden;
}

.saved-locations-modal .el-dialog__header {
  background: linear-gradient(90deg, #0A97B0 0%, #6366f1 100%);
  color: white;
  padding: 20px;
}

.saved-locations-modal .el-dialog__title {
  color: white;
  font-weight: 700;
}

.saved-locations-content {
  max-height: 400px;
  overflow-y: auto;
}

.empty-locations {
  padding: 40px 20px;
  text-align: center;
}

.locations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.location-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.location-item:hover {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-color: #6366f1;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
}

.location-info {
  flex: 1;
}

.location-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 1.1rem;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.location-name i {
  color: #6366f1;
  font-size: 1rem;
}

.location-address {
  color: #6366f1;
  font-size: 0.95rem;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.location-address i {
  color: #8b5cf6;
  font-size: 0.9rem;
}

.location-coords {
  color: #64748b;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.location-coords i {
  color: #10b981;
  font-size: 0.8rem;
}

.location-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 16px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.use-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.use-btn:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.delete-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-top: 2px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.close-btn {
  border-radius: 8px;
  font-weight: 600;
  padding: 10px 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.close-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.save-btn {
  border-radius: 8px;
  font-weight: 600;
  padding: 10px 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
}

.save-btn:hover {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Estilos para botón Ver más ubicaciones */
.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding: 12px;
}

.show-more-btn {
  border-radius: 10px;
  font-weight: 600;
  padding: 10px 20px;
  font-size: 0.9rem;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  border: none;
  color: white;
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.show-more-btn:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

/* Estilos para fecha de ubicación */
.location-date {
  color: #94a3b8;
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.location-date i {
  color: #f59e0b;
  font-size: 0.75rem;
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
  .google-map {
    height: 250px;
  }
  .google-map.expanded {
    height: 400px;
  }
  .map-controls {
    flex-direction: column;
    align-items: center;
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

