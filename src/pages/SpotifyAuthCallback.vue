<template>
  <div class="spotify-auth-callback-page">
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "SpotifyPage",
  setup() {
    const route = useRoute();
    const { code } = route.query;
    window.opener.postMessage({ code }, window.location.origin);
    window.close();
  }
}
</script>

<style>
</style>