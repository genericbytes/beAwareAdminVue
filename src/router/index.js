import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Layout/Account/login.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Layout/Admin'),
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/Users')
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('../views/News')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('../views/Category')
      },
      {
        path: '/requestCategory',
        name: 'requestCategory',
        component: () => import('../views/RequestedCategory')
      },
      {
        path: '/reportedNews',
        name: 'reportedNews',
        component: () => import('../views/ReportedNews')
      },
      {
        path: '/blockeduser',
        name: 'blockeduser',
        component: () => import('../views/Users/BlockedUsers.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
