import { computed, ref } from 'vue'

export default function useSpotifyPageUI(spotifyAuthenticator) {
	const backgroundColor = ref([0, 0, 0]);

	const onSpotifyLoginClick = () => {
		spotifyAuthenticator.value.openSpotifyAuthorization();
	}
	
	const onBgColorChanged = (event) => {
		backgroundColor.value = event.rgb;
	}

	const spotifyCssVars = computed(() => {
		return {
			'--bg-color': `rgb(${backgroundColor.value[0]}, ${backgroundColor.value[1]}, ${backgroundColor.value[2]}`,
		};
	});

  return {
		backgroundColor,
		onSpotifyLoginClick,
		onBgColorChanged,
		spotifyCssVars
  };
}