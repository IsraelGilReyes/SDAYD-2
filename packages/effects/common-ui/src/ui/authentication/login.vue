<script setup lang="ts">
import type { Recordable } from '@vben/types';

import type { VbenFormSchema } from '@vben-core/form-ui';

import type { AuthenticationProps } from './types';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { $t } from '@vben/locales';

import { useVbenForm } from '@vben-core/form-ui';
import { VbenButton, VbenCheckbox } from '@vben-core/shadcn-ui';

import Title from './auth-title.vue';
import ThirdPartyLogin from './third-party-login.vue';

interface Props extends AuthenticationProps {
  formSchema?: VbenFormSchema[];
}

defineOptions({
  name: 'AuthenticationLogin',
});

const props = withDefaults(defineProps<Props>(), {
  codeLoginPath: '/auth/code-login',
  forgetPasswordPath: '/auth/forget-password',
  formSchema: () => [],
  loading: false,
  qrCodeLoginPath: '/auth/qrcode-login',
  registerPath: '/auth/register',
  showCodeLogin: true,
  showForgetPassword: true,
  showQrcodeLogin: true,
  showRegister: true,
  showRememberMe: true,
  showThirdPartyLogin: true,
  submitButtonText: '',
  subTitle: '',
  title: '',
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, formApi] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
);
const router = useRouter();

const REMEMBER_ME_KEY = REMEMBER_ME_USERNAME_${location.hostname};

const localUsername = localStorage.getItem(REMEMBER_ME_KEY) || '';

const rememberMe = ref(!!localUsername);

async function handleSubmit() {
  const { valid } = await formApi.validate();
  const values = await formApi.getValues();
  if (valid) {
    localStorage.setItem(
      REMEMBER_ME_KEY,
      rememberMe.value ? values?.username : '',
    );
    emit('submit', values);
  }
}

function handleGo(path: string) {
  router.push(path);
}

onMounted(() => {
  if (localUsername) {
    formApi.setFieldValue('username', localUsername);
  }
});

defineExpose({
  getFormApi: () => formApi,
});
</script>

<template>
  <div class="police-login-theme-container" @keydown.enter.prevent="handleSubmit">
    <div class="login-form-wrapper">
      <div class="officer-image-container">
        <img src="../../../../../../public/images/policer_officer.jpg" alt="Police Officer" class="officer-image" />
      </div>

      <slot name="title">
        <Title>
          <slot name="title">
            <span class="main-title-text">{{ title || ${$t('Bienvenidos.')} }}</span>
          </slot>
          <template #desc>
            <span class="sub-title-text">
              <slot name="subTitle">
                {{ subTitle || $t('Estación de policia.') }}
              </slot>
            </span>
          </template>
        </Title>
      </slot>

      <Form />

      <div
        v-if="showRememberMe || showForgetPassword"
        class="options-row mb-6 mt-4 flex items-center justify-between text-sm"
      >
        <div class="flex-center">
          <VbenCheckbox
            v-if="showRememberMe"
            v-model:checked="rememberMe"
            name="rememberMe"
            class="remember-me-checkbox"
          >
            {{ $t('authentication.rememberMe') }}
          </VbenCheckbox>
        </div>

        <span
          v-if="showForgetPassword"
          class="vben-link text-sm font-normal forgot-password-link"
          @click="handleGo(forgetPasswordPath)"
        >
          {{ $t('authentication.forgetPassword') }}
        </span>
      </div>
      <VbenButton
        :class="{
          'cursor-wait': loading,
        }"
        :loading="loading"
        aria-label="login"
        class="w-full login-button"
        @click="handleSubmit"
      >
        {{ submitButtonText || $t('common.login') }}
      </VbenButton>

      <div
        v-if="showCodeLogin || showQrcodeLogin"
        class="other-login-options mb-2 mt-4 flex items-center justify-between"
      >
        <VbenButton
          v-if="showCodeLogin"
          class="w-1/2 alternative-login-button"
          variant="outline"
          @click="handleGo(codeLoginPath)"
        >
          {{ $t('authentication.mobileLogin') }}
        </VbenButton>
        <VbenButton
          v-if="showQrcodeLogin"
          class="ml-4 w-1/2 alternative-login-button"
          variant="outline"
          @click="handleGo(qrCodeLoginPath)"
        >
          {{ $t('authentication.qrcodeLogin') }}
        </VbenButton>
      </div>

      <!-- Terceros -->
      <slot name="third-party-login">
        <ThirdPartyLogin v-if="showThirdPartyLogin" class="mt-4" />
      </slot>

      <slot name="to-register">
        <div v-if="showRegister" class="registration-link-container mt-4 text-center text-sm">
          <span class="registration-text">{{ $t('authentication.accountTip') }}</span>
          <span
            class="vben-link text-sm font-normal registration-link"
            @click="handleGo(registerPath)"
          >
            {{ $t('authentication.createAccount') }}
          </span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.police-login-theme-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(154deg, #07070915 30%, hsl(var(--primary) / 30%) 48%, #07070915 64%);
}

.login-form-wrapper {
  background: rgba(10, 25, 47, 0.85); /* Darker, more saturated blue, semi-transparent */
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 420px; /* Slightly adjusted width */
  color: #e0e0e0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  text-align: center; /* Center align title and officer image */
}

.officer-image-container {
  margin-bottom: 40px;
}

.officer-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #ffd700; /* Gold border */
  background-color: rgba(255, 255, 255, 0.1);
  object-fit: cover;
  display: inline-block; /* For centering */
}

/* Custom classes for title and subtitle text within the slot */
.main-title-text {
  display: block;
  color: #ffffff !important;
  font-size: 1.75rem !important;
  font-weight: 600 !important;
  margin-bottom: 5px !important;
}

.sub-title-text {
  display: block;
  color: #b0c4de !important; /* Light steel blue */
  font-size: 0.9rem !important;
  margin-bottom: 25px;
}

/* Form elements */
:deep(.vben-form .vben-form-item) {
  margin-bottom: 18px !important;
  text-align: left; /* Align form items to left */
}

:deep(.vben-input__wrapper input),
:deep(.vben-input-password__wrapper input) {
  background-color: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid #bbb !important;
  color: #222 !important; /* Darker text for better readability in inputs */
  border-radius: 6px !important;
  padding: 10px 12px !important;
  font-size: 0.95rem;
  width: 100%;
}

:deep(.vben-input__wrapper input::placeholder),
:deep(.vben-input-password__wrapper input::placeholder) {
  color: #666 !important;
}

.options-row {
  color: #c0d0e0; /* Lighter text for these options */
}

.remember-me-checkbox :deep(.vben-checkbox__label),
.remember-me-checkbox :deep(.ant-checkbox-wrapper span:last-child) { /* For Ant Design if used */
  color: #c0d0e0 !important;
  font-size: 0.85rem;
}

.forgot-password-link {
  color: #ffd700 !important; /* Gold */
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}
.forgot-password-link:hover {
  color: #fffacd !important; /* Lighter gold */
  text-decoration: underline;
}

.login-button {
  background-color: #0056b3 !important; /* Police blue */
  border-color: #004085 !important;
  color: white !important;
  font-weight: bold;
  padding: 11px 0 !important;
  font-size: 1rem !important;
  border-radius: 6px !important;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
}

.login-button:hover {
  background-color: #004085 !important;
  transform: translateY(-1px);
}

.login-button.cursor-wait {
  background-color: #003366 !important;
}

.other-login-options {
  text-align: left;
}

.alternative-login-button {
  background-color: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  color: #d0e0f0 !important;
  border-radius: 6px !important;
  font-size: 0.85rem;
  padding: 9px 0 !important;
  transition: background-color 0.3s ease;
}

.alternative-login-button:hover {
  background-color: rgba(255, 255, 255, 0.15) !important;
}

.registration-link-container {
  color: #c0d0e0;
  font-size: 0.85rem;
}
.registration-text {
  margin-right: 5px;
}
.registration-link {
  color: #ffd700 !important; /* Gold */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.registration-link:hover {
  color: #fffacd !important; /* Lighter gold */
  text-decoration: underline;
}

/* Ensure Title component text is styled (fallback if direct slot span classes don't cover everything) */
:deep(.vben-basic-title) {
  color: #ffffff !important;
  text-align: center;
}
:deep(.vben-basic-title .text-muted-foreground) {
  color: #b0c4de !important;
  font-size: 0.9rem !important;
}
</style>
