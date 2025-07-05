// Configuración de mapas
export const GOOGLE_MAPS_CONFIG = {
  // API Key para Google Maps (opcional)
  API_KEY: 'TU_API_KEY_AQUI',
  
  // Ubicación por defecto (México)
  DEFAULT_LOCATION: { lat: 19.4326, lng: -99.1332 },
  
  // Zoom por defecto
  DEFAULT_ZOOM: 13,
  
  // Estilos del mapa
  MAP_STYLES: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#c9c9c9' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }]
    }
  ]
};

// Función para obtener la URL de la API
export function getMapsApiUrl(): string {
  const apiKey = GOOGLE_MAPS_CONFIG.API_KEY;
  return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
}

// Función para verificar si la API key está configurada
export function isApiKeyConfigured(): boolean {
  return GOOGLE_MAPS_CONFIG.API_KEY !== 'TU_API_KEY_AQUI' && 
         GOOGLE_MAPS_CONFIG.API_KEY.length > 0;
}

// Función para mostrar mapa alternativo con OpenStreetMap
export function showAlternativeMap(): void {
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        border: 2px solid #FFB200;
        overflow: hidden;
        position: relative;
      ">
        <!-- Mapa de OpenStreetMap -->
        <div style="
          flex: 1;
          background: #e8f4f8;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          <iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=-99.2,19.3,-99.0,19.5&layer=mapnik&marker=19.4326,-99.1332"
            style="
              width: 100%;
              height: 100%;
              border: none;
              border-radius: 10px;
            "
            title="Mapa de ubicación"
          ></iframe>
        </div>
      </div>
    `;
  }
  console.log('Mostrando mapa alternativo con OpenStreetMap');
} 
