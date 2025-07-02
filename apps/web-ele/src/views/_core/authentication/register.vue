<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { computed, h, ref } from 'vue';
import { ElNotification } from 'element-plus';

import { AuthenticationRegister, z } from '@vben/common-ui';
import { $t } from '@vben/locales';
//import { ca } from 'element-plus/es/locales.mjs';
import { useAuthStore } from '#/store';
import { router } from '#/router';

defineOptions({ name: 'Register' });

const loading = ref(false);
const authStore = useAuthStore();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.emailTip'),
      },
      fieldName: 'email',
      label: $t('authentication.email'),
      rules: z.string()
        .min(1, { message: $t('authentication.emailRequired') })
        .email({ message: $t('authentication.emailInvalid') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        };
      },
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: $t('authentication.passwordTip') })
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        triggerFields: ['password'],
      },
      fieldName: 'confirmPassword',
      label: $t('authentication.confirmPassword'),
    },
    {
      component: 'VbenCheckbox',
      fieldName: 'agreePolicy',
      renderComponentContent: () => ({
        default: () =>
          h('span', [
            $t('authentication.agree'),
            h(
              'a',
              {
                class: 'vben-link ml-1 ',
                href: '',
              },
              `${$t('authentication.privacyPolicy')} & ${$t('authentication.terms')}`,
            ),
          ]),
      }),
      rules: z.boolean().refine((value) => !!value, {
        message: $t('authentication.agreeTip'),
      }),
    },
  ];
});

async function handleSubmit(value: Recordable<any>) {
  try {
    loading.value = true;
    const result = await authStore.registerUser({
      username: value.username,
      email: value.email,
      password: value.password,
      password2: value.confirmPassword,
    });

    //console.log('Register result:', result); // Debug

    if (result.success) {
      ElNotification({
        title: $t('Register Success'),
        message: result.message,
        type: 'success',
        duration: 5000,
      });
      router.push({ name: 'Login' });
    } else {
      // Construye el mensaje de error combinado
      let errorMessage = result.message;
      
      // Si hay errores específicos, sobrescribe el mensaje
      if (Object.keys(result.errors).length > 0) {
        errorMessage = Object.values(result.errors)
          .flat()
          .join('\n');
      }

      ElNotification({
        title: $t('authentication.registerError'),
        message: errorMessage,
        type: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    ElNotification({
      title: 'Error',
      message: 'Ocurrió un error inesperado. Por favor intenta nuevamente.',
      type: 'error',
      duration: 5000,
      position: 'top-right',
    });
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <AuthenticationRegister
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
