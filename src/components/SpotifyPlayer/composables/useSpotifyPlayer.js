
import { computed, ref } from 'vue'

export default function useSpotifyPlayer(store, isPlaying, lastPlayPauseClickTime) {
  const spotifyAPIHandler = computed(() => store.state.spotifyAPIHandler);

  const playPauseSpotify = () => {
    spotifyAPIHandler.value.playPauseSpotify(isPlaying.value);
    isPlaying.value = !isPlaying.value;
    lastPlayPauseClickTime.value = performance.now();
  };

  const playNext = () => {
    spotifyAPIHandler.value.playNext();
  }

  const playPrevious = () => {
    spotifyAPIHandler.value.playPrevious();
  }

  return {
    spotifyAPIHandler,
    playPauseSpotify,
    playNext,
    playPrevious
  }
}