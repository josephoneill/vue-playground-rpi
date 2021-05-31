<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP');
@import url('https://fonts.googleapis.com/css2?family=Oxygen');

@media all and (display-mode: fullscreen) {
  html {
    cursor: none;
  }
}

html, body, #app, .app-container {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app-container {
  display: flex;
  justify-content: center;
  margin-top: auto;
}
</style>
