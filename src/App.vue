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

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-al-c {
  align-items: center;
}

.mt-4 {
  margin-top: 4px;
}

.mt-8 {
  margin-top: 8px;
}

.mb-4 {
  margin-bottom: 4px;
}

.mb-8 {
  margin-bottom: 8px;
}

.ml-4 {
  margin-left: 4px;
}

.ml-8 {
  margin-left: 8px;
}

.mr-4 {
  margin-right: 4px;
}

.mr-8 {
  margin-right: 8px;
}
</style>
