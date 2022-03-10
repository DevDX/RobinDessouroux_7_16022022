<template>
  <div class="container">
    <nav>
      <router-link to="/">Accueil</router-link> 
      <router-link to="/profil">Profile</router-link>
      <!--router-link to="/articles">AllPosts</router-link-->
      <router-link to="/post">AllPosts</router-link>
      <router-link to="/connexion">Login</router-link>
      <router-link to="/inscription">Signup</router-link>
      <div id="logout" @click="logout">Logout</div>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
  logout() {
    localStorage.clear();
    this.$router.push("/connexion")
    }
  },
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

nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /*border: 1px solid red;*/
}

nav a {
  font-weight: bold;
  /*color: #2c3e50;*/color: #000000;
}

nav a.router-link-exact-active {
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

@media screen and (max-width: 376px)
{
  nav 
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
