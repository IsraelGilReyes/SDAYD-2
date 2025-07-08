<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
      <p class="mt-2 text-gray-600">Administra los usuarios del sistema</p>
    </div>

    <!-- Solo visible para administradores -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">Lista de Usuarios</h2>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div class="flex">
            <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">
                Panel de Administración
              </h3>
              <div class="mt-2 text-sm text-blue-700">
                <p>Solo los administradores pueden ver esta sección. Aquí podrás:</p>
                <ul class="list-disc list-inside mt-2">
                  <li>Ver todos los usuarios del sistema</li>
                  <li>Crear nuevos usuarios</li>
                  <li>Asignar roles (usuario/administrador)</li>
                  <li>Activar/desactivar cuentas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-600">
              🚧 Esta vista está en desarrollo. Aquí se mostrará la tabla de usuarios con funciones de CRUD.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@vben/stores';

const userStore = useUserStore();

// Verificar que el usuario actual es administrador
const isAdmin = userStore.userRoles.includes('administrador');

// Si no es admin, esto no debería mostrarse debido al control de rutas
if (!isAdmin) {
  console.warn('Acceso no autorizado a gestión de usuarios');
}
</script>
