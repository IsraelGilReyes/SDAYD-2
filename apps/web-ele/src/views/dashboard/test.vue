<template>
  <div class="admin-container">
    <!-- Header -->
    <div class="admin-header">
      <h1 class="admin-title">
        <span class="admin-icon">👨‍💼</span>
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
          @click="showCreateUserDialog = true"
          size="large"
        >
          ➕ Crear Usuario
        </el-button>
        <el-button 
          @click="refreshUsers"
          :loading="loading"
          size="large"
        >
          🔄 Actualizar
        </el-button>
      </div>
      <div class="controls-right">
        <el-input
          v-model="searchQuery"
          placeholder="Buscar usuarios..."
          size="large"
          style="width: 300px"
        />
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="table-container">
      <el-table
        :data="filteredUsers"
        v-loading="loading"
        element-loading-text="Cargando usuarios..."
        stripe
        style="width: 100%"
        max-height="650"
        empty-text="No hay usuarios disponibles"
        class="modern-table"
        :header-cell-style="{
          backgroundColor: '#1e40af',
          color: '#ffffff',
          fontWeight: '600',
          fontSize: '14px',
          borderBottom: '2px solid #3b82f6'
        }"
        :row-style="{
          backgroundColor: '#ffffff'
        }"
      >
        <el-table-column prop="id" label="ID" width="80" align="center">
          <template #default="{ row }">
            <div class="id-cell">
              <span class="id-badge">{{ row.id }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="username" label="Usuario" width="160">
          <template #default="{ row }">
            <div class="user-cell">
              <div class="user-avatar">
                {{ row.username.charAt(0).toUpperCase() }}
              </div>
              <span class="username">{{ row.username }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="email" label="Email" width="220">
          <template #default="{ row }">
            <div class="email-cell">
              <span class="email-text">{{ row.email }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="Nombre Completo" width="200">
          <template #default="{ row }">
            <div class="name-cell">
              <span class="full-name">
                {{ `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'No especificado' }}
              </span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="Rol" width="130" align="center">
          <template #default="{ row }">
            <el-tag
              :type="getRoleTagType(row.roles[0])"
              size="default"
              class="role-tag"
              effect="light"
            >
              {{ row.roles[0] || 'Sin rol' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="Estado" width="110" align="center">
          <template #default="{ row }">
            <el-tag
              :type="row.is_active ? 'success' : 'danger'"
              size="default"
              class="status-tag"
              effect="light"
            >
              <span class="status-icon">{{ row.is_active ? '●' : '●' }}</span>
              {{ row.is_active ? 'Activo' : 'Inactivo' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="Último acceso" width="140" align="center">
          <template #default="{ row }">
            <div class="date-cell">
              <span v-if="row.last_login" class="date-text">
                {{ formatDate(row.last_login) }}
              </span>
              <span v-else class="no-date">Nunca</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Acciones" width="240" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                size="small"
                type="primary"
                class="btn-edit"
                @click="editUser(row)"
                :icon="'Edit'"
              >
                Editar
              </el-button>
              <el-button
                size="small"
                type="warning"
                class="btn-password"
                @click="changePassword(row)"
                :icon="'Lock'"
              >
                Contraseña
              </el-button>
              <el-button
                size="small"
                type="danger"
                class="btn-delete"
                @click="deleteUser(row)"
                :disabled="row.id === currentUser?.userId"
                :icon="'Delete'"
              >
                Eliminar
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Dialog para crear usuario -->
    <el-dialog
      v-model="showCreateUserDialog"
      title="Crear Nuevo Usuario"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="createFormRef"
        :model="createForm"
        :rules="createRules"
        label-width="120px"
      >
        <el-form-item label="Usuario" prop="username">
          <el-input v-model="createForm.username" placeholder="Nombre de usuario" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="createForm.email" type="email" placeholder="correo@ejemplo.com" />
        </el-form-item>
        <el-form-item label="Contraseña" prop="password">
          <el-input v-model="createForm.password" type="password" placeholder="Contraseña" />
        </el-form-item>
        <el-form-item label="Nombre" prop="first_name">
          <el-input v-model="createForm.first_name" placeholder="Nombre" />
        </el-form-item>
        <el-form-item label="Apellido" prop="last_name">
          <el-input v-model="createForm.last_name" placeholder="Apellido" />
        </el-form-item>
        <el-form-item label="Rol" prop="role_name">
          <el-select v-model="createForm.role_name" placeholder="Seleccionar rol">
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
          <el-button @click="showCreateUserDialog = false">Cancelar</el-button>
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
        <el-form-item label="Nombre" prop="first_name">
          <el-input v-model="editForm.first_name" />
        </el-form-item>
        <el-form-item label="Apellido" prop="last_name">
          <el-input v-model="editForm.last_name" />
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
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="140px"
      >
        <el-form-item label="Nueva contraseña" prop="new_password">
          <el-input v-model="passwordForm.new_password" type="password" />
        </el-form-item>
        <el-form-item label="Confirmar contraseña" prop="confirm_password">
          <el-input v-model="passwordForm.confirm_password" type="password" />
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
import { ref, computed, onMounted, reactive } from 'vue';
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

// Referencias del formulario
const createFormRef = ref();
const editFormRef = ref();
const passwordFormRef = ref();

// Formularios
const createForm = reactive({
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  role_name: 'usuario',
  is_active: true
});

const editForm = reactive({
  id: 0,
  username: '',
  email: '',
  first_name: '',
  last_name: '',
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
    user.email.toLowerCase().includes(query) ||
    user.first_name.toLowerCase().includes(query) ||
    user.last_name.toLowerCase().includes(query)
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

const createUser = async () => {
  await createFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    
    creating.value = true;
    try {
      const result = await usersStore.createUser(createForm);
      
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
    first_name: user.first_name,
    last_name: user.last_name,
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
  Object.assign(createForm, {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role_name: 'usuario',
    is_active: true
  });
  createFormRef.value?.resetFields();
};

// Lifecycle
onMounted(async () => {
  await usersStore.loadUsers();
  await usersStore.loadRoles();
});
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

.admin-icon {
  font-size: 3rem;
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

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px 28px;
  background: var(--vben-color-bg-1, linear-gradient(135deg, #ffffff 0%, #f8faff 100%));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(30, 64, 175, 0.08);
  border: 2px solid var(--vben-border-color, #e1e7ef);
  gap: 20px;
  flex-wrap: wrap;
}

html.dark .controls-section {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border-color: #374151;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.controls-left {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.controls-right {
  display: flex;
  align-items: center;
}

/* Contenedor de tabla mejorado */
.table-container {
  background: var(--vben-color-bg-1, #ffffff);
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 12px 48px rgba(30, 64, 175, 0.12);
  border: 2px solid var(--vben-border-color, #e1e7ef);
  overflow: hidden;
  position: relative;
}

html.dark .table-container {
  background: var(--vben-color-bg-2, #1f2937);
  border-color: #374151;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
}

.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%);
  z-index: 1;
}

html.dark .table-container::before {
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 25%, #4338ca 50%, #7c3aed 75%, #9333ea 100%);
}

.table-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);
  overflow: hidden;
  border: 1px solid #bfdbfe;
}

.text-gray-500 {
  color: #64748b;
}

/* Estilos modernos para la tabla - Compatible con tema claro/oscuro */
:deep(.modern-table) {
  border-radius: 16px;
  border: 2px solid var(--vben-border-color, #e1e7ef);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(30, 64, 175, 0.08);
  transition: all 0.3s ease;
}

/* Tema oscuro para la tabla */
html.dark :deep(.modern-table) {
  border-color: #374151;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Header de la tabla */
:deep(.modern-table .el-table__header-wrapper) {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  border-bottom: 3px solid #1d4ed8;
}

html.dark :deep(.modern-table .el-table__header-wrapper) {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%);
  border-bottom: 3px solid #1e3a8a;
}

:deep(.modern-table .el-table__header) {
  background: transparent;
}

:deep(.modern-table th) {
  background: transparent !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  border-bottom: none !important;
  padding: 18px 16px !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

:deep(.modern-table th .cell) {
  color: #ffffff !important;
  text-align: center;
  letter-spacing: 0.5px;
}

/* Celdas del cuerpo de la tabla - Tonos de azul con texto negro */
:deep(.modern-table td) {
  border-bottom: 2px solid #bfdbfe !important;
  padding: 16px 14px !important;
  vertical-align: middle;
  background-color: #f0f9ff !important;
  transition: all 0.3s ease;
  color: #1f2937 !important;
}

/* Forzar texto negro en todas las celdas en tema claro */
:deep(.modern-table td *) {
  color: #1f2937 !important;
}

html.dark :deep(.modern-table td) {
  border-bottom: 2px solid #1e3a8a !important;
  background-color: #1e40af !important;
  color: #ffffff !important;
}

html.dark :deep(.modern-table td *) {
  color: #ffffff !important;
}

/* Filas con efecto hover */
:deep(.modern-table .el-table__body tr:hover > td) {
  background-color: #dbeafe !important;
  border-bottom-color: #2563eb !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  color: #111827 !important;
}

:deep(.modern-table .el-table__body tr:hover > td *) {
  color: #111827 !important;
}

html.dark :deep(.modern-table .el-table__body tr:hover > td) {
  background-color: #2563eb !important;
  border-bottom-color: #3b82f6 !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  color: #ffffff !important;
}

html.dark :deep(.modern-table .el-table__body tr:hover > td *) {
  color: #ffffff !important;
}

/* Filas alternadas (striped) - Tonos de azul alternados */
:deep(.modern-table--striped .el-table__body tr.el-table__row--striped td) {
  background: #e0f2fe !important;
  color: #1f2937 !important;
}

:deep(.modern-table--striped .el-table__body tr.el-table__row--striped td *) {
  color: #1f2937 !important;
}

html.dark :deep(.modern-table--striped .el-table__body tr.el-table__row--striped td) {
  background: #1d4ed8 !important;
  color: #ffffff !important;
}

html.dark :deep(.modern-table--striped .el-table__body tr.el-table__row--striped td *) {
  color: #ffffff !important;
}

/* Líneas divisorias mejoradas */
:deep(.modern-table .el-table__body tr:last-child td) {
  border-bottom: none !important;
}

/* Filas impares - Azul más claro */
:deep(.modern-table .el-table__body tr:nth-child(odd) td) {
  background: #f0f9ff !important;
  color: #1f2937 !important;
}

:deep(.modern-table .el-table__body tr:nth-child(odd) td *) {
  color: #1f2937 !important;
}

/* Filas pares - Azul medio */
:deep(.modern-table .el-table__body tr:nth-child(even) td) {
  background: #e0f2fe !important;
  color: #1f2937 !important;
}

:deep(.modern-table .el-table__body tr:nth-child(even) td *) {
  color: #1f2937 !important;
}

/* Tema oscuro - Filas con azules más oscuros */
html.dark :deep(.modern-table .el-table__body tr:nth-child(odd) td) {
  background: #1e40af !important;
  color: #ffffff !important;
}

html.dark :deep(.modern-table .el-table__body tr:nth-child(odd) td *) {
  color: #ffffff !important;
}

html.dark :deep(.modern-table .el-table__body tr:nth-child(even) td) {
  background: #1d4ed8 !important;
  color: #ffffff !important;
}

html.dark :deep(.modern-table .el-table__body tr:nth-child(even) td *) {
  color: #ffffff !important;
}

/* Estilos para celdas personalizadas - Compatible con tema claro/oscuro */
.id-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.id-badge {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  min-width: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

html.dark .id-badge {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.9);
}

html.dark .user-avatar {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.username {
  font-weight: 700;
  color: #1f2937 !important;
  font-size: 15px;
  transition: color 0.3s ease;
}

html.dark .username {
  color: #e5e7eb !important;
}

.email-cell {
  display: flex;
  align-items: center;
}

.email-text {
  color: #1f2937 !important;
  font-size: 14px;
  font-weight: 500;
}

html.dark .email-text {
  color: #e5e7eb !important;
}

.name-cell {
  display: flex;
  align-items: center;
}

.full-name {
  color: #1f2937 !important;
  font-size: 14px;
  font-weight: 600;
}

html.dark .full-name {
  color: #e5e7eb !important;
}

/* Tags de rol mejorados */
.role-tag {
  border-radius: 10px !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
  font-size: 12px !important;
  border: 2px solid transparent !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
}

.role-tag:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

/* Tags de estado mejorados */
.status-tag {
  border-radius: 10px !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
  font-size: 12px !important;
  border: 2px solid transparent !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
}

.status-tag:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

.status-icon {
  margin-right: 6px;
  font-size: 12px;
}

.date-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.date-text {
  color: #1f2937 !important;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid #bfdbfe;
}

html.dark .date-text {
  color: #e5e7eb !important;
  background: rgba(0, 0, 0, 0.3);
  border-color: #374151;
}

.no-date {
  color: #1f2937 !important;
  font-style: italic;
  font-size: 13px;
  opacity: 0.8;
  font-weight: 500;
}

html.dark .no-date {
  color: #9ca3af !important;
}

/* Estilos para botones de acción - Tonos diferenciados */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-edit {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%) !important;
  border: 2px solid #047857 !important;
  border-radius: 10px !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 10px 18px !important;
  font-size: 12px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3) !important;
}

.btn-edit:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.4) !important;
  border-color: #065f46 !important;
}

html.dark .btn-edit {
  background: linear-gradient(135deg, #047857 0%, #059669 100%) !important;
  border-color: #064e3b !important;
  box-shadow: 0 2px 8px rgba(4, 120, 87, 0.4) !important;
}

html.dark .btn-edit:hover {
  background: linear-gradient(135deg, #065f46 0%, #047857 100%) !important;
  box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5) !important;
}

.btn-password {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%) !important;
  border: 2px solid #b45309 !important;
  border-radius: 10px !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 10px 18px !important;
  font-size: 12px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3) !important;
}

.btn-password:hover {
  background: linear-gradient(135deg, #b45309 0%, #d97706 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.4) !important;
  border-color: #92400e !important;
}

html.dark .btn-password {
  background: linear-gradient(135deg, #b45309 0%, #d97706 100%) !important;
  border-color: #92400e !important;
  box-shadow: 0 2px 8px rgba(180, 83, 9, 0.4) !important;
}

html.dark .btn-password:hover {
  background: linear-gradient(135deg, #92400e 0%, #b45309 100%) !important;
  box-shadow: 0 6px 16px rgba(180, 83, 9, 0.5) !important;
}

.btn-delete {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%) !important;
  border: 2px solid #b91c1c !important;
  border-radius: 10px !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 10px 18px !important;
  font-size: 12px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3) !important;
}

.btn-delete:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4) !important;
  border-color: #991b1b !important;
}

html.dark .btn-delete {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%) !important;
  border-color: #991b1b !important;
  box-shadow: 0 2px 8px rgba(185, 28, 28, 0.4) !important;
}

html.dark .btn-delete:hover {
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 100%) !important;
  box-shadow: 0 6px 16px rgba(185, 28, 28, 0.5) !important;
}

.btn-delete:disabled {
  background: var(--vben-color-bg-3, #e2e8f0) !important;
  color: var(--vben-color-text-3, #94a3b8) !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
  border-color: var(--vben-border-color, #d1d5db) !important;
}

html.dark .btn-delete:disabled {
  background: #374151 !important;
  color: #6b7280 !important;
  border-color: #4b5563 !important;
}

/* Estilos mejorados para tags de rol - Mejor contraste con fondos azules */
:deep(.el-tag--primary) {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
  border: 2px solid #4b5563 !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.4) !important;
}

html.dark :deep(.el-tag--primary) {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%) !important;
  border: 2px solid #1e3a8a !important;
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.4) !important;
}

:deep(.el-tag--success) {
  background: linear-gradient(135deg, #065f46 0%, #047857 100%) !important;
  border: 2px solid #064e3b !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(6, 95, 70, 0.4) !important;
}

html.dark :deep(.el-tag--success) {
  background: linear-gradient(135deg, #064e3b 0%, #047857 100%) !important;
  border: 2px solid #064e3b !important;
  box-shadow: 0 2px 8px rgba(6, 78, 59, 0.4) !important;
}

:deep(.el-tag--warning) {
  background: linear-gradient(135deg, #92400e 0%, #b45309 100%) !important;
  border: 2px solid #78350f !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(146, 64, 14, 0.4) !important;
}

html.dark :deep(.el-tag--warning) {
  background: linear-gradient(135deg, #92400e 0%, #b45309 100%) !important;
  border: 2px solid #78350f !important;
  box-shadow: 0 2px 8px rgba(146, 64, 14, 0.4) !important;
}

:deep(.el-tag--danger) {
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 100%) !important;
  border: 2px solid #7f1d1d !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(153, 27, 27, 0.4) !important;
}

html.dark :deep(.el-tag--danger) {
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 100%) !important;
  border: 2px solid #7f1d1d !important;
  box-shadow: 0 2px 8px rgba(153, 27, 27, 0.4) !important;
}

:deep(.el-tag--info) {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%) !important;
  border: 2px solid #1f2937 !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(55, 65, 81, 0.4) !important;
}

html.dark :deep(.el-tag--info) {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%) !important;
  border: 2px solid #1f2937 !important;
  box-shadow: 0 2px 8px rgba(55, 65, 81, 0.4) !important;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Estilos para diálogos */
:deep(.el-dialog__header) {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 20px;
  margin: 0;
  border-radius: 12px 12px 0 0;
}

:deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 18px;
}

:deep(.el-dialog__close) {
  color: white !important;
  font-size: 20px;
}

:deep(.el-dialog__close:hover) {
  color: #dbeafe !important;
}

:deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-dialog__body) {
  padding: 30px;
  background: #f8faff;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #1e40af;
  font-size: 14px;
}

/* Botones mejorados - Tonos de azul diferenciados */
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

html.dark :deep(.el-button--primary) {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%) !important;
  border-color: #1e3a8a !important;
  box-shadow: 0 4px 16px rgba(30, 58, 138, 0.3) !important;
}

html.dark :deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%) !important;
  box-shadow: 0 8px 24px rgba(30, 58, 138, 0.4) !important;
  border-color: #2563eb !important;
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

:deep(.el-button--default:hover) {
  background: var(--vben-color-bg-hover, #f3f4f6) !important;
  border-color: #3b82f6 !important;
}

html.dark :deep(.el-button--default:hover) {
  background: #4b5563 !important;
  border-color: #2563eb !important;
}

/* Inputs y formularios mejorados - Compatible con ambos temas */
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

html.dark :deep(.el-input__wrapper:hover) {
  border-color: #2563eb !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2) !important;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--vben-color-primary, #1e40af) !important;
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1) !important;
}

html.dark :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
}

:deep(.el-input__inner) {
  color: var(--vben-color-text-1, #374151) !important;
  font-weight: 500 !important;
}

html.dark :deep(.el-input__inner) {
  color: #e5e7eb !important;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 12px !important;
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

/* Estilos para diálogos - Compatible con ambos temas */
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

/* Animaciones suaves */
:deep(.el-table__body tr) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Loading personalizado */
:deep(.el-loading-spinner) {
  color: var(--vben-color-primary, #3b82f6) !important;
}

:deep(.el-loading-text) {
  color: var(--vben-color-primary, #1e40af) !important;
  font-weight: 600 !important;
}

html.dark :deep(.el-loading-spinner) {
  color: #60a5fa !important;
}

html.dark :deep(.el-loading-text) {
  color: #60a5fa !important;
}
</style>
