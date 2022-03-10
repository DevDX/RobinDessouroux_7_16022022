<template>
<!--DOCTYPE html-->
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Groupomania réseau social interne</title> 
        <link rel="shortcut icon" href="../images/icon.svg"/>
    </head>

    <body>
        <div class="all-posts">
            <header> 
                <img id="logo-groupomania-black" src="../images/icon-left-font-monochrome-black.png" alt="logo groupomania black" sizes="(min-width: 20px) 100px, 5vw"/>
                <!--h1>Bienvenue sur le réseau social d'entreprise de Groupomania.</h1>
                <h2>Rejoignez notre Communauté.</h2-->

            <div class="FlexElt"> 
                <nav>
                    <ul>
                      <!--li>
                          <router-link class="link" to="/mon_profil"><p>Mon profil</p></router-link>
                      </li>
                      <li>
                          <router-link to="/" @click="logout" class="link"><p>Deconnexion</p></router-link
                          >
                      </li-->
                      <li>
                          <router-link id="add-post" class="link" to="/ajoutpost"><p>Ajouter un article</p></router-link
                          >
                      </li>
                    </ul>
                </nav>
            </div>


            </header>

            <h1>Tous les articles</h1>

            <!-- Page fil d'actualité : on charge une liste d'articles vertical avec
            Nom et Prénom de l'auteur, date de publication, Titre & premiers mots du contenu. -->

            <!-- Liste des articles, relié grâce à une boucle for
            Afficher l'objet post dans le tableau posts -->
            <ul id="list-container">
              <li id="post" v-for="post in posts" :key="post">
                  <h2>{{ post.postTitle }}</h2>
                  <div id="post-content">{{ post.postContent }}</div>
                  <div id="published"> Publié le {{ post.createdAt }} par </div> <!-- à ajouter {{ user.uFirstname }} {{ user.uNname }}-->

                  <!-- Chemin qui redirige vers la page qui affiche l'article grâce à son id-->
                  <router-link id="link-to-article" :to="{ name: 'OnePost', params: { id: post.id } }"
                  >Lire l'article</router-link
                  >
              </li>
            </ul>
        </div>
    </body> 
</html>   
</template>

<script>
import PostRoutes from "../services/auth-post";

export default 
{
  name: "AllPosts",
  data() 
  {
    return {  posts: [] }; //La liste d'articles est dans un tableau contenant plusieurs objets post        
  },
  methods: 
  {
    // Récupération des données des posts 
    retrievePosts() 
    {
      // Appel de PostRoutes (axios) pour autoriser la récupération des données
      // avec la méthode getAll (get)
      PostRoutes.getAll()
        .then((res) => 
        {          
          this.posts = res.data;  //this.posts = retrieve des datas et retourne le résultat avec les articles
        })
        .catch((error) => 
        {
          console.log(error);
        });
    },
    logout() 
    {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion"); // à vérifier si acceptable, c'est retour vers la page de connexion
    },
  },
  // La fonction qui affiche les articles est montée dans le DOM
  mounted() 
  {
    this.retrievePosts();
  },
};
</script>

<style scoped >
* 
{
  text-decoration: none;list-style-type: none; font-family: arial;  color: #000000;
}
body,img
{
  margin: 0;
  padding: 0;
}  
ul
{
  padding:0;
}    
header 
{
  display: flex;
  /*flex-direction: row;*/ flex-direction:column;
  justify-content: center;
  background-color: #ffb233;
  align-items: center;
  flex-wrap: wrap;
  min-width:280px;
  margin-right:auto;
  margin-left: auto;
}
/*#header*/ #logo-groupomania-black 
{
  max-width: 170px;height:170px;    
  padding: 0;
  margin: 5px auto;
}  
h1 
{
  background-color: #ffb233;
  border-radius: 10px;
  padding: 20px; /* à vérifier rdx */
  /*margin: 10px 80px;*/
  margin: 10px auto;
  font-size: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;  
  text-align: center;
  /*border: 2px solid red;*/
} 
.FlexElt
{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*gap:20px;*/
  min-width: 125px;
  max-width: 275px;
  /*height: 50px;
  max-height: 50px;*/
  width:100%;
  /*border:solid green;*/
  /*margin-bottom: 15px;*/
  margin: 0 auto 10px auto;
  /*rdx couleur noire*/
  color:#000000;font-weight: bold;font-size: 18px; 
  /*background-color: #ffb233;*/background-color:#ffffff;
  justify-content: center;
  border: 1px solid #000000;
  border-radius: 10px;    
}   
.link 
{    
  /*margin-left: auto; /* à vérifier rdx */
  /*margin-left:0;*/
  /*margin-right:auto; /* à vérifier rdx */
  margin: 5px auto;
  padding: 5px;
  /*padding-right: 10px;*/
  font-size: 16px; /*font-size: 20px;*/ 
  font-weight: bold;
  color: #000000;
  border-radius: 10px;
  background-color: #ffb233;
  height: 30px; /*width:100%;*/width:175px;
  align-content: center;
  /*border: 1px solid;*/  
  border: 1px solid #000000;
  box-shadow: 0 0 4px black;
  display: flex;
  flex-direction: row;justify-content: center; align-content: center;
}
/*.link*/ p 
{
  text-align: center;
  align-self: center;
  /*margin: 10px auto;*/ margin: auto;
  padding: 5px; 
}
p:hover
{
color: #ffffff; transition: all .3s ease-in-out;
}
.link:hover
{
  background-color: #000000;
  /* color: #ffffff; */
  transition: all .3s ease-in-out;
}    
#list-container 
{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#post 
{
  border-radius: 15px;
  /*background-color: rgb(195, 233, 223);*/
  background-color: #ffb233;  
  margin: 20px;
  padding: 40px;
  width: 300px;
  overflow: hidden;
}
#post-content 
{
  text-overflow: ellipsis; 
  overflow: hidden;
  margin-bottom: 20px;
  white-space: nowrap;
}
#link-to-article 
{
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 10px;
  color: #000000;box-shadow: 0 0 4px black;
  font-weight: bold;    
}
#link-to-article:hover
{
  background-color: #000000;
  color: #ffffff;
  transition: all .3s ease-in-out;
}    
#published 
{ 
  margin: 20px;
}
</style>