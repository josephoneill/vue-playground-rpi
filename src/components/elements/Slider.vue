<template>
  <div class="slider" :style="sliderCssVars">
    <input
      type="range"
      :value="modelValue"
      name="slider"
      :min="min"
      :max="max"
      @input="onInput"
      @touchstart="stopPropagation"
      @touchend="stopPropagation"
      @change="$emit('onChange', modelValue)"
    >
    <div class="slider-ghost-track" aria-hidden="true" />
  </div>
</template>

<script>
import { defineComponent, onMounted, toRefs, computed, ref } from 'vue';
import { rgbLinearShade } from '@/utils/colorUtils';

export default defineComponent({
  name: 'Slider',
  props: {
    modelValue: Number,
    // disabled for now
    color: {
      type: String,
      required: false,
      default: '#ffffff'
    },
    dark: {
      type: Boolean,
      required: false,
      default: true
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 100
    }
  },
  setup(props, { emit }) {
    const { color, dark, modelValue, min, max } = toRefs(props);

    const onInput = (event) => {
      emit('update:modelValue', event.target.valueAsNumber);
      emit('onInput', event);
    };

    const stopPropagation = () => event.stopPropagation();

    const percentage = computed(() => {
      return ((modelValue.value - min.value) / (max.value - min.value)) * 100;
    });

    const sliderCssVars = computed(() => {
      const thumbColor = dark.value ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
      const shadeStrength = dark.value ? 0.3 : -0.3;
      return {
        '--thumb-color': thumbColor,
        '--track-color': rgbLinearShade(shadeStrength, thumbColor),
        '--filled-track-color': thumbColor,
        '--track-width': `${percentage.value}%`,
      };
    });

    return {
      onInput,
      stopPropagation,
      percentage,
      sliderCssVars
    }
  }
});
</script>

<style scoped>
.slider {
  position: relative;
}
.slider-ghost-track {
  position: absolute;
  height: 2px;
  width: var(--track-width);
  top: 18px;
  background: var(--filled-track-color);
  pointer-events: none;
}
input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: var(--track-color);
}
input[type=range]::-webkit-slider-thumb {
  margin-top: -7px;
  height: 16px;
  width: 16px;
  border-radius: 100%;
  background: var(--thumb-color);
  cursor: pointer;
  -webkit-appearance: none;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: var(--track-color);
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: var(--thumb-color);
  cursor: pointer;
}
</style>