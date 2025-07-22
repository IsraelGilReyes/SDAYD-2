<template>
  <div class="admin-container">
    <!-- Header -->
    <div class="admin-header">
      <h1 class="admin-title">
        <svg class="admin-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Panel de Administración de Usuarios
      </h1>
      <p class="admin-subtitle">
        Gestiona usuarios, roles y permisos del sistema
      </p>
    </div>

    <!-- Estadísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <h3>{{ users.length }}</h3>
          <p>Total Usuarios</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <h3>{{ activeUsers.length }}</h3>
          <p>Usuarios Activos</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔑</div>
        <div class="stat-info">
          <h3>{{ adminUsers.length }}</h3>
          <p>Administradores</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👤</div>
        <div class="stat-info">
          <h3>{{ normalUsers.length }}</h3>
          <p>Usuarios Normales</p>
        </div>
      </div>
    </div>

    <!-- Controles -->
    <div class="controls-section">
      <div class="controls-left">
        <el-button 
          type="primary" 
          @click="openCreateUserDialog"
          size="large"
          class="create-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Crear Usuario
        </el-button>
        <el-button 
          @click="refreshUsers"
          :loading="loading"
          size="large"
          class="refresh-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 4V10H17M1 20V14H7M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Actualizar
        </el-button>
      </div>
      <div class="controls-right">
        <div class="search-input-wrapper">
          <span class="search-svg-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="#6366f1" stroke-width="2.2" fill="#C0C9EE" filter="drop-shadow(0 1px 4px #898AC4AA)"/>
              <rect x="16.2" y="16.2" width="4.5" height="2.2" rx="1.1" transform="rotate(45 16.2 16.2)" fill="#898AC4" filter="drop-shadow(0 1px 4px #898AC4AA)"/>
            </svg>
          </span>
          <el-input
            v-model="searchQuery"
            placeholder="Buscar usuarios..."
            size="large"
            class="custom-search-input"
            clearable
          />
        </div>
      </div>
    </div>

    <!-- Tabla de usuarios estilo incidentes -->
    <el-card class="incident-card">
      <template #header>
        <div class="incident-card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Gestión de Usuarios</span>
        </div>
      </template>

      <el-table
        v-if="filteredUsers.length"
        :data="filteredUsers"
        v-loading="loading"
        element-loading-text="Cargando usuarios..."
        stripe
        border
        class="incident-table custom-bg-table"
        size="small"
        empty-text="No hay usuarios disponibles"
      >
        <el-table-column prop="id" label="ID" width="70" align="center">
          <template #default="{ row }">
            <div class="id-badge-simple">{{ row.id }}</div>
          </template>
        </el-table-column>
        
        <el-table-column label="Usuario" width="160">
          <template #default="{ row }">
            <div class="user-info">
              <div class="user-avatar-simple">
                {{ row.username.charAt(0).toUpperCase() }}
              </div>
              <span class="username-simple">{{ row.username }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="email" label="Email" width="220">
          <template #default="{ row }">
            <span class="email-simple">{{ row.email }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="Rol" width="150" align="center">
          <template #default="{ row }">
            <span class="role-badge" :class="`role-${getRoleTagType(row.roles[0])}`">
              {{ row.roles[0] || 'Sin rol' }}
            </span>
          </template>
        </el-table-column>
        
        <el-table-column label="Estado" width="100" align="center">
          <template #default="{ row }">
            <span class="status-badge" :class="row.is_active ? 'status-active' : 'status-inactive'">
              <span class="status-dot">●</span>
              {{ row.is_active ? 'Activo' : 'Inactivo' }}
            </span>
          </template>
        </el-table-column>
        
        <el-table-column label="Último acceso" width="130" align="center">
          <template #default="{ row }">
            <span v-if="row.last_login" class="date-simple">
              {{ formatDate(row.last_login) }}
            </span>
            <span v-else class="no-date-simple">Nunca</span>
          </template>
        </el-table-column>

        <el-table-column label="Acciones" width="280" align="center">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                size="small"
                type="primary"
                @click="editUser(row)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="btn-label">Editar</span>
              </el-button>
              <el-button
                size="small"
                type="warning"
                @click="changePassword(row)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span class="btn-label">Clave</span>
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="deleteUser(row)"
                :disabled="row.id === currentUser?.userId"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                  <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" stroke-width="2"/>
                  <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span class="btn-label">Borrar</span>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <div v-else class="no-users">
        <p>No hay usuarios disponibles</p>
      </div>
    </el-card>

    <!-- Dialog para crear usuario -->
    <el-dialog
      v-model="showCreateUserDialog"
      title="Crear Nuevo Usuario"
      width="600px"
      :close-on-click-modal="false"
      @opened="onDialogOpened"
    >
      <el-form
        :key="formKey"
        ref="createFormRef"
        :model="createForm"
        :rules="createRules"
        label-width="120px"
        autocomplete="off"
      >
        <el-form-item label="Usuario" prop="username">
          <el-input 
            v-model="createForm.username" 
            placeholder="Nombre de usuario" 
            autocomplete="new-username"
            :readonly="false"
          />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input 
            v-model="createForm.email" 
            type="email" 
            placeholder="correo@ejemplo.com" 
            autocomplete="new-email"
            :readonly="false"
          />
        </el-form-item>
        <el-form-item label="Contraseña" prop="password">
          <el-input 
            v-model="createForm.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Contraseña"
            autocomplete="new-password"
            :readonly="false"
          >
            <template #suffix>
              <el-button 
                @click="showPassword = !showPassword"
                type="text"
                style="padding: 0; margin-right: 8px;"
              >
                <svg v-if="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Rol" prop="role_name">
          <el-select v-model="createForm.role_name" placeholder="Seleccionar rol" clearable>
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Estado">
          <el-switch
            v-model="createForm.is_active"
            active-text="Activo"
            inactive-text="Inactivo"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelCreateUser">Cancelar</el-button>
          <el-button 
            type="primary" 
            @click="createUser"
            :loading="creating"
          >
            Crear Usuario
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Dialog para editar usuario -->
    <el-dialog
      v-model="showEditUserDialog"
      title="Editar Usuario"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="120px"
      >
        <el-form-item label="Usuario" prop="username">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editForm.email" type="email" />
        </el-form-item>
        <el-form-item label="Rol" prop="role_name">
          <el-select v-model="editForm.role_name" placeholder="Seleccionar rol">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Estado">
          <el-switch
            v-model="editForm.is_active"
            active-text="Activo"
            inactive-text="Inactivo"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showEditUserDialog = false">Cancelar</el-button>
          <el-button 
            type="primary" 
            @click="updateUser"
            :loading="updating"
          >
            Actualizar Usuario
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Dialog para cambiar contraseña -->
    <el-dialog
      v-model="showPasswordDialog"
      title="Cambiar Contraseña"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="180px"
      >
        <el-form-item label="Nueva contraseña" prop="new_password">
          <el-input 
            v-model="passwordForm.new_password" 
            type="password" 
            placeholder="Ingrese la nueva contraseña"
            size="large"
          />
        </el-form-item>
        <el-form-item label="Confirmar contraseña" prop="confirm_password">
          <el-input 
            v-model="passwordForm.confirm_password" 
            type="password" 
            placeholder="Confirme la nueva contraseña"
            size="large"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showPasswordDialog = false">Cancelar</el-button>
          <el-button 
            type="primary" 
            @click="updatePassword"
            :loading="changingPassword"
          >
            Cambiar Contraseña
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, nextTick, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUsersStore } from '#/store/users';
import { useUserStore } from '@vben/stores';

// Stores
const usersStore = useUsersStore();
const userStore = useUserStore();

// Variables reactivas
const showCreateUserDialog = ref(false);
const showEditUserDialog = ref(false);
const showPasswordDialog = ref(false);
const searchQuery = ref('');
const creating = ref(false);
const updating = ref(false);
const changingPassword = ref(false);
const selectedUser = ref<any>(null);
const showPassword = ref(false);
const formKey = ref(0);

// Referencias del formulario
const createFormRef = ref();
const editFormRef = ref();
const passwordFormRef = ref();

// Formularios - Usando ref para aislamiento completo
// Función para crear un formulario limpio sin referencias externas
const createEmptyForm = () => ({
  username: '',
  email: '',
  password: '',
  role_name: '',
  is_active: true
});

// Usar ref en lugar de reactive para evitar cualquier vinculación
const createForm = ref(createEmptyForm());

const editForm = reactive({
  id: 0,
  username: '',
  email: '',
  role_name: '',
  is_active: true
});

const passwordForm = reactive({
  new_password: '',
  confirm_password: ''
});

// Reglas de validación
const createRules = {
  username: [
    { required: true, message: 'El usuario es requerido', trigger: 'blur' },
    { min: 3, max: 50, message: 'El usuario debe tener entre 3 y 50 caracteres', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'El email es requerido', trigger: 'blur' },
    { type: 'email', message: 'Formato de email inválido', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'La contraseña es requerida', trigger: 'blur' },
    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
  ],
  role_name: [
    { required: true, message: 'El rol es requerido', trigger: 'change' }
  ]
};

const editRules = {
  username: [
    { required: true, message: 'El usuario es requerido', trigger: 'blur' },
    { min: 3, max: 50, message: 'El usuario debe tener entre 3 y 50 caracteres', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'El email es requerido', trigger: 'blur' },
    { type: 'email', message: 'Formato de email inválido', trigger: 'blur' }
  ],
  role_name: [
    { required: true, message: 'El rol es requerido', trigger: 'change' }
  ]
};

const passwordRules = {
  new_password: [
    { required: true, message: 'La nueva contraseña es requerida', trigger: 'blur' },
    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
  ],
  confirm_password: [
    { required: true, message: 'Confirmar contraseña es requerido', trigger: 'blur' },
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (value !== passwordForm.new_password) {
          callback(new Error('Las contraseñas no coinciden'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// Computed properties
const users = computed(() => usersStore.users);
const roles = computed(() => usersStore.roles);
const loading = computed(() => usersStore.loading);
const activeUsers = computed(() => usersStore.activeUsers);
const adminUsers = computed(() => usersStore.adminUsers);
const normalUsers = computed(() => usersStore.normalUsers);
const currentUser = computed(() => userStore.userInfo);

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user => 
    user.username.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
});

// Métodos
const getRoleTagType = (role: string) => {
  switch (role) {
    case 'administrador':
      return 'danger';
    case 'usuario':
      return 'success';
    default:
      return 'info';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const refreshUsers = async () => {
  await usersStore.loadUsers();
  ElMessage.success('Lista de usuarios actualizada');
};

const openCreateUserDialog = async () => {
  // Incrementar el key para forzar re-renderizado del formulario
  formKey.value++;
  
  // Crear un objeto completamente nuevo y asignarlo
  createForm.value = createEmptyForm();
  
  // Resetear el estado de mostrar contraseña
  showPassword.value = false;
  
  // Abrir el modal
  showCreateUserDialog.value = true;
  
  // Esperar múltiples ticks para asegurar renderizado completo
  await nextTick();
  await nextTick();
  
  // Reset final después del renderizado completo
  createForm.value = createEmptyForm();
  
  // Limpiar validaciones si el formulario ya está disponible
  if (createFormRef.value) {
    createFormRef.value.clearValidate();
    createFormRef.value.resetFields();
  }
  
  console.log('openCreateUserDialog: Form reset to:', createForm.value);
};

const cancelCreateUser = () => {
  // Incrementar el key para forzar re-renderizado
  formKey.value++;
  
  // Resetear el formulario al cancelar usando valores completamente nuevos
  createForm.value = createEmptyForm();
  
  showPassword.value = false;
  showCreateUserDialog.value = false;
  
  console.log('cancelCreateUser: Form reset to:', createForm.value);
};

const createUser = async () => {
  await createFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    
    creating.value = true;
    try {
      const result = await usersStore.createUser(createForm.value);
      
      if (result.success) {
        ElMessage.success('Usuario creado exitosamente');
        showCreateUserDialog.value = false;
        resetCreateForm();
      } else {
        ElMessage.error(result.message || 'Error al crear usuario');
      }
    } catch (error) {
      ElMessage.error('Error al crear usuario');
    } finally {
      creating.value = false;
    }
  });
};

const editUser = (user: any) => {
  selectedUser.value = user;
  Object.assign(editForm, {
    id: user.id,
    username: user.username,
    email: user.email,
    role_name: user.roles[0] || 'usuario',
    is_active: user.is_active
  });
  showEditUserDialog.value = true;
};

const updateUser = async () => {
  await editFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    
    updating.value = true;
    try {
      const result = await usersStore.updateUser(editForm.id, editForm);
      
      if (result.success) {
        ElMessage.success('Usuario actualizado exitosamente');
        showEditUserDialog.value = false;
      } else {
        ElMessage.error(result.message || 'Error al actualizar usuario');
      }
    } catch (error) {
      ElMessage.error('Error al actualizar usuario');
    } finally {
      updating.value = false;
    }
  });
};

const deleteUser = async (user: any) => {
  try {
    await ElMessageBox.confirm(
      `¿Estás seguro de que quieres eliminar al usuario "${user.username}"?`,
      'Confirmar eliminación',
      {
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }
    );
    
    const result = await usersStore.deleteUser(user.id);
    
    if (result.success) {
      ElMessage.success('Usuario eliminado exitosamente');
    } else {
      ElMessage.error(result.message || 'Error al eliminar usuario');
    }
  } catch (error) {
    // Usuario canceló la operación
  }
};

const changePassword = (user: any) => {
  selectedUser.value = user;
  passwordForm.new_password = '';
  passwordForm.confirm_password = '';
  showPasswordDialog.value = true;
};

const updatePassword = async () => {
  await passwordFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    
    changingPassword.value = true;
    try {
      const result = await usersStore.changeUserPassword(selectedUser.value.id, passwordForm);
      
      if (result.success) {
        ElMessage.success('Contraseña cambiada exitosamente');
        showPasswordDialog.value = false;
      } else {
        ElMessage.error(result.message || 'Error al cambiar contraseña');
      }
    } catch (error) {
      ElMessage.error('Error al cambiar contraseña');
    } finally {
      changingPassword.value = false;
    }
  });
};

const resetCreateForm = () => {
  // Incrementar el key para forzar re-renderizado
  formKey.value++;
  
  // Asignar valores limpios directamente al ref
  createForm.value = createEmptyForm();
  
  // Resetear el estado de mostrar contraseña
  showPassword.value = false;
  
  // Limpiar validaciones del formulario si existe la referencia
  if (createFormRef.value) {
    createFormRef.value.resetFields();
    createFormRef.value.clearValidate();
  }
};

// Lifecycle
onMounted(async () => {
  // Asegurar que el formulario esté vacío al cargar la página
  resetCreateForm();
  
  await usersStore.loadUsers();
  await usersStore.loadRoles();
});

// Watcher para detectar cuando se abra el modal y garantizar formulario vacío
watch(showCreateUserDialog, async (newValue) => {
  if (newValue) {
    // Cuando se abra el modal, garantizar que esté vacío
    await nextTick();
    
    createForm.value = createEmptyForm();
    
    console.log('Watcher: Form reset to:', createForm.value);
  }
});

// Función para garantizar formulario vacío cuando el modal esté completamente abierto
const onDialogOpened = async () => {
  // Desconectar de cualquier referencia externa y crear datos frescos
  
  // Forzar re-renderizado primero
  formKey.value++;
  
  // Esperar que se re-renderice
  await nextTick();
  
  // Asignar valores completamente nuevos
  createForm.value = createEmptyForm();
  
  // Esperar otro tick
  await nextTick();
  
  // Limpiar validaciones después del re-renderizado
  if (createFormRef.value) {
    createFormRef.value.clearValidate();
    createFormRef.value.resetFields();
  }
  
  // Debug: Log para verificar que los valores estén vacíos
  console.log('Form values after reset:', createForm.value);
  
  // SOLUCIÓN AGRESIVA: Verificar y limpiar campos cada 100ms por 2 segundos
  let checks = 0;
  const maxChecks = 20; // 2 segundos / 100ms
  
  const intervalId = setInterval(async () => {
    checks++;
    
    // Verificar si algún campo tiene datos no deseados
    if (createForm.value.username !== '' || 
        createForm.value.password !== '' || 
        createForm.value.email !== '' ||
        createForm.value.role_name !== '') {
      
      console.log('🚨 Detectado auto-llenado, limpiando campos...', createForm.value);
      
      // Forzar limpieza inmediata
      createForm.value = createEmptyForm();
      formKey.value++;
      
      // Forzar actualización de DOM
      await nextTick();
      
      console.log('✅ Campos limpiados nuevamente:', createForm.value);
    }
    
    // Detener después de maxChecks
    if (checks >= maxChecks) {
      clearInterval(intervalId);
      console.log('🔒 Protección anti auto-llenado completada');
    }
  }, 100);
  
  // Protección adicional: Escuchar cambios en el formulario
  const unwatch = watch(createForm, (newVal) => {
    if (newVal.username === 'admin' || newVal.password === 'admin123') {
      console.log('🚨 Detectado cambio no autorizado, revirtiendo...', newVal);
      createForm.value = createEmptyForm();
      formKey.value++;
    }
  }, { deep: true });
  
  // Limpiar el watcher después de 5 segundos
  setTimeout(() => {
    unwatch();
    console.log('🔒 Watcher de protección desactivado');
  }, 5000);
};
</script>

<style scoped>
/* Estilos generales del contenedor - Compatible con tema claro/oscuro */
.admin-container {
  min-height: 100vh;
  background: var(--vben-color-bg-1, linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8faff 100%));
  padding: 32px;
  transition: background 0.3s ease;
}

/* Tema oscuro */
html.dark .admin-container {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.admin-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 20px 40px rgba(30, 64, 175, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.admin-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%);
  pointer-events: none;
}

/* Tema oscuro para header */
html.dark .admin-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #4338ca 100%);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.4);
  border-color: rgba(255, 255, 255, 0.05);
}

.admin-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.admin-icon-svg {
  width: 48px;
  height: 48px;
  color: #ffffff;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.admin-subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--vben-color-bg-1, linear-gradient(135deg, #ffffff 0%, #f8faff 100%));
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(30, 64, 175, 0.08);
  display: flex;
  align-items: center;
  gap: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid var(--vben-border-color, #e1e7ef);
  position: relative;
  overflow: hidden;
}

html.dark .stat-card {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border-color: #374151;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%);
  opacity: 0.8;
}

html.dark .stat-card::before {
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #4338ca 100%);
}

.stat-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 48px rgba(30, 64, 175, 0.15);
  border-color: #3b82f6;
}

html.dark .stat-card:hover {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  border-color: #2563eb;
}

.stat-icon {
  font-size: 2.8rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 50%;
  border: 3px solid #93c5fd;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

html.dark .stat-icon {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  border-color: #2563eb;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

html.dark .stat-card:hover .stat-icon {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: var(--vben-color-primary, #1e40af);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

html.dark .stat-info h3 {
  color: #60a5fa;
  text-shadow: 0 2px 4px rgba(96, 165, 250, 0.2);
}

.stat-info p {
  font-size: 1rem;
  color: var(--vben-color-text-2, #64748b);
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.3px;
}

html.dark .stat-info p {
  color: #94a3b8;
}

/* Controles estilo incidentes */
.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 0;
  gap: 20px;
  flex-wrap: wrap;
}

.controls-left {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.controls-right {
  display: flex;
  align-items: center;
}

.create-btn, .refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.create-btn {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border: 2px solid #1d4ed8;
  color: white;
}

.create-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.3);
}

.refresh-btn {
  background: var(--vben-color-bg-1, #ffffff);
  border: 2px solid var(--vben-border-color, #d1d5db);
  color: var(--vben-color-text-1, #374151);
}

.refresh-btn:hover {
  background: var(--vben-color-bg-2, #f9fafb);
  border-color: #9ca3af;
  transform: translateY(-1px);
}

html.dark .refresh-btn {
  background: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

html.dark .refresh-btn:hover {
  background: #4b5563;
  border-color: #6b7280;
}

/* Buscador estilo incidentes - IGUAL QUE EN INCIDENT TABLE */
.search-input-wrapper {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #C0C9EE 0%, #898AC4 100%);
  border: 2.5px solid #898AC4;
  border-radius: 16px;
  box-shadow: 0 4px 16px #C0C9EE55;
  padding: 0 12px 0 0;
  transition: box-shadow 0.2s, border-color 0.2s;
  width: 340px;
  max-width: 100%;
}

.search-input-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px #898AC455;
}

.search-svg-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px #898AC433;
}

.custom-search-input {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 1.08rem;
  font-weight: 500;
  color: #2D3748;
  width: 100%;
  padding: 0;
}

.custom-search-input :deep(.el-input__wrapper) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.custom-search-input :deep(.el-input__inner) {
  background: transparent !important;
  color: #2D3748;
  font-weight: 500;
  font-size: 1.08rem;
  border: none;
  box-shadow: none;
}

.custom-search-input :deep(.el-input__inner::placeholder) {
  color: #4A5568;
  font-weight: 400;
  opacity: 0.8;
}

/* Card de usuarios - IGUAL QUE EN INCIDENT TABLE */
.incident-card {
  max-width: 1200px;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: 0 0 0 4px #78B3CE, 0 8px 32px #78B3CE;
  background: transparent;
  padding-bottom: 32px;
  border: 2.5px solid #78B3CE;
}

html.dark .incident-card {
  box-shadow: 0 0 0 4px #4a90a4, 0 8px 32px #4a90a4;
  border-color: #4a90a4;
}

.incident-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.45rem;
  font-weight: 800;
  color: #0A97B0;
  letter-spacing: 1.2px;
  text-shadow: 0 2px 8px #fff8, 0 1px 2px #0A97B033;
}

html.dark .incident-card-header {
  color: #60a5fa;
}

/* Tabla estilo incidentes - EXACTAMENTE IGUAL */
.incident-table.custom-bg-table {
  margin-top: 24px;
  border-radius: 14px;
  background: #DED3C4;
  font-size: 0.85rem;
  box-shadow: 0 2px 12px #FFE893;
  overflow-x: auto;
}

html.dark .incident-table.custom-bg-table {
  background: #2d3748;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

/* Estilos de tabla - EXACTAMENTE IGUALES QUE INCIDENT TABLE */
.incident-table :deep(.el-table),
.incident-table :deep(.el-table__header),
.incident-table :deep(.el-table__body),
.incident-table :deep(.el-table th),
.incident-table :deep(.el-table td) {
  background: #DED3C4 !important;
  font-size: 0.85rem;
}

html.dark .incident-table :deep(.el-table),
html.dark .incident-table :deep(.el-table__header),
html.dark .incident-table :deep(.el-table__body),
html.dark .incident-table :deep(.el-table th),
html.dark .incident-table :deep(.el-table td) {
  background: #2d3748 !important;
  color: #e2e8f0 !important;
}

.incident-table :deep(.el-table__body tr:nth-child(odd) > td) {
  background: #B2D8CE !important;
}

.incident-table :deep(.el-table__body tr:nth-child(even) > td) {
  background: #DED3C4 !important;
}

html.dark .incident-table :deep(.el-table__body tr:nth-child(odd) > td) {
  background: #374151 !important;
}

html.dark .incident-table :deep(.el-table__body tr:nth-child(even) > td) {
  background: #2d3748 !important;
}

.incident-table :deep(.el-table th) {
  font-weight: 700;
  background: #b6a58c !important;
  color: #2d3a4b !important;
  font-size: 0.89rem;
}

html.dark .incident-table :deep(.el-table th) {
  background: #1f2937 !important;
  color: #f3f4f6 !important;
}

.incident-table :deep(.el-table__body tr:hover > td) {
  background: #e0e7ff !important;
}

html.dark .incident-table :deep(.el-table__body tr:hover > td) {
  background: #4b5563 !important;
}

/* Elementos de celdas simplificados */
.id-badge-simple {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  border: 1px solid #cbd5e1;
}

html.dark .id-badge-simple {
  background: #374151;
  color: #d1d5db;
  border-color: #4b5563;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar-simple {
  width: 28px;
  height: 28px;
  background: #64748b;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

html.dark .user-avatar-simple {
  background: #4b5563;
}

.username-simple {
  font-weight: 600;
  color: #374151;
  font-size: 13px;
}

html.dark .username-simple {
  color: #f3f4f6;
}

.email-simple {
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Monaco', 'Menlo', monospace;
}

html.dark .email-simple {
  color: #94a3b8;
}

.name-simple {
  color: #374151;
  font-size: 13px;
  font-weight: 500;
}

html.dark .name-simple {
  color: #f3f4f6;
}

/* Badges de rol y estado */
.role-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  display: inline-block;
  min-width: 90px;
  text-align: center;
}

.role-danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.role-success {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #86efac;
}

.role-info {
  background: #e0e7ff;
  color: #4338ca;
  border: 1px solid #a5b4fc;
}

html.dark .role-danger {
  background: #7f1d1d;
  color: #fca5a5;
  border-color: #b91c1c;
}

html.dark .role-success {
  background: #14532d;
  color: #86efac;
  border-color: #166534;
}

html.dark .role-info {
  background: #312e81;
  color: #a5b4fc;
  border-color: #4338ca;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #86efac;
}

.status-inactive {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

html.dark .status-active {
  background: #14532d;
  color: #86efac;
  border-color: #166534;
}

html.dark .status-inactive {
  background: #7f1d1d;
  color: #fca5a5;
  border-color: #b91c1c;
}

.status-dot {
  font-size: 8px;
}

.date-simple {
  color: #64748b;
  font-size: 11px;
  font-weight: 500;
  background: #f1f5f9;
  padding: 4px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
}

html.dark .date-simple {
  color: #94a3b8;
  background: #374151;
}

.no-date-simple {
  color: #9ca3af;
  font-style: italic;
  font-size: 11px;
  opacity: 0.7;
}

html.dark .no-date-simple {
  color: #6b7280;
}

/* Botones de acción - EXACTAMENTE IGUALES QUE INCIDENT TABLE */
.action-buttons {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.action-buttons .el-button {
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 6px 12px;
  min-width: 80px;
  height: 32px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.action-buttons .el-button--primary {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  border: none;
}

.action-buttons .el-button--primary:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
}

.action-buttons .el-button--warning {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
  border: none;
  color: #fff;
}

.action-buttons .el-button--warning:hover {
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 100%);
  color: #fff;
}

.action-buttons .el-button--danger {
  background: linear-gradient(90deg, #f472b6 0%, #ec4899 100%) !important;
  border: none;
  color: #fff !important;
  box-shadow: 0 2px 8px #f472b633;
}

.action-buttons .el-button--danger:hover {
  background: linear-gradient(90deg, #ec4899 0%, #f472b6 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px #ec489933;
}

.action-buttons .el-button--danger:disabled {
  background: #d1d5db !important;
  color: #9ca3af !important;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

html.dark .action-buttons .el-button--danger:disabled {
  background: #374151 !important;
  color: #6b7280 !important;
}

.btn-label {
  font-size: 0.88em;
  font-weight: bold;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.no-users {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 16px;
}

html.dark .no-users {
  color: #9ca3af;
}

/* Estilos adicionales para los diálogos */
:deep(.el-dialog__header) {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 24px 28px;
  margin: 0;
  border-radius: 16px 16px 0 0;
  border-bottom: 4px solid #1d4ed8;
}

html.dark :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-bottom-color: #1e3a8a;
}

:deep(.el-dialog__title) {
  color: white;
  font-weight: 700;
  font-size: 20px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

:deep(.el-dialog__close) {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 22px;
  transition: all 0.3s ease;
}

:deep(.el-dialog__close:hover) {
  color: #ffffff !important;
  transform: scale(1.1);
}

:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--vben-border-color, #e1e7ef);
  box-shadow: 0 20px 64px rgba(30, 64, 175, 0.15);
}

html.dark :deep(.el-dialog) {
  border-color: #374151;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.4);
}

:deep(.el-dialog__body) {
  padding: 32px;
  background: var(--vben-color-bg-1, linear-gradient(135deg, #f8faff 0%, #ffffff 100%));
}

html.dark :deep(.el-dialog__body) {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 20px;
  border-top: 2px solid var(--vben-border-color, #e1e7ef);
  margin-top: 24px;
}

html.dark .dialog-footer {
  border-top-color: #374151;
}

/* Botones mejorados */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
  border: 2px solid #1d4ed8 !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.2) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%) !important;
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.3) !important;
  border-color: #1e3a8a !important;
}

:deep(.el-button) {
  border-radius: 12px !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  padding: 10px 20px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

:deep(.el-button:hover) {
  transform: translateY(-1px) scale(1.02) !important;
}

:deep(.el-button--default) {
  background: var(--vben-color-bg-1, #ffffff) !important;
  border: 2px solid var(--vben-border-color, #d1d5db) !important;
  color: var(--vben-color-text-1, #374151) !important;
}

html.dark :deep(.el-button--default) {
  background: #374151 !important;
  border-color: #4b5563 !important;
  color: #e5e7eb !important;
}

/* Inputs mejorados */
:deep(.el-input__wrapper) {
  border-radius: 12px !important;
  border: 2px solid var(--vben-border-color, #d1d5db) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  background: var(--vben-color-bg-1, #ffffff) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}

html.dark :deep(.el-input__wrapper) {
  border-color: #4b5563 !important;
  background: #374151 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

:deep(.el-input__wrapper:hover) {
  border-color: var(--vben-color-primary, #3b82f6) !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1) !important;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--vben-color-primary, #1e40af) !important;
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1) !important;
}

/* Texto del input visible */
:deep(.el-input__inner) {
  color: var(--vben-color-text-1, #374151) !important;
  background: transparent !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}

html.dark :deep(.el-input__inner) {
  color: #f3f4f6 !important;
}

:deep(.el-input__inner::placeholder) {
  color: var(--vben-color-text-3, #9ca3af) !important;
  opacity: 0.7 !important;
}

html.dark :deep(.el-input__inner::placeholder) {
  color: #6b7280 !important;
}

:deep(.el-form-item__label) {
  font-weight: 700 !important;
  color: var(--vben-color-primary, #1e40af) !important;
  font-size: 14px !important;
  margin-bottom: 8px !important;
}

html.dark :deep(.el-form-item__label) {
  color: #60a5fa !important;
}

/* Select mejorado */
:deep(.el-select) {
  width: 100%;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 12px !important;
  border: 2px solid var(--vben-border-color, #d1d5db) !important;
  background: var(--vben-color-bg-1, #ffffff) !important;
}

html.dark :deep(.el-select .el-input__wrapper) {
  border-color: #4b5563 !important;
  background: #374151 !important;
}

:deep(.el-select .el-input__inner) {
  color: var(--vben-color-text-1, #374151) !important;
  background: transparent !important;
  font-weight: 500 !important;
}

html.dark :deep(.el-select .el-input__inner) {
  color: #f3f4f6 !important;
}

/* Switch mejorado */
:deep(.el-switch) {
  --el-switch-on-color: var(--vben-color-primary, #1e40af);
}

:deep(.el-switch__label) {
  color: var(--vben-color-text-1, #374151) !important;
  font-weight: 500 !important;
}

html.dark :deep(.el-switch__label) {
  color: #f3f4f6 !important;
}

/* Botón de mostrar/ocultar contraseña */
:deep(.el-input__suffix) {
  display: flex;
  align-items: center;
  padding-right: 8px;
}

:deep(.el-input__suffix .el-button) {
  color: var(--vben-color-text-3, #9ca3af) !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 4px !important;
  height: auto !important;
  min-height: auto !important;
  transition: color 0.3s ease !important;
}

:deep(.el-input__suffix .el-button:hover) {
  color: var(--vben-color-primary, #1e40af) !important;
  background: transparent !important;
  transform: none !important;
}

html.dark :deep(.el-input__suffix .el-button) {
  color: #6b7280 !important;
}

html.dark :deep(.el-input__suffix .el-button:hover) {
  color: #60a5fa !important;
}
</style>
