<template>
<!--DOCTYPE html-->
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Groupomania réseau social interne</title> 
        <link rel="shortcut icon" href="../images/icon.svg"/>
    </head>
    <body>
        <div class="login">

            <header> 
                <img id="logo-groupomania-black" src="../images/icon-left-font-monochrome-black.png" alt="logo groupomania black" sizes="(min-width: 20px) 100px, 5vw"/>
            </header>

            <section id="choice">
                <h1>Connexion au réseau social d'entreprise de Groupomania</h1>

                <section id="login-form">
                    <form v-on:click.prevent="login" id="form"> <!-- à vérifier rdx prevent empéche l'événement submit de recharger la page https://www.pierrefay.fr/formation-vuejs/les-evenements.html -->
                        <fieldset class="FlexElt">
                            <legend>Connexion</legend> 

                            <label for="email">Email :</label>
                            <input class="FlexElt" type="email" name="email" required placeholder="Saisissez votre email" id="email" v-model="email"/> 
                            <br><!--br><br-->		
                            <label for="password">Mot de passe :</label>
                            <input class="FlexElt" type="password" name="password" required placeholder="Saisissez votre mot de passe" id="password" v-model="password"/> 
                            <br><br><br>		

                            <button class="group-button" type="submit">Connexion</button>
                        </fieldset>
                    </form>
                </section>

                <!--nav> 
                    <ul>
                    <li-->
                        <!--router-link class="link" to="/accueil"><p>Accueil</p></router-link--> 
                        <!--router-link class="link" to="/"><p>Accueil</p></router-link>  
                    </li>
                    </ul>
                </nav-->
            </section>

        </div>
    </body>
</html>        
</template>

<script>
import axios from "axios";

export default 
{
    name: "LoginView",
    data() 
    {
        return {email: "",password: ""};  // selon v-model
    },
    // utilisation d'axios pour envoi des données 
    methods: 
    {
        login() 
        {
            axios.post("http://localhost:3000/api/auth/login", { uEmail: this.email, uPassword: this.password })  // semblable à Postman 
                   
            .then((res) => 
            {
                localStorage.setItem("groupomania-user", JSON.stringify(res.data)); // création et enregistrement des données dans localStorage 
                //this.$router.push("post");  // affichage des articles contenus dans la table post
                this.$router.push("/profil");  // affichage des articles contenus dans la table post
            })
            .catch((error) => 
            {   //this.errorMessage = error.message;
                //console.error("There was an error!", this.errorMessage);
                console.log(error);
            });
        },
    },
};
</script>

<style scoped>
*
{
    text-decoration: none; list-style-type: none; font-family: arial;  color: #000000;
}
body
{
    margin: 0;
    padding: 0;
}    
header 
{
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #ffb233;
    align-items: center;
    flex-wrap: wrap;
    min-width:320px;
    margin-right:auto;
    margin-left: auto;
}
/*#header*/ #logo-groupomania-black 
{
    max-width: 170px;height:170px;    
    padding: 0;
    margin: 10px auto;
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
#choice nav ul li
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*margin-bottom: 5px;*/    
} 
ul
{
    padding:0;
}
.link 
{    
    /*margin-left: auto; /* à vérifier rdx */
    /*margin-left:0;*/
    /*margin-right:auto; /* à vérifier rdx */
    margin: 10px auto;
    padding-left: 0;
    /*padding-right: 10px;*/
    font-size: 22px; /*font-size: 20px;*/ 
    font-weight: bold;
    color: #000000;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;  
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;  
    background-color: #ffb233;
    height: 50px; /*width:100%;*/width:150px;
    align-content: center;
    /*border: 1px solid;*/  
    border: 1px solid #000000;
    box-shadow: 0 0 4px black;
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
    margin: 15px auto;
    /*rdx couleur noire*/
    color:#000000;font-weight: bold;font-size: 18px; 
    /*background-color: #ffb233;*/background-color: #ffffff;
    justify-content: center;
}
.group-button
{
    color:#000000;font-weight: bold;
    background-color: #ffb233;  
    height:55px; width: 150px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;  
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;  
    border: 1px solid #000000;
    font-size: 20px; 
    box-shadow: 0 0 4px black;
}
.group-button:hover
{
    background-color: #000000;
    color: #ffffff; 
    transition: all .3s ease-in-out;
}
legend
{
    background-color: #ffb233;
    color: #000000;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;  
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;      
}
</style>