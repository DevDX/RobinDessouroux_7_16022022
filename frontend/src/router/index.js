import { createRouter, createWebHistory } from 'vue-router' // à vérifier avec Denis
//import HomeView from '../views/HomeView.vue' // à vérifier avec Denis plutôt AccueilView.vue ?
import HomeView from '../views/AccueilView.vue' // ou nom indispensable Home ? Dans ce cas renommer.  

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/articles',
    name: 'AllPosts',
    component: () => import('../views/PostView.vue')
  },
  {
    path: '/connexion',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  { // w en cours
    path: '/profil',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // à vérifier avec Denis 
  routes
})

export default router
