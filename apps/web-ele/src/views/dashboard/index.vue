<template>
  <div class="dashboard-container">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h2>Bienvenido al Dashboard</h2>
        </div>
      </template>
      <div class="card-content">
        <p>Has iniciado sesión exitosamente.</p>
        <el-button type="primary" @click="handleLogout">Cerrar Sesión</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '#/store';

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.welcome-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  text-align: center;
  padding: 20px 0;
}

h2 {
  margin: 0;
  color: #409EFF;
}
</style> 
