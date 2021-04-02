<template>
  <div class="clock-widget" :style="clockWidgetCssVars">
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
    
    const clockWidgetCssVars = computed(() => {
      return {
        '--font-size': fontSize.value,
        '--font-color': fontColor.value,
      };
    });

    return {
      currentTime,
      updateTime,
      clockWidgetCssVars
    };
  }
});
</script>

<style scoped>
.clock-widget {
  font-size: var(--font-size);
  color: var(--font-color);
  font-family: 'Source Code Pro';
  font-variant-numeric: tabular-nums;
}

p {
  margin: 0;
}
</style>