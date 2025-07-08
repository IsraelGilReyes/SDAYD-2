import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description Archivo de configuración del proyecto
 * Solo necesita sobrescribir parte de la configuración en el proyecto, no es necesario sobrescribir configuraciones innecesarias, usará automáticamente la configuración predeterminada
 * !!! Después de cambiar la configuración, por favor limpia la caché, de lo contrario podría no tener efecto
 */
export const overridesPreferences = defineOverridesPreferences({
  // sobrescripciones
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    locale: 'en-US', // Establecer inglés como idioma por defecto
  },
});
