export type Locale = 'en-US' | 'es-ES';

export const messages: Record<Locale, Record<string, string>> = {
  'en-US': {
    cancel: 'Cancel',
    collapse: 'Collapse',
    confirm: 'Confirm',
    expand: 'Expand',
    prompt: 'Prompt',
    reset: 'Reset',
    submit: 'Submit',
  },
  'es-ES': {
    cancel: 'Cancelar',
    collapse: 'Contraer',
    confirm: 'Confirmar',
    expand: 'Expandir',
    prompt: 'Aviso',
    reset: 'Restablecer',
    submit: 'Enviar',
  },
};

export const getMessages = (locale: Locale) => messages[locale];
