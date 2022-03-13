<template>
  <div class="main-container">
    <nav>
      <ul>
        <li v-if="CurrentUser"><router-link  to="/">Accueil</router-link></li> 
        <li v-if="CurrentUser"><router-link to="/profil">Profile</router-link></li>
        <li v-if="CurrentUser && CurrentUser.userData.uIsadmin == true"><router-link to="/adminboard">AdminBoard</router-link></li>
        <li v-if="CurrentUser"><router-link  to="/ajoutpost">AddPost</router-link></li>
        <li v-if="CurrentUser"><router-link  to="/post">AllPosts</router-link></li>
        <li v-if="!CurrentUser"><router-link  to="/connexion">Login</router-link></li>
        <li v-if="!CurrentUser"><router-link to="/inscription">Signup</router-link></li>
        <li v-if="CurrentUser"><div id="logout" @click="logout" >Logout</div></li>
      </ul>
    </nav>
    <header> 
      <img id="logo-groupomania-black" src="./images/icon-left-font-monochrome-black.png" alt="logo groupomania black" sizes="(min-width: 20px) 100px, 5vw"/>
    </header> 
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
    CurrentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
  logout() {
    this.$store.dispatch("auth/logout");
    this.$router.push("/connexion"); // écran de login
    }
  },
  mounted() { // pour bloquer sur l'écran de connexion
    if (!this.CurrentUser) {
      this.$router.push("/connexion");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.main-container {
  padding-bottom: 4rem;
}
* {
  text-decoration: none;
  list-style-type: none;
  font-family: arial;
  color: #000000;
}

body,img,header,ul,li {
  margin: 0;
  padding: 0;
} 

header {
  display: flex;
  flex-direction:column;
  justify-content: center;
  background-color: #ffb233;
  align-items: center;
}

#logo-groupomania-black 
{
  max-width: 170px;
  height:170px;    
} 

h1 
{
    background-color: #ffb233;
    min-height: 5rem;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
}

ul{
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly; 
  text-decoration: none;
  list-style-type: none;
  font-weight: bold;
  color: #000000;
}

ul a.router-link-exact-active {
  color: #4341c7;
}

#logout{
border: 1px solid #000000;
border-radius: 5px;
background-color: #ffb233;  
padding: 1px 7px;
color: #000000;
font-weight: bold;
}

#logout:hover
{
  background-color: #000000;
  cursor: pointer;
  color: #ffffff; transition: all .3s ease-in-out;
}

/*@media screen and (max-width: 376px)*/
@media screen and (max-width: 535px)
{
  ul
  {
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    gap: 0.2rem;
  }
}
</style>
