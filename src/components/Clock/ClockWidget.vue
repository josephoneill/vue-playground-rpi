<template>
  <div class="clock" :style="clockCssVars">
    <p>{{ currentTime }}</p>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, computed } from 'vue';

export default defineComponent({
  name: 'ClockWidget',
  props: {
    fontSize: {
      type: String,
      required: false,
      default: '15vmin'
    },
    fontColor: {
      type: String,
      required: false,
      default: '#000000'
    }
  },
  setup(props) {
    const { fontSize, fontColor } = toRefs(props)
    const currentTime = ref(new Date().toLocaleTimeString());

    const updateTime = () => {
      setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString();
      }, 1000);
    };

    onMounted(updateTime);
    
    const clockCssVars = computed(() => {
      return {
        '--font-size': fontSize.value,
        '--font-color': fontColor.value,
      };
    });

    return {
      currentTime,
      updateTime,
      clockCssVars
    };
  }
});
</script>

<style scoped>
.clock {
  font-size: var(--font-size);
  color: var(--font-color);
  font-family: 'Orbitron';
}
</style>