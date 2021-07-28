import { ref, onMounted, computed } from 'vue'
import { msToFormattedTime } from '@/utils/timeUtils';

import playButtonImg from '@/assets/spotify_player/play_circle_light.png';
import pauseButtonImg from '@/assets/spotify_player/pause_circle_light.png';
import nextButtonImg from '@/assets/spotify_player/next_light.png';
import previousButtonImg from '@/assets/spotify_player/prev_light.png';

export default function useSpotifySongData(spotifyAPIHandler, isPlaying, lastPlayPauseClickTime, songSeekbarInMovement, useDarkColors) {
  const songTitle = ref('');
  const artistTitle = ref('');
  const albumImageSrc = ref('');
  const playPauseText = computed(() => isPlaying.value ? 'Pause' : 'Play');
  const songLength = ref(0);
  const formattedSongLength = ref('');
  const songProgress = ref(0);

  const getCurrentPlayingData = () => {
    setInterval(async () => {
      if (!spotifyAPIHandler) return;
      const data = await spotifyAPIHandler.value.getCurrentPlaybackInfo();
      if (data !== undefined && data !== null) {
        songTitle.value = data.item.name;
        artistTitle.value = data.item.artists[0].name;
        albumImageSrc.value = data.item.album.images[0].url;
        songLength.value = Math.round((data.item.duration_ms / 1000) * 10) / 10;

        // Don't update the song progress if the seekbar is currently being dragged
        if (!songSeekbarInMovement.value) {
          songProgress.value = Math.round((data.progress_ms / 1000) * 10) / 10;
        }
        
        formattedSongLength.value = msToFormattedTime(data.item.duration_ms);

        if (performance.now() - lastPlayPauseClickTime.value > 1000) {
          isPlaying.value = data['is_playing'];
          lastPlayPauseClickTime.value = performance.now();
        }
      }
    }, 1000);
  };

  const formattedSongProgress = computed(() => {
    return msToFormattedTime(songProgress.value * 1000);
  });

  const previousButton = computed(() => {
    return previousButtonImg;
  });

  const playPauseButton = computed(() => {
    return isPlaying.value ? pauseButtonImg: playButtonImg;
  });

  const nextButton = computed(() => {
    return nextButtonImg;
  });

  onMounted(getCurrentPlayingData);

  return {
    songTitle,
    artistTitle,
    albumImageSrc,
    songLength,
    formattedSongLength,
    songProgress,
    formattedSongProgress,
    isPlaying,
    playPauseText,
    playPauseButton,
    previousButton,
    nextButton,
    getCurrentPlayingData
  }
}