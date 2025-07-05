<template>
  <div class="test-container">
    <h1>✅ Test Page - Funcionando</h1>
    <p>Si puedes ver esta página, las rutas están funcionando correctamente.</p>
    <el-button type="primary" @click="goBack">Volver al Dashboard</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.push('/dashboard');
}
</script>

<style scoped>
.test-container {
  padding: 50px;
  text-align: center;
  background: #f0f9ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #0A97B0;
  margin-bottom: 20px;
}

p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}
</style> 
