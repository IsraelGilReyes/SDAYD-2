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
          Registro de Incidente
        </h1>
        <p>Este formulario debe ser llenado por personal autorizado para registrar incidentes atendidos.</p>
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" class="neon-form">
        <!-- Sección 1 - Tipo de Incidente -->
        <div class="form-section">
          <h2 class="section-title">1. Tipo de Incidente</h2>
          <div class="type-options">
            <el-radio-group v-model="form.type">
              <el-radio-button label="Robo" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="8" y="11" width="8" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="10.5" y="7" width="3" height="5" rx="1.5" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Robo
              </el-radio-button>
              <el-radio-button label="Accidente" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="5" y="13" width="14" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="7" y="9" width="10" height="3" rx="1.5" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <circle cx="8.5" cy="17.5" r="1.2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <circle cx="15.5" cy="17.5" r="1.2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Accidente
              </el-radio-button>
              <el-radio-button label="Emergencia médica" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="11" y="6" width="2" height="12" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="6" y="11" width="12" height="2" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Emergencia
              </el-radio-button>
              <el-radio-button label="Agresiones sexuales" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <circle cx="12" cy="9" r="3" stroke="#fff" stroke-width="1.5" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="10" y="12" width="4" height="6" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Agresiones sexuales
              </el-radio-button>
              <el-radio-button label="Fraudes y estafas" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="7" y="10" width="10" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="9" y="14" width="6" height="2" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Fraudes y estafas
              </el-radio-button>
              <el-radio-button label="Daño a la propiedad" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="7" y="13" width="10" height="5" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="10" y="8" width="4" height="4" rx="2" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Daño a la propiedad
              </el-radio-button>
              <el-radio-button label="Agresiones" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="8" y="13" width="8" height="3" rx="1.5" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="11" y="9" width="2" height="6" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Agresiones
              </el-radio-button>
              <el-radio-button label="Amenazas" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <polygon points="12,7 17,17 7,17" stroke="#fff" stroke-width="1.5" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <rect x="11" y="11" width="2" height="4" rx="1" fill="#fff" filter="drop-shadow(0 1px 4px #0006)"/>
                  </svg>
                </span> Amenazas
              </el-radio-button>
              <el-radio-button label="Otro" class="option-btn">
                <span class="icon-radio-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#007074" filter="drop-shadow(0 1px 4px #0006)"/>
                    <text x="12" y="17" text-anchor="middle" font-size="14" fill="#fff" filter="drop-shadow(0 1px 4px #0006)">?</text>
                  </svg>
                </span> Otro
              </el-radio-button>
            </el-radio-group>
          </div>
          
          <el-form-item v-if="form.type === 'Otro'" prop="otherType" class="custom-input">
            <el-input 
              v-model="form.otherType" 
              placeholder="Especifica el tipo"
              prefix-icon="Edit"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
        </div>

        <!-- Fecha y Hora -->
        <div class="datetime-row">
          <div class="datetime-box">
            <span class="datetime-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="4" fill="#007074"/>
                <rect x="7" y="2" width="2" height="4" rx="1" fill="#FFB200"/>
                <rect x="15" y="2" width="2" height="4" rx="1" fill="#FFB200"/>
                <rect x="3" y="9" width="18" height="2" fill="#fff"/>
              </svg>
            </span>
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
            <span class="datetime-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#007074"/>
                <circle cx="12" cy="12" r="8" fill="#fff"/>
                <rect x="11.2" y="7" width="1.6" height="6" rx="0.8" fill="#FFB200"/>
                <rect x="12" y="12" width="5" height="1.6" rx="0.8" fill="#FFB200" transform="rotate(45 12 12)"/>
              </svg>
            </span>
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
        </div>

        <!-- Sección 3 - Ubicación -->
        <div class="form-section">
          <h2 class="section-title">3. Ubicación</h2>
          <el-form-item prop="lugar" class="custom-input">
            <el-input 
              v-model="form.lugar" 
              placeholder="Lugar del incidente (ej. parque, tienda, calle, etc.)"
              prefix-icon="Location"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          <el-form-item prop="street" class="custom-input">
            <el-input 
              v-model="form.street" 
              placeholder="Calle y colonia"
              prefix-icon="Location"
              :style="{ background: '#96BBBB' }"
            />
          </el-form-item>
          
          <div class="double-fields">
            <el-form-item prop="extNumber" class="custom-input half-width">
              <el-input 
                v-model="form.extNumber" 
                placeholder="Núm. exterior"
                :style="{ background: '#96BBBB' }"
              />
            </el-form-item>
            
            <el-form-item prop="intNumber" class="custom-input half-width">
              <el-input 
                v-model="form.intNumber" 
                placeholder="Núm. interior (opcional)"
                :style="{ background: '#96BBBB' }"
              />
            </el-form-item>
          </div>
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
  otherType: '',
  name: '',
  phone: '',
  street: '',
  extNumber: '',
  intNumber: '',
  description: '',
  date: '',
  time: '',
  lugar: '',
  officerObservations: '',
  officerConclusions: '',
});

const rules = {
  type: [ { required: true, message: 'Selecciona el tipo de incidente', trigger: 'change' } ],
  date: [ { required: true, message: 'Selecciona la fecha', trigger: 'change' } ],
  time: [ { required: true, message: 'Selecciona la hora', trigger: 'change' } ],
  name: [ { required: true, message: 'Ingresa el nombre', trigger: 'blur' } ],
  phone: [ { required: true, message: 'Ingresa el teléfono', trigger: 'blur' } ],
  street: [ { required: true, message: 'Ingresa la calle y colonia', trigger: 'blur' } ],
  lugar: [ { required: true, message: 'Ingresa el lugar', trigger: 'blur' } ],
  description: [ { required: true, message: 'Ingresa la descripción', trigger: 'blur' } ],
  officerObservations: [ { required: true, message: 'Ingresa las observaciones del oficial', trigger: 'blur' } ],
  // officerConclusions es opcional
  // extNumber e intNumber ya no son obligatorios
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
  border: 2.5px solidrgb(70, 198, 202);
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
  background: linear-gradient(90deg, #48A6A7 0%, #e0e7ff 100%);
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
  border: 2.5px solid #48A6A7;
  background: #B2D8CE;
  box-shadow: 0 2px 8px #48A6A733;
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
.type-options {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.el-radio-group {
  display: flex;
  gap: 12px;
}
.option-btn {
  background: #fff !important;
  color: #6366f1 !important;
  border-radius: 10px !important;
  border: 1.5px solid #b6c2e1 !important;
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 18px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%) !important;
  color: #fff !important;
  border-color: #6366f1 !important;
  box-shadow: 0 2px 8px #6366f144;
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
.double-fields {
  display: flex;
  gap: 16px;
}
.half-width {
  width: calc(50% - 8px);
}
.custom-textarea .el-textarea__inner {
  min-height: 80px;
  resize: none;
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
/* Iconos más grandes y claros */
.el-input__prefix-inner, .el-input__prefix {
  font-size: 1.3rem !important;
  color: #6366f1 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-radio-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
  vertical-align: middle;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: #007074;
  box-shadow: 0 1px 4px #48A6A733;
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
.datetime-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.datetime-form-item {
  width: 100%;
  margin-bottom: 0;
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
