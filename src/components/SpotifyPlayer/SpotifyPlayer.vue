<template>
  <div class="spotify-player" :style="spotifyPlayerCssVars" ref="spotifyPlayer">
    <div class="spotify-player-art__container">
      <img class="img-album-art" ref="imgAlbumArt" :src="albumImageSrc" @load="onAlbumArtLoaded" />
    </div>
    <div class="spotify-player--details">
      <p id="spotify-player__song-title">{{ songTitle }}</p>
      <p id="spotify-player__artist-title">{{ artistTitle }}</p>
      <div class="spotify-player__controls">
        <Slider v-model="songProgress" :dark="useDarkColors" :min="0" :max="songLength" />
        <div class="spotify-player__controls__buttons">
          <img class="spotify-player__button" :src="previousButton" @click="playPrevious()" />
          <img class="spotify-player__button" id="spotify-player__button--playpause" :src="playPauseButton" @click="playPauseSpotify()">
          <img class="spotify-player__button" :src="nextButton" @click="playNext()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slider } from '@/components';
import { useSpotifySongData, useSpotifyPlayer, useSpotifyStyling } from './composables'
import { defineComponent, onMounted, toRefs, computed, ref } from 'vue';
import { bindGestureHandler } from '@/utils/gestureHandler';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SpotifyPlayer',
  components: {
    Slider
  },
  emits: {
    onBgColorChanged: ({ rgb }) => {
      if (rgb) {
        return true;
      } else {
        return false;
      }
    }
  },
  setup(props) {
    const store = useStore();
    let isPlaying = ref(false);
    const lastPlayPauseClickTime = ref(performance.now());
    const spotifyPlayer = ref(null);

    const { spotifyAPIHandler, playPauseSpotify, playNext, playPrevious } = useSpotifyPlayer(store, isPlaying, lastPlayPauseClickTime);
    const { imgAlbumArt, onAlbumArtLoaded, titleTextColor, sliderColor, useDarkColors, spotifyPlayerCssVars } = useSpotifyStyling(isPlaying);
    const useSpotifySongDataObject = useSpotifySongData(spotifyAPIHandler, isPlaying, lastPlayPauseClickTime, useDarkColors);
    const { songTitle, artistTitle, albumImageSrc, songLength, songProgress, playPauseText, getCurrentPlayingData, playPauseButton, nextButton, previousButton } = useSpotifySongDataObject;

    onMounted(() => { 
      bindGestureHandler(spotifyPlayer.value, (gestureDirection) => {
        switch (gestureDirection) {
          case 'left':
            playNext();
            break;
          case 'right':
            playPrevious();
            break;
        }
      }); 
    });

    return {
      spotifyPlayer,
      spotifyAPIHandler,
      isPlaying,
      lastPlayPauseClickTime,
      songTitle,
      artistTitle,
      albumImageSrc,
      songLength,
      songProgress,
      playPauseSpotify,
      playPauseText,
      getCurrentPlayingData,
      playPauseButton,
      playNext,
      playPrevious,
      imgAlbumArt,
      onAlbumArtLoaded,
      titleTextColor,
      sliderColor,
      useDarkColors,
      playPauseButton,
      nextButton,
      previousButton,
      spotifyPlayerCssVars,
    }
  }
});
</script>

<style scoped>
.spotify-player {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.spotify-player-art__container {
  height: 90%;
  display: block;
  margin: auto 0 auto 32px;
}
.img-album-art {
  height: 100%;
}
.spotify-player--details {
  display: flex;
  flex-direction: column;
  margin: auto 32px auto 32px;
  width: 100%;
}
#spotify-player__song-title {
  color: var(--player-text-color);
  font-size: 24px;
  font-weight: 700;
}
.spotify-player__controls {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}
.spotify-player__controls__buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
}
.spotify-player__button {
  height: 36px;
  margin: auto 0;
  padding: 0 16px;
}
#spotify-player__button--playpause {
  height: 96px;
}
p {
  font-family: 'Noto Sans JP';
  color: var(--player-text-color);
  margin: 0px 0px 8px 0px;
}
</style>