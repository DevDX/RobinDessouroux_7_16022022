<template>
  <body>
        <div class="all-posts">
           <h1>Tous les articles</h1>

            <div id="list-container">

              <!--div id="post-container" v-for="post in posts" :key="post"-->
              <div id="post-container" v-for="post in posts.slice().reverse()" :key="post">
                  <div id="post-detail">
                    <h2>Titre: {{ post.postTitle }}</h2>

                    <div id="post-content">{{ post.postContent }}</div>
                    
                    <div id="published"> Publié le {{ post.createdAt.split("T")[0] + " " + post.createdAt.split("T")[1].split(".")[0] }} par {{ post.postOwner }}</div> 

                    <div class="post-button">
                      <button class="button-delete" v-if="CurrentUser.userData.id == post.userId || CurrentUser.userData.uIsadmin == true " @click="deletePost(post.id)">supprimer</button>
                      <button  @click="this.activecomment=1, this.currentcomment=post.id">commenter</button>
                    </div>
                    <div class="msg-editor" v-if="this.activecomment == 1 && this.currentcomment == post.id">
                      <textarea class="content" v-model="this.commentcontent" @keyup.enter="createcomment(post.id)" @keyup.esc="this.activecomment=0" ></textarea> <!-- trigger sur enter -->
                      <button @click="createcomment(post.id)">New</button>
                    </div>
                  </div>  
                  
                  <div class="msg-container">
                    <div id="message" v-for="message in post.messages" :key="message">
                      <p class="msg-content"> {{message.messageContent}} </p>
                      <div id="msg-published"> Publié le {{ message.createdAt.split("T")[0] + " " + message.createdAt.split("T")[1].split(".")[0] }} par {{ message.messageOwner }}</div>  
                      <button class="button-delete" v-if="CurrentUser.userData.uName == message.messageOwner || CurrentUser.userData.uIsadmin == true " @click="deleteComment(message.id)">supprimer</button>
                    </div>
                  </div>
                  
              </div>

            </div>
        </div>
  </body>  
</template>

<script>
import MessageRoutes from "../services/auth-message";
import PostRoutes from "../services/auth-post";

export default 
{
  name: "AllPosts",
  data() 
  {
    return {  posts: [], activecomment: 0, commentcontent: null , currentcomment: 0};       
  },
  computed: {
    CurrentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: 
  {
    deleteComment(id){ 
      if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
       MessageRoutes.delete(id)
      .then(() => {
        this.retrievePosts()
      })
      .catch((error) => {
        console.log(error);
      }) 
      } else {
        console.log("suppression annulée.");
      }
    },
    createcomment(id) {
      if (this.commentcontent == "\n"){
        this.commentcontent = null
      }
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
        if (error.response.data.errors){
          alert(error.response.data.errors[0].message)
        }
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
      this.$router.push("/connexion"); // à vérifier si acceptable, c'est retour vers la page de connexion
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

h2 
{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;  
  text-align: center; 
  margin: 10px auto;
}
#list-container 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
#post-container 
{
  width: 80%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 6px #000000; 
}
#post-detail
{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
}
#post-content 
{
  margin: 10px;
  border: solid 1px #fd2d01;
  border-radius: 5px;
  overflow-wrap: break-word;
  width: 90%;
  background-color: rgb(247, 245, 245);
  /*border: outset yellow;*/
  box-shadow: 0 0px 20px #fd2d01;
}
.post-button
{
  gap: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.msg-container
{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.msg-editor
{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 0.5rem;
}
#message
{
  border-radius: 15px;
  border: 1px solid #000000;
  border: inset rgb(109, 13, 17);
  /*background-color: rgba(233, 231, 231, 0.219);*/
  background-color: #ffd7d7;
  box-shadow: 0 0 9px rgb(145, 16, 23);
  padding: 4px;
  width: 90%;
  margin-bottom: 0.5rem; 
}
.content
{
  min-width : 280px;
  padding-bottom: 0.5rem;
}
#msg-published
{
  margin-top: 10px;
}
.msg-content
{
  overflow-wrap: break-word;
}
#published 
{ 
  margin: 2px auto 10px auto;
  padding: 1px;
}
button
{
  background-color: #fd2d01;  
  border-radius: 10px;
  border: 1px solid #000000;
  box-shadow: 0 0 4px black;
  margin: 5px auto 10px auto;
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