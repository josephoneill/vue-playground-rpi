<template>
  <div class="spotify-page" :style="spotifyCssVars">
    <button v-if="!spotifyAPIHandler" @click="onSpotifyLoginClick">Login</button>
    <SpotifyPlayer v-if="spotifyAPIHandler" :spotifyAPIHandler="spotifyAPIHandler" @onBgColorChanged="onBgColorChanged" />
  </div>
</template>

<script>
import { SpotifyAuthenticator, SpotifyAPIHandler } from '@/api/spotify';
import { SpotifyPlayer } from '@/components';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'

export default {
  name: "SpotifyPage",
  components: {
    SpotifyPlayer
  },
  setup() {
    const store = useStore();
    const backgroundColor = ref([0, 0, 0]);

    let spotifyAuthenticator = computed({
      get: () => store.state.spotifyAuthenticator,
      set: (value) => store.commit('setState', {
        key: 'spotifyAuthenticator',
        value: value
      }),
    });

    let spotifyAPIHandler = computed({
      get: () => store.state.spotifyAPIHandler,
      set: (value) => store.commit('setState', {
        key: 'spotifyAPIHandler',
        value: value
      }),
    });

    if (!spotifyAuthenticator.value) {
      spotifyAuthenticator.value = new SpotifyAuthenticator();
    }

    const onSpotifyLoginClick = (callback) => {
      spotifyAuthenticator.value.openSpotifyAuthorization();
    }
    
    // Successfully logged in
    const onAuthCodeProvided = async (event) => {
      const { code } = event.data;
      if (event.origin !== window.location.origin || !code)
        return;


      const data = await spotifyAuthenticator.value.requestSpotifyToken(code);
      const accessToken = data['access_token'];
      const refreshToken = data['refresh_token'];
      const expiresIn = data['expires_in'];

      spotifyAPIHandler.value = new SpotifyAPIHandler(accessToken);
    };

    const onBgColorChanged = (event) => {
      backgroundColor.value = event.rgb;
    }

    const spotifyCssVars = computed(() => {
      return {
        '--bg-color': `rgb(${backgroundColor.value[0]}, ${backgroundColor.value[1]}, ${backgroundColor.value[2]}`,
      };
    });

    window.addEventListener("message", onAuthCodeProvided, false);

    return {
      onSpotifyLoginClick,
      spotifyAuthenticator,
      spotifyAPIHandler,
      onBgColorChanged,
      spotifyCssVars,
      backgroundColor
    };
  }
}
</script>

<style scoped>
.spotify-page {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
}
</style>