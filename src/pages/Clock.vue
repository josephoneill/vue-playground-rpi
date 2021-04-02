<template>
  <div class="clock-widget-container" :style="clockCssVars" @click="updateColorInputPosition($event, 'bg')">
    <ColorInput v-model:color="bgColor" :positionX="bgColorPos.x" :positionY="bgColorPos.y" />
    <ColorInput v-model:color="fontColor" :positionX="clockColorPos.x" :positionY="clockColorPos.y" />
    <ClockWidget class="clock" :fontColor="fontColor" fontSize="20vmin" @click="updateColorInputPosition($event, 'clock')" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { ClockWidget, ColorInput } from '@/components';

export default {
  name: "Clock",
  components: { ClockWidget, ColorInput },
  setup() {
    const fontColor = ref('#000000');
    const bgColor = ref('#2c3e50');

    const clockColorPos = ref({x: 0, y: 0});
    const bgColorPos = ref({x: 0, y: 0});


    const updateColorInputPosition = async (event, type) => {
      event.stopPropagation();
      const { pageX, pageY } = event;
      
      let pos = (type === 'clock' ? clockColorPos : bgColorPos);
      pos.value.x = pageX;
      pos.value.y = pageY;
    };

    const clockCssVars = computed(() => {
      return {
        '--bg-color': bgColor.value,
      };
    });

    return {
      fontColor,
      bgColor,
      updateColorInputPosition,
      clockColorPos,
      bgColorPos,
      clockCssVars
    }
  }
}
</script>

<style>
.clock-widget-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
  width: 100%;
}
</style>