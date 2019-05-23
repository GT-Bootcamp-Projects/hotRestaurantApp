import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Callback from './components/Callback.vue';
import Profile from './views/Profile.vue';
import auth from './auth/authService';
import Reservations from './views/Reservations.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservations
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/callback" || auth.isAuthenticated()) {
    return next();
  }

  auth.login({ target: to.path });
});

export default router;
