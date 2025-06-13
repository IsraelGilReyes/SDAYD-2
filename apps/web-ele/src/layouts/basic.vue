<!--Modales-->
<script lang="ts" setup>
import type { NotificationItem } from '@vben/layouts';
import { computed, ref, watch } from 'vue';
import { AuthenticationLoginExpiredModal } from '@vben/common-ui';
import { VBEN_DOC_URL, VBEN_GITHUB_URL } from '@vben/constants';
import { useWatermark } from '@vben/hooks';
import { MdiAccount, CircleHelp, MdiGithub, MdiShieldCheck, MdiSquareEditOutline } from '@vben/icons';
import {
  BasicLayout,
  LockScreen,
  Notification, 
  UserDropdown,
} from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import { $t } from '#/locales';
import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

// Estado del modal personalizado de Información
const mostrarModalInformacion = ref(false);
const mostrarModalActualizarContrasena = ref(false);
const mostrarModalEditarPerfil = ref(false);

const notifications = ref<NotificationItem[]>([
  {
    avatar: 'https://avatar.vercel.sh/vercel.svg?text=VB',
    date: '3小时前',
    isRead: true,
    message: '描述信息描述信息描述信息',
    title: '收到了 14 份新周报',
  },
  {
    avatar: 'https://avatar.vercel.sh/1',
    date: '刚刚',
    isRead: false,
    message: '描述信息描述信息描述信息',
    title: '朱偏右 回复了你',
  },
  {
    avatar: 'https://avatar.vercel.sh/1',
    date: '2024-01-01',
    isRead: false,
    message: '描述信息描述信息描述信息',
    title: '曲丽丽 评论了你',
  },
  {
    avatar: 'https://avatar.vercel.sh/satori',
    date: '1天前',
    isRead: false,
    message: '描述信息描述信息描述信息',
    title: '代办提醒',
  },
]);

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);

// Datos editables del usuario
const editedUser = ref({
  name: userStore.userInfo?.realName || '',
  email: userStore.userInfo?.email || '',
  phone: userStore.userInfo?.phone || '',
  avatar: userStore.userInfo?.avatar || ''
});

const menus = computed(() => [
  {
    handler: () => {
      mostrarModalInformacion.value = true;
    },
    icon: MdiAccount,
    text: $t('Perfil'),
  },
  {
    handler: () => {
      mostrarModalActualizarContrasena.value = true;
    },
    icon: MdiShieldCheck,
    text: 'Contraseña',
  },
  {
    handler: () => {
      mostrarModalEditarPerfil.value = true;
    },
    icon: MdiSquareEditOutline,
    text: $t('Editar Perfil'),
  },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

function handleNoticeClear() {
  notifications.value = [];
}

function handleMakeAll() {
  notifications.value.forEach((item) => (item.isRead = true));
}

function handleSaveProfile() {
  // Aquí iría la lógica para guardar los cambios
  console.log('Datos guardados:', editedUser.value);
  mostrarModalEditarPerfil.value = false;
}

watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username} - ${userStore.userInfo?.realName}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.realName"
        :description="userStore.userInfo?.email"
        tag-text="Pro"
        @logout="handleLogout"
      />
    </template>
    <template #notification>
      <Notification
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @make-all="handleMakeAll"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>

      <!--Modal de informacion-->
      <div
        v-if="mostrarModalInformacion"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center border border-blue-100">
          <img
            :src="userStore.userInfo?.avatar ?? preferences.app.defaultAvatar"
            alt="Avatar del usuario"
            class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />

          <h2 class="text-2xl font-bold mb-4 text-gray-800">Mi Perfil</h2>

          <div class="space-y-2 text-left text-gray-600">
            <p><span class="font-semibold text-gray-800">Nombre completo:</span> {{ userStore.userInfo?.realName }}</p>
            <p><span class="font-semibold text-gray-800">Correo electrónico:</span> {{ userStore.userInfo?.email }}</p>
            <p><span class="font-semibold text-gray-800">Número de teléfono:</span> {{ userStore.userInfo?.phone ?? 'No registrado' }}</p>
            <p><span class="font-semibold text-gray-800">Rol:</span> {{ userStore.userInfo?.role ?? 'Usuario' }}</p>
          </div>

          <div class="mt-6 text-right">
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              @click="mostrarModalInformacion = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Actualizar Contraseña -->
      <div
        v-if="mostrarModalActualizarContrasena"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md border border-blue-100">
          <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Actualizar Contraseña</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
              <input
                type="password"
                placeholder="Contraseña actual"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div class="text-right mt-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Guardar Cambios
              </button>
            </div>

            <div class="text-center mt-2">
              <a href="#" class="text-blue-600 hover:underline text-sm">Olvidé mi contraseña</a>
            </div>
          </div>

          <div class="text-right mt-6">
            <button
              class="text-sm text-gray-500 hover:text-gray-700 transition"
              @click="mostrarModalActualizarContrasena = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Editar Perfil -->
      <div
        v-if="mostrarModalEditarPerfil"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md border border-blue-100">
          <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Editar Perfil</h2>

          <div class="space-y-4">
            <!-- Avatar -->
            <div class="flex flex-col items-center">
              <img
                :src="editedUser.avatar || preferences.app.defaultAvatar"
                alt="Avatar del usuario"
                class="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
              />
              <input
                v-model="editedUser.avatar"
                type="text"
                placeholder="URL del avatar"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                v-model="editedUser.name"
                type="text"
                placeholder="Nombre completo"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <!-- Correo electrónico -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                v-model="editedUser.email"
                type="email"
                placeholder="Correo electrónico"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Número de teléfono</label>
              <input
                v-model="editedUser.phone"
                type="tel"
                placeholder="Número de teléfono"
                class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <!-- Botones -->
            <div class="flex justify-end space-x-3 mt-6">
              <button
                class="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
                @click="mostrarModalEditarPerfil = false"
              >
                Cancelar
              </button>
              <button
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                @click="handleSaveProfile"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
