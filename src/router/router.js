import { createWebHistory, createRouter } from 'vue-router';
import Clock from '@/pages/Clock.vue';

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/clock',
      component: Clock,
    }
  ]
});

export default router;