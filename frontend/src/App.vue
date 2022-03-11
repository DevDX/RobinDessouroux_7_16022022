<template>
  <div class="container">
    <nav>
      <ul>
        <li v-if="CurrentUser"><router-link  to="/">Accueil</router-link></li> 
        <li v-if="CurrentUser"><router-link to="/profil">Profile</router-link></li>
        <li v-if="CurrentUser"><router-link  to="/ajoutpost">AddPost</router-link></li>
        <li v-if="CurrentUser"><router-link  to="/post">AllPosts</router-link></li>
        <li v-if="!CurrentUser"><router-link  to="/connexion">Login</router-link></li>
        <li v-if="!CurrentUser"><router-link to="/inscription">Signup</router-link></li>
        <li v-if="CurrentUser"><div id="logout" @click="logout" >Logout</div></li>
      </ul>
    </nav>
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
  color: #2c3e50;
}

ul{
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly; 
  /*border: 1px solid red;*/
  text-decoration: none;
  list-style-type: none;
}
  

ul a {
  font-weight: bold;
  /*color: #2c3e50;*/color: #000000;
  text-decoration: none;
  list-style-type: none;
}

ul a li {
  font-weight: bold;
  /*color: #2c3e50;*/color: #000000;
  text-decoration: none;
  list-style-type: none;
}

ul a.router-link-exact-active {
  color: #4341c7;
}

#logout{
border: 1px solid #000000;
border-radius: 5px;
background-color: #ffb233;  
padding: 1px 7px; color: #000000;
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
  nav 
  {
    flex-direction: column;
    padding: 2px;
    margin: 0 auto;
  }
  ul
  {
    flex-direction: column;
    padding: 2px;
  }
  #logout
  {
    padding: 1px 2px;
    width: 100px;
    margin: 0 auto 2px auto;
  }
}
</style>
