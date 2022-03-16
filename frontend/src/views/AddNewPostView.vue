<template>
  <body>
    <section>
      <h1>Nouvelle Publication</h1>
      <article id="post-container">
        <div id="post">
            <h2><label for="title">Titre de votre publication</label></h2>
            
            <textarea name="title" type="text" required = "true" maxlength="20" v-model="post.title" id="title"></textarea>            

            <h3><label for="content">Saisissez le contenu de votre article</label></h3>
            
            <textarea required = "true" type="text" id="content" v-model="post.content"  name="content">
            </textarea>
            
            <button id="publish-post" @click="publishPost">Publier</button>
        </div>
      </article>
    </section>
  </body> 
</template>

<script>      

import PostRoutes from "../services/auth-post";

export default {
  name: "AddNewPostView",
  // un post contient un id, un titre et le contenu de l' article
  data() {
    return {
      post: {
        title: null,
        content: null    
      },
      submitted: false
    };
  },
  computed: {
    CurrentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    //Fonction qui permet la création d'un article  
    
    publishPost() {    

      //variable contentant un objet avec le titre, contenu et l'id de l'utilisateur
      //Utilisation de this. pour récup le data du post
      const data = {
        postTitle: this.post.title,
        postContent: this.post.content,
        userId: this.CurrentUser.userData.id,
        postOwner: this.CurrentUser.userData.uName 
      };
      console.log(data);
      PostRoutes.create(data)
        .then(() => {
          this.submitted = true;
          //this.$router.push("/articles");
          this.$router.push("/post");
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data.error.errors[0].message.split(".post")[1]);
       });
    },

    //Déconnexion en retirant du localStorage l'utilisateur 
    //Redirection vers la page de connexion
     logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("/connexion");
    },
  },
};
</script>

<style scoped>
h2
{
  background-color: #fd2d01;
  border-radius: 10px;
  padding: 20px;  
  margin: 0;
  width: 100%;
}       
h3
{
  background-color: #fd2d01;
  border-radius: 10px;
  padding: 20px; 
  margin: 0;
  width: 100%;
}
#post-container
{
  display: flex;
  flex-direction: column;
  align-items: center;
}        
#post 
{
  display: flex;
  flex-direction: column;
  align-items: center;  
  gap: 1rem;
  width: 60%;
  max-width: 20rem;
}
textarea
{
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  background-color: #ffd7d7;
  border: solid 1px #d1515a;
  box-shadow: 0 0px 10px #d1515a;
}
#publish-post
{
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: #fd2d01;
  box-shadow: 0 0 4px black;
  font-weight: bold;  
  font-size:18px;
  height:55px; 
  width: 150px; 
}
#publish-post:hover
{
  background-color: #000000;
  color: #ffffff;
  transition: all .3s ease-in-out;
}    

</style>