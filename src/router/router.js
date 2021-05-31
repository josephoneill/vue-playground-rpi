import { createWebHistory, createRouter } from 'vue-router';
import { ClockPage, SpotifyPage, SpotifyAuthCallback } from '@/pages';

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/clock',
      component: ClockPage,
    },
    {
      path: '/spotify',
      component: SpotifyPage
    },
    {
      path: '/spotifyauthcallback',
      component: SpotifyAuthCallback
    }
  ]
});

export default router;