import { computed, onMounted } from 'vue'
import { SpotifyAuthenticator, SpotifyAPIHandler } from '@/api/spotify';

export default function useSpotifyAuth(store) {
	const spotifyAuthenticator = computed({
		get: () => {
			const spotifyAuthenticator = store.state.spotifyAuthenticator;
			return spotifyAuthenticator ? spotifyAuthenticator : new SpotifyAuthenticator();
		},
		set: (value) => store.commit('setState', {
			key: 'spotifyAuthenticator',
			value: value
		}),
	});

	const spotifyAPIHandler = computed({
		get: () => store.state.spotifyAPIHandler,
		set: (value) => store.commit('setState', {
			key: 'spotifyAPIHandler',
			value: value
		}),
	});

	const getAccessCode = async () => {
		const expiresAt = localStorage.getItem('expiresAt');

		// If expiresAt doesn't exist, then neither does the refresh token, and we need to show the login screen
		if (!expiresAt) return;

		if (expiresAt && parseInt(expiresAt) > Date.now()) {
				const accessToken = localStorage.getItem('spotifyAccessToken');
				spotifyAPIHandler.value = new SpotifyAPIHandler(accessToken);
		} else {
			// Request a new access token using the refresh token
			const refreshToken = localStorage.getItem('spotifyRefreshToken');
			if (!refreshToken) return;

			const data = await spotifyAuthenticator.value.refreshAccessToken(refreshToken);
			loadTokenData(data);
		}
	}

	// Successfully logged in
	const onAuthCodeProvided = async (event) => {
		const { code } = event.data;
		if (event.origin !== window.location.origin || !code)
			return;

		const data = await spotifyAuthenticator.value.requestSpotifyAccessToken(code);
		loadTokenData(data);
	};

	const loadTokenData = (data) => {
		const accessToken = data['access_token'];
		const refreshToken = data['refresh_token'];
		const expiresIn = data['expires_in'];

		// Don't do this in production, it's not secure. Store refresh token in a secure external database
		localStorage.setItem('spotifyAccessToken', accessToken);
		localStorage.setItem('expiresAt', Date.now() + expiresIn * 1000);
		localStorage.setItem('spotifyRefreshToken', refreshToken);

		spotifyAPIHandler.value = new SpotifyAPIHandler(accessToken);
	}

	onMounted(getAccessCode);

  return {
		getAccessCode,
		spotifyAuthenticator,
		spotifyAPIHandler,
		onAuthCodeProvided
  }
}