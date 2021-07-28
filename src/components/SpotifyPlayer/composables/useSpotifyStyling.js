
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

    determineColorTheme(rgb);
    sliderColor.value = rgbToHex(rgbLightVibrant[0], rgbLightVibrant[1], rgbLightVibrant[2]);
    titleTextColor.value = determineTextColor();
    this.$emit('onBgColorChanged', { rgb });
  }

  const determineColorTheme = (rgb) => {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    useDarkColors.value = lum > 0.5;
  };

  const determineTextColor = () => {
    if (useDarkColors.value) {
      return '#000000';
    } else {
      return '#ffffff';
    }
  }

  /**
   * @desc Determines the brightness of the button
   * @return 100% brightness if light theme, 0% if dark theme
   */
  const getButtonBrightness = () => {
    if (useDarkColors.value) {
      return 0;
    } else {
      return 100;
    }
  }

  /**
   * @desc Determines the brightness of the button on hover
   */
  const getButtonHoverBrightness = () => {
    if (useDarkColors.value) {
      return 20;
    } else {
      return 80;
    }
  }

  const spotifyPlayerCssVars = computed(() => {
    return {
      '--player-text-color': titleTextColor.value,
      '--player-button-brightness': `${getButtonBrightness()}%`,
      '--player-button-brightness--hover': `${getButtonHoverBrightness()}%`,
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