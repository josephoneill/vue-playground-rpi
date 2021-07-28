<template>
  <div class="spotify-player" :style="spotifyPlayerCssVars" ref="spotifyPlayer">
    <div class="spotify-player-art__container">
      <img class="img-album-art" ref="imgAlbumArt" :src="albumImageSrc" @load="onAlbumArtLoaded" />
    </div>
    <div class="spotify-player--details">
      <div class="spotify-player__song-info">
        <p id="spotify-player__song-title">{{ songTitle }}</p>
        <p id="spotify-player__artist-title">{{ artistTitle }}</p>
      </div>
      <div class="spotify-player__controls">
        <div class="flex-row flex-al-c spotify-player__controls__seekbar">
          <p class="mr-8">{{ formattedSongProgress }}</p>
          <Slider v-model="songProgress" :dark="useDarkColors" :min="0" :max="songLength" @onChange="seekTo" @input="onSongSliderInput" />
          <p class="ml-8">{{ formattedSongLength }}</p>
        </div>
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
import { defineComponent, onMounted, ref } from 'vue';
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
    // Define variables that need to be passed into the composables
    const store = useStore();
    const isPlaying = ref(false);
    const lastPlayPauseClickTime = ref(performance.now());
    const spotifyPlayer = ref(null);

    const { spotifyAPIHandler, playPauseSpotify, playNext, playPrevious, seekTo, onSongSliderInput, songSeekbarInMovement } = useSpotifyPlayer(store, isPlaying, lastPlayPauseClickTime);
    const { imgAlbumArt, onAlbumArtLoaded, titleTextColor, sliderColor, useDarkColors, spotifyPlayerCssVars } = useSpotifyStyling(isPlaying);
    const useSpotifySongDataObject = useSpotifySongData(spotifyAPIHandler, isPlaying, lastPlayPauseClickTime, songSeekbarInMovement, useDarkColors);
    const { songTitle, artistTitle, albumImageSrc, songLength, formattedSongLength, songProgress, formattedSongProgress, playPauseText, getCurrentPlayingData, playPauseButton, nextButton, previousButton } = useSpotifySongDataObject;

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
      formattedSongLength,
      songProgress,
      formattedSongProgress,
      playPauseSpotify,
      playPauseText,
      getCurrentPlayingData,
      playPauseButton,
      playNext,
      playPrevious,
      seekTo,
      onSongSliderInput,
      songSeekbarInMovement,
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
.spotify-player__controls__seekbar > div {
  flex-grow: 1;
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
.spotify-player__song-info > p {
  margin: 0px 0px 8px 0px;
}

p {
  font-family: 'Noto Sans JP';
  color: var(--player-text-color);
}

.spotify-player__button {
  filter: brightness(var(--player-button-brightness));
  -webkit-filter: brightness(var(--player-button-brightness));
  transition: filter ease-in-out 0.1s;
  transition: transform ease-in-out 0.1s;
}

.spotify-player__button:hover {
  filter: brightness(var(--player-button-brightness--hover));;
  -webkit-filter: brightness(var(--player-button-brightness--hover));
}

.spotify-player__button:active {
  transform: scale(0.9);
}
</style>