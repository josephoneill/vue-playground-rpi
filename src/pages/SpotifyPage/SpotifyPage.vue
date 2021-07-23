<template>
  <div class="spotify-page" :style="spotifyCssVars">
    <button v-if="!spotifyAPIHandler" @click="onSpotifyLoginClick">Login</button>
    <SpotifyPlayer v-if="spotifyAPIHandler" :spotifyAPIHandler="spotifyAPIHandler" @onBgColorChanged="onBgColorChanged" />
  </div>
</template>

<script>
import { SpotifyPlayer } from '@/components';
import { useSpotifyPageAuth, useSpotifyPageUI } from './composables'
import { useStore } from 'vuex'

export default {
  name: "SpotifyPage",
  components: {
    SpotifyPlayer
  },
  setup() {
    const store = useStore();

    const { getAccessCode, spotifyAuthenticator, spotifyAPIHandler, onAuthCodeProvided } = useSpotifyPageAuth(store);
    const { backgroundColor, onSpotifyLoginClick, onBgColorChanged, spotifyCssVars } = useSpotifyPageUI(spotifyAuthenticator);

    window.addEventListener("message", onAuthCodeProvided, false);

    return {
      getAccessCode,
      spotifyAuthenticator,
      spotifyAPIHandler,
      onAuthCodeProvided,
      backgroundColor,
      onSpotifyLoginClick,
      onBgColorChanged,
      spotifyCssVars
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