import { ref, onMounted, computed } from 'vue'

import playButtonLight from '@/assets/spotify_player/play_circle_light.png';
import playButtonDark from '@/assets/spotify_player/play_circle_dark.png';

import pauseButtonLight from '@/assets/spotify_player/pause_circle_light.png';
import pauseButtonDark from '@/assets/spotify_player/pause_circle_dark.png';

import nextButtonLight from '@/assets/spotify_player/next_light.png';
import nextButtonDark from '@/assets/spotify_player/next_dark.png';

import previousButtonLight from '@/assets/spotify_player/prev_light.png';
import previousButtonDark from '@/assets/spotify_player/prev_dark.png';

export default function useSpotifySongData(spotifyAPIHandler, isPlaying, lastPlayPauseClickTime, useDarkColors) {
  const songTitle = ref('');
  const artistTitle = ref('');
  const albumImageSrc = ref('');
  const playPauseText = computed(() => isPlaying.value ? 'Pause' : 'Play');
  const songLength = ref(0);
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
        songProgress.value = Math.round((data.progress_ms / 1000) * 10) / 10;

        if (performance.now() - lastPlayPauseClickTime.value > 1000) {
          isPlaying.value = data['is_playing'];
          lastPlayPauseClickTime.value = performance.now();
        }
      }
    }, 1000);
  };

  const previousButton = computed(() => {
    return useDarkColors.value ? previousButtonDark : previousButtonLight;
  });

  const playPauseButton = computed(() => {
    if (isPlaying.value) {
      return useDarkColors.value ? pauseButtonDark : pauseButtonLight;
    } else {
      return useDarkColors.value ? playButtonDark : playButtonLight;
    }
  });

  const nextButton = computed(() => {
    return useDarkColors.value ? nextButtonDark : nextButtonLight;
  });

  onMounted(getCurrentPlayingData);

  return {
    songTitle,
    artistTitle,
    albumImageSrc,
    songLength,
    songProgress,
    isPlaying,
    getCurrentPlayingData,
    playPauseText,
    playPauseButton,
    previousButton,
    nextButton
  }
}