<template>
<!--DOCTYPE html-->
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Groupomania réseau social interne</title> 
        <link rel="shortcut icon" href="../images/icon.svg"/>
    </head>

    <body>
        
            <header> 
                <img id="logo-groupomania-black" src="../images/icon-left-font-monochrome-black.png" alt="logo groupomania black" sizes="(min-width: 20px) 100px, 5vw"/>
                <!--h1>Bienvenue sur le réseau social d'entreprise de Groupomania.</h1>
                <h2>Rejoignez notre Communauté.</h2-->

            <!--div class="FlexElt"> 
                <nav>
                    <ul>
                        <li>
                            <router-link class="link" to="/"><p>Accueil</p></router-link>
                        </li>
                        <li>
                            <router-link to="/" @click="logout" class="link"><p>Deconnexion</p></router-link> 
                        </li>
                    </ul>
                </nav>
            </div-->

            </header>

            <section>
                <h1>Nouvelle Publication</h1>


                <!-- tous les posts par une boucle for -->
                <article id="post-container">
                  <div id="post">
                      <h2>Titre de votre publication</h2>
                      <br>
                      <textarea name="title" type="text" required v-model="postTitle" id="title"></textarea>
                      <br><br>

                      <h3>Saisissez le contenu de votre article</h3>
                      <br>
                      <textarea required = "true" type="text" id="content" v-model="postContent"  name="content">
                      </textarea>
                      <br><br><br>

                      <!-- bouton de publication -->
                      <button id="publish-post" @click="publishPost">Publier</button>
                  </div>
                </article>
            </section>
    </body> 
</html>   
</template>

<script>      

import PostRoutes from "../services/auth-post";

export default {
  name: "AddNewPostView",
  // un post contient un id, un titre et le contenu de l' article
  data() {
    return {
      post: {
        id: null,
        title: "",
        content: ""
      },
      submitted: false
    };
  },
  methods: {
    //Fonction qui permet la création d'un article tout en récupérant 
    //l'id de l'utilisateur issue du localStorage
    publishpost() {
      let  userData= JSON.parse(localStorage.getItem("groupomania-user")).userData 

      //variable contentant un objet avec le titre, contenu et l'id de l'utilisateur
      //Utilisation de this. pour récup le data du post
      const data = {
        title: this.postTitle,
        content: this.postContent,
        userId: userData.id // vérifier si utile ? peut être créé automatiquement ?
      };

      // PostRoutes (axios) 
      PostRoutes.create(data)
        .then(() => {
          this.submitted = true;
          //this.$router.push("/articles");
          this.$router.push("/post");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Déconnexion en retirant du localStorage l'utilisateur 
    //Redirection vers la page de connexion
     logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion");
    },
  },
};
</script>

<style>
* 
{
    text-decoration: none;list-style-type: none; font-family: arial;  
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
    /*flex-direction: row;*/ flex-direction:row;
    justify-content: center;
    background-color: #ffb233;
    align-items: center;
    flex-wrap: wrap;
    /*min-width:320px;*/
    margin-right:auto;
    margin-left: auto;
}
/*#header*/ #logo-groupomania-black 
{
    max-width: 170px;height:150px;    
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
    background-color: #ffb233;
    border-radius: 10px;
    padding: 20px; /* à vérifier rdx */
    /*margin: 15px 80px;*/
    margin: 10px auto;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;  
    text-align: center;
    font-size:25px;
    /*margin: 5px 350px;*/
    /*min-width: 190px; *//* à vérifier */
}       
    h3
{
    background-color: #ffb233;
    border-radius: 10px;
    padding: 20px; /* à vérifier rdx */
    /*margin: 15px 80px;*/
    margin: 10px auto;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;  
    text-align: center;
    font-size:22px;
    /*margin: 5px 350px;*/
    /*min-width: 190px; *//* à vérifier */
}        
.FlexElt
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /*gap:20px;*/
    /*min-width: 125px;*/
    max-width: 275px;
    /*height: 50px;
    max-height: 50px;*/
    width:100%;
    /*border:solid green;*/
    /*margin-bottom: 15px;*/
    margin: 5px auto 5px auto;
    /*rdx couleur noire*/
    color:#000000;font-weight: bold;font-size: 18px; 
    /*background-color: #ffb233;*/background-color:#ffffff;
    justify-content: center;
    border: 1px solid #000000;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;  
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;    
}   
.link 
{    
    /*margin-left: auto; /* à vérifier rdx */
    /*margin-left:0;*/
    /*margin-right:auto; /* à vérifier rdx */
    margin: 10px auto;
    padding-left: 0;
    /*padding-right: 10px;*/
    font-size: 18px; /*font-size: 20px;*/ 
    font-weight: bold;
    color: #000000;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;  
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;  
    background-color: #ffb233;
    height: 52px; /*width:100%;*/width:150px;
    align-content: center;
    /*border: 1px solid;*/  
    border: 1px solid #000000;
    box-shadow: 0 0 4px black;
    display: flex;
    flex-direction: row;
}
/*.link*/ p 
{
    text-align: center;
    align-self: center;
    /*margin: 10px auto;*/ margin: auto;
    padding: 11px; 
}
.link:hover
{
    background-color: #000000;
    color: #ffffff;
    transition: all .3s ease-in-out;
}    
#post-container 
{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#post 
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /*border-radius: 15px; 
    border: 1px solid #000000;*/
    background-color: #ffffff;
    margin: 20px auto;
    overflow: hidden;  
    font-weight:bold;font-size:18px;   
}
#title
{
    font-size: 18px;
    margin-right: auto;
    margin-left:auto;
    /*display:flex; flex-direction: column; flex-wrap: wrap; vérifier si utile */
    /*height: auto; width: 100%;*/
    /* test rdx 05/03/2022 min-width:200px;*/
    resize : both;
    min-width : 280px;
    min-height : 12px;
    max-width : 325px;
    max-height :150px;
}
#content
{
    font-size: 16px;
    margin-right: auto;
    margin-left:auto;
    resize : both;
    min-width : 320px;
    min-height : 75px;
    max-width : 348px;
    max-height : 725px;
}
#post-content 
{
  text-overflow: ellipsis; 
  overflow: hidden;
  margin-bottom: 20px;
  white-space: nowrap;
}
#publish-post
{
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 10px;
  background-color: #ffb233;
  color: #000000;box-shadow: 0 0 4px black;
  font-weight: bold;  
  font-size:18px;
  height:55px; width: 150px; 
  margin: 5px auto ;
}
#publish-post:hover
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