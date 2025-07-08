<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Gestión de Roles</h1>
      <p class="mt-2 text-gray-600">Administra los roles del sistema</p>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Roles del Sistema</h2>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Rol de Usuario -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-green-900">Usuario</h3>
                <p class="text-sm text-green-700">Rol básico del sistema</p>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="text-sm font-medium text-green-900">Permisos:</h4>
              <ul class="mt-2 text-sm text-green-700 space-y-1">
                <li>• Acceso al dashboard</li>
                <li>• Ver perfil personal</li>
                <li>• Editar perfil personal</li>
                <li>• Usar funciones básicas</li>
              </ul>
            </div>
          </div>

          <!-- Rol de Administrador -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-blue-900">Administrador</h3>
                <p class="text-sm text-blue-700">Permisos completos del sistema</p>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="text-sm font-medium text-blue-900">Permisos adicionales:</h4>
              <ul class="mt-2 text-sm text-blue-700 space-y-1">
                <li>• Todos los permisos de usuario</li>
                <li>• Gestionar usuarios</li>
                <li>• Asignar roles</li>
                <li>• Configuración del sistema</li>
                <li>• Acceso a reportes</li>
                <li>• Panel de administración</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div class="flex">
            <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">
                Sistema de Roles Simplificado
              </h3>
              <div class="mt-2 text-sm text-yellow-700">
                <p>Este sistema maneja únicamente dos roles para mantener la simplicidad:</p>
                <ul class="list-disc list-inside mt-1">
                  <li><strong>Usuario:</strong> Acceso básico a las funciones del sistema</li>
                  <li><strong>Administrador:</strong> Control completo del sistema</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Esta vista muestra información sobre los roles del sistema
</script>
