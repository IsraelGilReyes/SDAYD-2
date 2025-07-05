# 🗺️ Guía Completa del Mapa de Incidentes

## 🚨 Funcionalidades Principales

### 1. **Buscador de Direcciones**
- **Campo de búsqueda**: Escribe cualquier dirección y Google Places te dará sugerencias
- **Autocompletado**: Selecciona la dirección exacta del incidente
- **Actualización automática**: El mapa y el pin se mueven automáticamente a la ubicación seleccionada

### 2. **Pin Rojo - Ubicación Exacta**
- **Marcador principal**: Pin rojo que marca el lugar exacto del incidente
- **Arrastrable**: Puedes mover el pin para ajustar la ubicación exacta
- **Clic en mapa**: Haz clic en cualquier lugar del mapa para mover el pin
- **Coordenadas precisas**: Se actualizan automáticamente las coordenadas lat/long

### 3. **Expansión del Mapa**
- **Al pasar el cursor**: El mapa se expande de 300px a 500px de altura
- **Efecto visual**: Incluye sombra y escala para mejor visibilidad
- **Responsive**: En móviles se expande de 250px a 400px

### 4. **Puntos de Referencia (Azules)**
- **Botón "📌 Agregar Punto de Referencia"**
- **Marcadores azules**: Se colocan en el mapa para marcar puntos importantes
- **Ejemplos**: Negocios cercanos, postes de luz, semáforos, etc.
- **Texto automático**: Se genera automáticamente la lista de coordenadas

### 5. **Vías de Escape (Verdes)**
- **Botón "➡️ Agregar Vía de Escape"**
- **Flechas verdes**: Marcan las rutas de huida o acceso
- **Dos clics**: Primer clic = inicio, segundo clic = final de la ruta
- **Coordenadas**: Se guardan las coordenadas de inicio y fin

### 6. **Información del Incidente**
- **Infowindow**: Al hacer clic en el pin rojo se muestra:
  - 🚨 Fecha del incidente
  - 🕐 Hora del incidente
  - 👤 Nombre de quien reporta
  - 📋 Tipo de incidente

## 🎯 Campos del Formulario

### **Información Personal**
- ✅ Nombre de quien reporta
- ✅ Teléfono
- ✅ **Tipo de persona** (Testigo/Víctima/Familiar) - **NUEVO**

### **Ubicación**
- ✅ **Buscador de direcciones** - **NUEVO**
- ✅ **Dirección exacta** (ej: Calle 5 #10-20) - **NUEVO**
- ✅ **Puntos de referencia clave** - **NUEVO**
- ✅ **Vías de acceso/escape** - **NUEVO**
- ✅ **Cámaras de seguridad cercanas** - **NUEVO**

### **Controles del Mapa**
- 📍 **Mi Ubicación**: Obtiene automáticamente tu ubicación actual
- 📌 **Agregar Punto de Referencia**: Marca puntos importantes en el mapa
- ➡️ **Agregar Vía de Escape**: Dibuja rutas de huida/acceso
- 📋 **Copiar Coordenadas**: Copia lat/long al portapapeles

## 🎨 Diseño y UX

### **Colores del Sistema**
- 🔵 **Azul (#0A97B0)**: Header "Gestión de Incidentes"
- 🟡 **Amarillo (#FFB200)**: Contorno del formulario y mapa
- 🔴 **Rojo**: Pin principal del incidente
- 🔵 **Azul**: Puntos de referencia
- 🟢 **Verde**: Vías de escape

### **Efectos Visuales**
- ✨ **Sombras**: Efectos de profundidad en todos los elementos
- 🌊 **Gradientes**: Transiciones suaves de colores
- 📱 **Responsive**: Se adapta a dispositivos móviles
- 🎯 **Expansión**: El mapa crece al pasar el cursor

## 🔧 Configuración Técnica

### **Google Maps API**
1. Obtén una API key en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita la API de Google Maps JavaScript
3. Reemplaza `YOUR_API_KEY` en el código con tu API key real
4. Configura restricciones de seguridad (recomendado)

### **Funcionalidades Técnicas**
- **Geolocalización**: Usa la API del navegador
- **Places API**: Autocompletado de direcciones
- **Marcadores personalizados**: SVG icons para cada tipo
- **Infowindows**: Información contextual en el mapa
- **Event listeners**: Interacción completa con el mapa

## 📊 Tabla de Incidentes

### **Columnas Mostradas**
- ✅ Tipo de Incidente
- ✅ Fecha y Hora
- ✅ Lugar
- ✅ Nombre y Teléfono
- ✅ **Tipo de Persona** - **NUEVO**
- ✅ **Dirección Exacta** - **NUEVO**
- ✅ Descripción
- ✅ Observaciones y Conclusiones

### **Datos Guardados**
- 📍 Coordenadas exactas (lat/long)
- 📌 Puntos de referencia con coordenadas
- ➡️ Vías de escape con coordenadas
- 📹 Información de cámaras de seguridad

## 🚀 Casos de Uso

### **Para Policías**
1. **Llegada al lugar**: Usar "Mi Ubicación" para llegar al sitio
2. **Marcar incidente**: Pin rojo en el lugar exacto
3. **Puntos de referencia**: Marcar negocios, postes, semáforos cercanos
4. **Vías de escape**: Marcar rutas de huida del sospechoso
5. **Cámaras**: Anotar ubicación de cámaras de seguridad
6. **Información completa**: Fecha, hora, nombre del reportante

### **Para Investigación**
- **Coordenadas precisas**: Para análisis forense
- **Puntos de referencia**: Para reconstrucción del evento
- **Vías de escape**: Para análisis de patrones de huida
- **Información temporal**: Fecha y hora exactas del incidente

## 🔒 Seguridad y Privacidad

### **Datos Sensibles**
- ✅ Solo se guardan coordenadas, no datos personales en el mapa
- ✅ Información del reportante solo visible en infowindow
- ✅ No se comparten datos con terceros

### **Configuración de API**
- 🔐 Restricciones de dominio en Google Cloud Console
- 🔐 Restricciones de API (solo Maps JavaScript)
- 🔐 Monitoreo de uso para evitar costos inesperados

---

## 📝 Notas Importantes

1. **Sin internet**: Los oficiales pueden anotar coordenadas manualmente
2. **GPS**: Usar GPS del dispositivo para obtener coordenadas precisas
3. **Backup**: Siempre tener un método alternativo de registro
4. **Entrenamiento**: Capacitar al personal en el uso del sistema

¡El sistema está listo para uso profesional en gestión de incidentes! 🚔 
