import { computed, ref } from 'vue';

export default function useSpotifyPlayer(store, isPlaying, lastPlayPauseClickTime) {
  const songSeekbarInMovement = ref(false);
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
  
  const onSongSliderInput = () => {
    songSeekbarInMovement.value = true;
  }

  /**
   * @function isPlaying
   * @desc Seeks to the requested position of the track
   * @param position the position of the track in seconds
   */
  const seekTo = async (position) => {
    await spotifyAPIHandler.value.seekTo(position * 1000);
    songSeekbarInMovement.value = false;
  }

  return {
    spotifyAPIHandler,
    playPauseSpotify,
    playNext,
    playPrevious,
    seekTo,
    onSongSliderInput,
    songSeekbarInMovement
  }
}