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
    path: '/connexion',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/articles',
    name: 'AllPosts',
    component: () => import('../views/PostView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // à vérifier avec Denis 
  routes
})

export default router
