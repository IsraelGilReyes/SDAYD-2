<template>
  <div class="modern-form-container">
    <div class="glass-card">
      <div class="form-header">
        <h1>
          <span class="shield-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 6V11C4 16.25 7.8 20.25 12 21C16.2 20.25 20 16.25 20 11V6L12 3Z" stroke="#48A6A7" stroke-width="2.2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
              <path d="M12 3V21" stroke="#48A6A7" stroke-width="2.2" filter="drop-shadow(0 1px 4px #0006)"/>
            </svg>
          </span>
          Registro de Incidente (Versión Simple)
        </h1>
        <p>Este formulario debe ser llenado por personal autorizado para registrar incidentes atendidos.</p>
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" class="neon-form">
        <!-- Sección 1 - Tipo de Incidente -->
        <div class="form-section">
          <h2 class="section-title">1. Tipo de Incidente</h2>
          <el-form-item prop="type" class="custom-input">
            <el-select 
              v-model="form.type" 
              placeholder="Selecciona el tipo de incidente"
              :style="{ width: '100%', background: '#96BBBB' }"
            >
              <el-option label="Robo" value="Robo" />
              <el-option label="Accidente" value="Accidente" />
              <el-option label="Emergencia médica" value="Emergencia médica" />
              <el-option label="Agresiones sexuales" value="Agresiones sexuales" />
              <el-option label="Fraudes y estafas" value="Fraudes y estafas" />
              <el-option label="Daño a la propiedad" value="Daño a la propiedad" />
              <el-option label="Agresiones" value="Agresiones" />
              <el-option label="Amenazas" value="Amenazas" />
              <el-option label="Otro" value="Otro" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Fecha y Hora -->
        <div class="datetime-row">
          <div class="datetime-box">
            <el-form-item prop="date" class="datetime-form-item">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="Fecha"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
                :style="{ width: '100%' }"
              />
            </el-form-item>
          </div>
          <div class="datetime-box">
            <el-form-item prop="time" class="datetime-form-item">
              <el-time-picker
                v-model="form.time"
                placeholder="Hora"
                format="HH:mm"
                value-format="HH:mm"
                :style="{ width: '100%' }"
              />
            </el-form-item>
          </div>
        </div>

        <!-- Sección 2 - Información Personal -->
        <div class="form-section">
          <h2 class="section-title">2. Información personal</h2>
          <el-form-item prop="name" class="custom-input">
            <el-input 
              v-model="form.name" 
              placeholder="Nombre de la persona que reporto"
              prefix-icon="User"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          
          <el-form-item prop="phone" class="custom-input">
            <el-input 
              v-model="form.phone" 
              placeholder="Teléfono de la persona que reporto"
              prefix-icon="Phone"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>

          <el-form-item prop="personType" class="custom-input">
            <el-select 
              v-model="form.personType" 
              placeholder="Tipo de persona"
              :style="{ width: '100%', background: '#96BBBB' }"
            >
              <el-option label="Testigo" value="testigo" />
              <el-option label="Víctima" value="victima" />
              <el-option label="Familiar" value="familiar" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Sección 3 - Ubicación -->
        <div class="form-section">
          <h2 class="section-title">3. Ubicación</h2>
          <el-form-item prop="exactAddress" class="custom-input">
            <el-input 
              v-model="form.exactAddress" 
              placeholder="Dirección exacta (ej: Calle 5 #10-20)"
              prefix-icon="Location"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>

          <el-form-item prop="lugar" class="custom-input">
            <el-input 
              v-model="form.lugar" 
              placeholder="Lugar del incidente (ej. parque, tienda, calle, etc.)"
              prefix-icon="Location"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
        </div>

        <!-- Sección 4 - Descripción -->
        <div class="form-section">
          <h2 class="section-title">4. Detalles</h2>
          <el-form-item prop="description" class="custom-textarea">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="5"
              placeholder="Describe lo ocurrido con todos los detalles posibles..."
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          <el-form-item prop="officerObservations" class="custom-textarea">
            <el-input
              v-model="form.officerObservations"
              type="textarea"
              :rows="3"
              placeholder="Observaciones del oficial"
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          <el-form-item prop="officerConclusions" class="custom-textarea" :required="false">
            <el-input
              v-model="form.officerConclusions"
              type="textarea"
              :rows="3"
              placeholder="Conclusiones del oficial (opcional)"
              resize="none"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
        </div>

        <!-- Botón de Envío -->
        <el-button 
          type="primary" 
          @click="submitForm" 
          class="submit-btn"
          round
        >
          <span class="btn-content">
            📤 Enviar Reporte
          </span>
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const emit = defineEmits(['add-incident']);

const formRef = ref();

const form = ref({
  type: '',
  name: '',
  phone: '',
  personType: '',
  exactAddress: '',
  lugar: '',
  description: '',
  date: '',
  time: '',
  officerObservations: '',
  officerConclusions: '',
});

const rules = {
  type: [ { required: true, message: 'Selecciona el tipo de incidente', trigger: 'change' } ],
  date: [ { required: true, message: 'Selecciona la fecha', trigger: 'change' } ],
  time: [ { required: true, message: 'Selecciona la hora', trigger: 'change' } ],
  name: [ { required: true, message: 'Ingresa el nombre', trigger: 'blur' } ],
  phone: [ { required: true, message: 'Ingresa el teléfono', trigger: 'blur' } ],
  personType: [ { required: true, message: 'Selecciona el tipo de persona', trigger: 'change' } ],
  exactAddress: [ { required: true, message: 'Ingresa la dirección exacta', trigger: 'blur' } ],
  description: [ { required: true, message: 'Ingresa la descripción', trigger: 'blur' } ],
  officerObservations: [ { required: true, message: 'Ingresa las observaciones del oficial', trigger: 'blur' } ],
};

function submitForm() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('add-incident', { ...form.value });
      ElMessage.success('Incidente registrado');
      // Limpiar el formulario
      Object.keys(form.value).forEach(key => form.value[key] = '');
    }
  });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.modern-form-container {
  background: transparent;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0 40px 0;
}
.glass-card {
  background: #fff;
  border-radius: 24px;
  border: 2.5px solid #FFB200;
  width: 100%;
  max-width: 650px;
  padding: 40px 32px 32px 32px;
  box-shadow: 0 8px 32px #FFE893, 0 2px 8px #FFE893;
}
.form-header {
  text-align: center;
  margin-bottom: 32px;
}
.form-header h1 {
  font-family: 'Lobster', cursive !important;
  font-size: 2.3rem;
  font-weight: 400;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(90deg, #0A97B0 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.shield-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  border: 2.5px solid #0A97B0;
  background: #B2D8CE;
  box-shadow: 0 2px 8px #0A97B033;
  margin-right: 8px;
}
.form-header p {
  color: #b6c2e1 ;
  font-size: 1rem;
}
.neon-form {
  margin-top: 0;
}
.form-section {
  margin-bottom: 32px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e7eb;
}
.section-title {
  color: #6366f1;
  font-size: 1.18rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.custom-input .el-input__wrapper,
.custom-input .el-input__inner,
.custom-textarea .el-textarea__inner {
  background: #96BBBB !important;
  border-radius: 10px !important;
  border: 1.5px solid #b6c2e1 !important;
  box-shadow: 0 1px 4px rgba(0,60,120,0.06);
  font-size: 1rem;
  color: #2d3a4b;
}
.custom-input .el-input__wrapper:focus-within,
.custom-input .el-input__inner:focus,
.custom-textarea .el-textarea__inner:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 2px #6366f133;
}
.custom-textarea .el-textarea__inner {
  min-height: 80px;
  resize: none;
}
.datetime-row {
  display: flex;
  gap: 24px;
  margin: 18px 0 0 0;
  justify-content: center;
}
.datetime-box {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px #b6c2e144;
  border: 1.5px solid #b6c2e1;
  padding: 16px 18px 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
  max-width: 180px;
}
.datetime-form-item {
  width: 100%;
  margin-bottom: 0;
}
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0 0 0;
  padding: 14px 0;
  border-radius: 12px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #6366f144;
  border: none;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
  color: #fff;
  box-shadow: 0 4px 16px #6366f144;
}
.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}
.el-input__prefix-inner, .el-input__prefix {
  font-size: 1.3rem !important;
  color: #6366f1 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 700px) {
  .glass-card {
    padding: 20px 6px 16px 6px;
    border-radius: 16px;
  }
  .form-header h1 {
    font-size: 1.3rem;
  }
  .section-title {
    font-size: 1rem;
  }
  .datetime-row {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .datetime-box {
    min-width: 120px;
    max-width: 100%;
    padding: 10px 8px 8px 8px;
  }
}
</style> 
