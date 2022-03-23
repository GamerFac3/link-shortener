import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RedirectView from "../views/RedirectView.vue";
import FaqView from "../views/FaqView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
          path: '/login',
          name: 'login',
          props: {
              title: "Login"
          },
            component: () => import('../views/LoginView.vue')
        },
        {
         path: '/auth/login/github/callback',
         name: 'github-callback',
         props: {
             title: "Login"
         },
         component: () => import('../views/LoginView.vue')
        },
        {
         path: '/auth/login/gogle/callback',
         name: 'google-callback',
         props: {
             title: "Login"
         },
         component: () => import('../views/LoginView.vue')
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          props: {
              title: "Sign Up"
          },
            component: () => import('../views/SignUpView.vue')
        },
        {
            path: '/',
            name: 'home',
            props: {
                title: 'Home',
            },
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/faq',
            name: 'faq',
            props: {
                title: 'FAQ',
            },
            component: () => import('../views/FaqView.vue')
        },
        {
          path: '/my-links',
          name: 'my-links',
          props: {
              title: 'My Links',
          },
          component: () => import('../views/MyLinksView.vue')
        },
        {path: '/:redirect(.*)*', name: 'NotFound', component: RedirectView},
    ]
})

export default router
