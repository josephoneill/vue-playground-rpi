<template>
  <div class="input--color-container">
    <input class="input--color" ref="inputColor" type="color" :value="color" :style="colorInputCssVars" @click="onClick" @input="onColorChanged" @focus="onFocus" @blur="onBlur" />
  </div>
</template>

<script>
const colorInputHeight = 27;
import { ref, toRefs, computed, watch, nextTick } from 'vue';

export default {
  name: "ColorInput",
  props: {
    color: String,
    isOpened: Boolean,
    positionX: {
      type: Number,
      required: false,
      default: 0
    },
    positionY: {
      type: Number,
      required: false,
      default: 0
    },
  },
  emits: ['update:color', 'update:isOpened'],
  setup(props, { emit }) {
    const { positionX, positionY } = toRefs(props)
    const inputColor = ref(null);

    const colorInputCssVars = computed(() => {
      return {
        '--left': `${positionX.value}px`,
        '--top': `${positionY.value - colorInputHeight}px`,
      }
    });

    watch(colorInputCssVars, async () => {
      await nextTick();
      const inputColorEl = inputColor.value;
      inputColorEl.focus();
      inputColorEl.click();
    });

    const onColorChanged = (event) => {
      const { value } = event.target;
      emit('update:color', value);
    }

    const onClick = (event) => {
      event.stopPropagation();
    }

    const onFocus = () => {
      emit('update:isOpened', true);
    }

    const onBlur = async () => {
      emit('update:isOpened', false);
    }

    return {
      onColorChanged,
      inputColor,
      colorInputCssVars,
      onClick,
      onFocus,
      onBlur
    }
  }
}
</script>

<style>
.input--color {
  opacity: 0;
  position: absolute;
  left: var(--left);
  top: var(--top);
}
</style>