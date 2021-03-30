<template>
  <div class="clock-widget-container">
    <ClockWidget class="clock" fontColor="#ffffff" fontSize="20vmin" />
  </div>
</template>

<script>
import ClockWidget from '@/components/Clock/ClockWidget.vue';

export default {
  name: "Clock",
  components: { ClockWidget }
}
</script>

<style>
.clock-widget-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
  width: 100%;
}
</style>