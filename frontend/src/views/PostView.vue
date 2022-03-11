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
            </header>

            <h1>Tous les articles</h1>

            <!-- Page fil d'actualité : on charge une liste d'articles vertical avec
            Nom et Prénom de l'auteur, date de publication, Titre & premiers mots du contenu. -->

            <!-- Liste des articles, relié grâce à une boucle for
            Afficher l'objet post dans le tableau posts -->
            <div id="list-container">

              <div id="post-container" v-for="post in posts" :key="post">
                  <div id="post-detail">
                    <h2>{{ post.postTitle }}</h2>

                    <div id="post-content">{{ post.postContent }}</div>
                    
                    <div id="published"> Publié le {{ post.createdAt.split("T")[0] + " " + post.createdAt.split("T")[1].split(".")[0] }} par {{ post.postOwner }}</div> 
                  
                    <button class="button-delete" v-if="CurrentUser.userData.id == post.userId || CurrentUser.userData.uIsadmin == true " @click="deletePost(post.id)">supprimer</button>
                    <button  @click="this.activecomment=1, this.currentcomment=post.id">commenter</button>
                    <textarea class="content" v-model="this.commentcontent" @keyup.enter="createcomment(post.id)" v-if="this.activecomment == 1 && this.currentcomment == post.id"></textarea> <!-- trigger sur enter -->
                  </div>  
                  
                  <div id="message" v-for="message in post.messages" :key="message">
                    <p> {{message.messageContent}} </p>
                    <div id="msg-published"> Publié le {{ message.createdAt.split("T")[0] + " " + message.createdAt.split("T")[1].split(".")[0] }} par {{ message.messageOwner }}</div>  
                    <button class="button-delete" v-if="CurrentUser.userData.uName == message.messageOwner || CurrentUser.userData.uIsadmin == true " @click="deleteComment(message.id)">supprimer</button>
                  </div>
                  
              </div>

            </div>
        </div>
    </body> 
</html>   
</template>

<script>
import MessageRoutes from "../services/auth-message";
import PostRoutes from "../services/auth-post";

export default 
{
  name: "AllPosts",
  data() 
  {
    return {  posts: [], activecomment: 0, commentcontent: "" , currentcomment: 0}; //La liste d'articles est dans un tableau contenant plusieurs objets post        
  },
  computed: {
    CurrentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: 
  {
    deleteComment(id){
      MessageRoutes.delete(id)
      .then(() => {
        this.retrievePosts()
      })
      .catch((error) => {
        console.log(error);
      })
    },
    createcomment(id) {
      let data = {
      messageContent: this.commentcontent,
      messageOwner: this.CurrentUser.userData.uName,
      postId: id,
      }
      console.log(data);
      MessageRoutes.create(data)
      .then(() => {
        this.retrievePosts();
        this.activecomment=0;
        this.commentcontent="";
      })
      .catch((error) => {
        console.log(error);
      })
    } ,
    deletePost(id)
   {
     PostRoutes.delete(id)
     .then(() => {
       this.retrievePosts();
     })
     .catch((error) =>
     {
       console.log(error);
     })
   }, 
    // Récupération des données des posts 
    retrievePosts() 
    {
      // Appel de PostRoutes (axios) pour autoriser la récupération des données
      // avec la méthode getAll (get)
      PostRoutes.getAll()
        .then((res) => 
        {          
         // this.posts = res.data;  //this.posts = retrieve des datas et retourne le résultat avec les articles
         console.log("ligne 83 postview "+res); // test 10/03/2022
         this.posts = res.data;  
         console.log(this.posts);
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
body,img,header,ul,li
{
  margin: 0;
  padding: 0;
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
h2 
{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;  
  text-align: center; 
  margin: 10px auto;
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: center;
  align-self: center;
  /*margin: 10px auto;*/ margin: auto;
  padding: 1px; 
  max-width: 348px;
  
}
/*p:hover
{
color: #ffffff; transition: all .3s ease-in-out;
}*/
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
  margin-right: auto;
  margin-left: auto;
}
#post-container 
{
  border-radius: 15px;
  /*background-color: rgb(195, 233, 223);*/
  /*background-color: #ffb233;*/  
  margin: 20px auto;
  padding: 20px;
  /*width: 300px;*/
  min-width:280px;
  overflow: hidden; 
  /* début test rdx 11/03/2022 */
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  /*border: 1px solid #000000;*/  
  box-shadow: 0 0 6px #000000; 
  /* fin test rdx 11/03/2022 */
}
#post-detail
{
  border: 1px solid #000000;
  border-radius: 10px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  max-width: 348px;
  min-width: 280px;
}
#post-content 
{
  text-overflow: ellipsis; 
  overflow: hidden;
  margin: 0 auto 20px auto;
  /*white-space: nowrap;*/

  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  max-width: 348px;
  min-width: 280px;


}
#message
{
  border-radius: 15px;
  border: 1px solid #000000;
  background-color: #ffb233;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding: 4px;
  font-size: 18px;
  margin: 2px auto 2px auto;
  max-width: 348px;
  min-width: 280px;
}
.content
{
    font-size: 16px;
    margin-right: auto;
    margin-left:auto;
    resize : both;
    min-width : 280px;
    min-height : 75px;
    max-width : 375px;
    max-height : 400px;
}
#msg-published
{
  margin-top: 10px;
}
#link-to-article 
{
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 10px;
  color: #000000;
  box-shadow: 0 0 4px black;
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
  margin: 2px auto 10px auto;
  padding: 1px;
}
button
{
  color:#000000;font-weight: bold;
  background-color: #ffb233;  
  height:35px; width: 125px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;  
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;  
  border: 1px solid #000000;
  font-size: 18px; 
  box-shadow: 0 0 4px black;
  /*margin-top:15px;*/ margin: 5px auto 10px auto;
}
button:hover
{
    background-color: #000000;
    color: #ffffff; 
    transition: all .3s ease-in-out;
}
.button-delete:hover
{
  background-color: #5e035b;  
  color: #ffffff; 
  transition: all .3s ease-in-out;  
}
</style>