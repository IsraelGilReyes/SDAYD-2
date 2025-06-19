<template>
  <div class="police-station-banner-static">
    <div class="police-bg"></div>
    <img src="/police-station.jpeg" alt="Estación de policía" draggable="false" />
  </div>
</template>

<style scoped>
.police-station-banner-static {
  width: 120%;
  height: 300%; 
  min-height: 400px;
  max-height: 500px;
  display: flex;
  margin-top: -250px;
  justify-content: center;
  align-items: flex-start;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.police-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.85;
}

.police-station-banner-static img {
  width: 100vw;
  height: 100%;
  max-width: 100vw;
  max-height: 100%;
  object-fit: cover;
  border-radius: 0;
  background: none;
  padding: 0;
  animation: none !important;
  transition: none !important;
  will-change: auto !important;
  position: relative !important;
  left: 0 !important;
  top: 0 !important;
  transform: none !important;
  z-index: 1;
}
</style>
