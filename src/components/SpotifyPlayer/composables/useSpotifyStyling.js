
import { ref, computed } from 'vue';
import { rgbToHex } from '@/utils/colorUtils';
import * as Vibrant from 'node-vibrant';

export default function useSpotifyStyling() {
  const imgAlbumArt = ref('');
  const titleTextColor = ref('');
  const sliderColor = ref('#ffffff');
  const useDarkColors = ref(false);

  const onAlbumArtLoaded = async function() {
    imgAlbumArt.value.setAttribute('crossOrigin', '');
    const pallete = await Vibrant.from(imgAlbumArt.value).getPalette();
    const { rgb } = pallete.Vibrant;
    const rgbLightVibrant = pallete.Muted.rgb;
    sliderColor.value = rgbToHex(rgbLightVibrant[0], rgbLightVibrant[1], rgbLightVibrant[2]);
    titleTextColor.value = determineTextColor(rgb);
    this.$emit('onBgColorChanged', { rgb });
  }

  const determineTextColor = (rgb) => {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    useDarkColors.value = lum > 0.5;
    if (useDarkColors.value) {
      return '#000000';
    } else {
      return '#ffffff';
    }
  }

  const spotifyPlayerCssVars = computed(() => {
    return {
      '--player-text-color': titleTextColor.value,
    };
  });

  return {
    imgAlbumArt,
    onAlbumArtLoaded,
    titleTextColor,
    sliderColor,
    useDarkColors,
    spotifyPlayerCssVars,
  }
}