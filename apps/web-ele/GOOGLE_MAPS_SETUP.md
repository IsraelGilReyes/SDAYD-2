# Configuración de Google Maps

## Pasos para configurar la API key de Google Maps:

### 1. Obtener una API Key
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Maps JavaScript
4. Ve a "Credenciales" y crea una nueva API Key

### 2. Configurar la API Key en el código
En el archivo `apps/web-ele/src/views/_core/incident/IncidentForm.vue`, busca la línea:

```javascript
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
```

Y reemplaza `YOUR_API_KEY` con tu API key real:

```javascript
script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places`;
```

### 3. Restricciones de seguridad (Recomendado)
En Google Cloud Console, configura restricciones para tu API key:
- Restricción de referencias HTTP: Agrega tu dominio
- Restricción de API: Solo Maps JavaScript API

### 4. Funcionalidades del mapa
- **Ubicación automática**: El mapa intenta obtener tu ubicación actual
- **Marcador arrastrable**: Puedes arrastrar el marcador para ajustar la ubicación
- **Clic en el mapa**: Haz clic en cualquier lugar del mapa para mover el marcador
- **Coordenadas**: Se muestran las coordenadas exactas (latitud/longitud)
- **Copiar coordenadas**: Botón para copiar las coordenadas al portapapeles

### 5. Alternativa sin internet
Si no hay conexión a internet, los oficiales pueden:
- Anotar manualmente las coordenadas en los campos de texto
- Usar GPS del dispositivo para obtener coordenadas
- Marcar la ubicación en un mapa físico y transcribir coordenadas

### Nota importante
La API key es gratuita para uso básico, pero tiene límites. Para uso en producción, considera:
- Configurar facturación en Google Cloud
- Monitorear el uso de la API
- Implementar caché de mapas si es necesario 
