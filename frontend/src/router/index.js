import { createRouter, createWebHistory } from 'vue-router' // à vérifier avec Denis
//import HomeView from '../views/HomeView.vue' // à vérifier avec Denis plutôt AccueilView.vue ?
import AccueilView from '../views/AccueilView.vue' // ou nom indispensable Home ? Dans ce cas renommer.  

const routes = [
  { // le menu initial
    path: '/',
    name: 'Accueil',
    component: AccueilView
  },
  { // création d'un utilisateur 
    path: '/inscription',
    name: 'Signup',
    component: () => import('../views/SignupView.vue')
  },
  { // la connexion d'un utilisateur existant
    path: '/connexion',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  { // le profil utilisateur 
    path: '/profil',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  },
  { // tous les articles
    path: '/articles',
    name: 'AllPosts',
    component: () => import('../views/PostView.vue')
  },
  /*{ // en cours... ajout d'un nouvel article et commentaire
    path: '/ajoutpost',
    name: 'AddPost',
    component: () => import('../views/AddNewPost.vue')
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // à vérifier avec Denis 
  routes
})

export default router
