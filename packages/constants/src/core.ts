/**
 * @es_ES URL de la página de inicio de sesión
 */
export const LOGIN_PATH = '/auth/login';

export interface LanguageOption {
  label: string;
  value: 'en-US' | 'es-ES';
}

/**
 * Idiomas soportados
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: 'Español',
    value: 'es-ES',
  },
];
