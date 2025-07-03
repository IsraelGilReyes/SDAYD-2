<template>
  <div class="dashboard-container">
    <IncidentTable />
  </div>
</template>

<script setup lang="ts">
import IncidentTable from '../_core/incident/IncidentTable.vue'
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
</style> 
