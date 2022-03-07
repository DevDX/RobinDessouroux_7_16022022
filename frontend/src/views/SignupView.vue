<template>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Groupomania réseau social interne</title> 
        <link rel="shortcut icon" href="../images/icon.svg"/>
    </head>
    <body>
        <div class="signup">

            <header> 
                <img id="logo-groupomania-black" src="../images/icon-left-font-monochrome-black.png" alt="logo groupomania black" sizes="(min-width: 20px) 100px, 5vw"/>
            </header>

            <section id="choice">
                <h1>Inscription au réseau social d'entreprise de Groupomania</h1>

                <section id="signup-form">
                    <form id="form_1"> 
                        <fieldset class="FlexElt">
                            <legend>Inscription</legend> 
                            <legend>Informations personnelles</legend>
                                        
                            <div class="container">
                                <label for="user-profil">Profil :</label>
                                <select name="user-profil" id="user-profil">
                                    <option value="">--SVP, sélectionnez votre profil</option>
                                    <option value="user">Utilisateur</option>
                                    <option value="admin">Administrateur</option>  
                                </select>
                            </div>
                            <br> 
                            
                            <label for="nom">Nom :</label> <input class="FlexElt" type="text" name="nom" required placeholder="Saisissez votre nom" id="nom" aria-label="Saisissez-votre nom"/>   
                            <br> 	
                            <label for="prenom">Prénom :</label> <input class="FlexElt" type="text" name="prenom" required placeholder="Saisissez votre prénom" id="prenom" aria-label="Saisissez-votre prénom"/>   
                            <br> 					
                            <label for="email">Email :</label>
                            <input class="FlexElt" type="email" name="email" required placeholder="Saisissez votre email" id="email" /> 
                            <br> 	
                            <label for="password">Mot de passe :</label>
                            <input class="FlexElt" type="password" name="password" required placeholder="Saisissez votre mot de passe" id="password" /> 
                            <br>                      
                            
                            
                            <button class="group-button" type="submit">Inscription</button>
                        </fieldset>
                    </form>
                </section>

                <nav> 
                    <ul>
                        <li>
                            <!--router-link class="link" to="/accueil"><p>Accueil</p></router-link-->
                            <router-link class="link" to="/"><p>Accueil</p></router-link>
                        </li>
                    </ul>
                </nav>
            </section>

        </div>
    </body>
</html>        
</template>

<script>
import axios from "axios";

export default 
{
    name: "SignupView",
    //Récupération du data grâce au v-model DEMANDER à Denis
    data() 
    {
        return {email: "",password: "", nom: "", prenom: ""};
    },
    // utilisation d'axios pour envoi des données 
    methods: 
    {
        signup() 
        {
            axios
            .post("http://localhost:3000/api/auth/signup", { uEmail: this.email, uPassword: this.password, uName: this.nom, uFirstname: this.prenom })   // semblable à Postman 
            // Création et enregistrement des données dans localStorage 
            // et affichage des articles de la table post
            .then((res) => 
            {
                localStorage.setItem("groupomania-user", JSON.stringify(res.data));
                this.$router.push("post");
            })
            .catch((error) => 
            {
                console.log(error);
            });
        },
    },
};
</script>


<style>
*
{
   text-decoration: none;list-style-type: none; font-family: arial;  
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
    /*min-width:320px;*/
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
    flex-direction: column;
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
    justify-content: center; align-items: center;
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
    margin-top:15px;
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
select
{
    font-size: 14px;
	border-radius: 20px;
	border: 1px solid #000000;
	text-align: center;
	text-align-last: center;        
}
.container
{
    display: flex;flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /*border: 1px solid #000000;*/
    margin: 15px auto;
}
</style>