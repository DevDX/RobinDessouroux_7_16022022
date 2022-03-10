<template>
<!--DOCTYPE html-->
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
                <h1>Bonjour {{ this.prenom }} </h1>

                <section id="signup-form">
                    <form id="form_1" v-on:click.prevent="deletion"> 
                        <fieldset class="FlexElt">
                            <legend>Mon Profil</legend> 
                            <legend>Informations personnelles</legend>
                                        
                            <div class="container">
                                <label for="userid">Table user - id : {{ this.id }} </label>
                                <!--select name="profil" id="profil"-->
                                <label for="profil" v-if="this.profil === true">Administrateur</label>  
                                <label for="profil" v-else>Utilisateur</label>
                                <!--option value="">--SVP, sélectionnez votre profil</option>
                                <option value="user">Utilisateur</option>
                                <option value="admin">Administrateur</option>  
                                </select-->
                            </div>
                            <br> 
                            
                            <label for="nom">Nom :</label> <input  type="text" name="nom" id="nom" v-model="nom" readonly  size = 30/>   
                            <br> 	
                            <label for="prenom">Prénom :</label> <input  type="text" name="prenom"  id="prenom" v-model="prenom" readonly size = 30/>   
                            <br> 					
                            <label for="email">Email :</label>
                            <input  type="email" name="email"  id="email" readonly v-model="email" size = 30/> 
                            <br> 	                            
                            <!-- j'ai supprimé la modification du password -->
                            <!--button id="validation "class="group-button" type="submit">Validation</button-->
                            <button id="deletion" class="group-button" type="submit" @click="deletion" >Suppression</button>
                        </fieldset>
                    </form>
                </section>

                <!--nav> 
                    <ul>
                    <li>
                        <router-link class="link" to="/accueil"><p>Accueil</p></router-link>
                    </li>
                    </ul>
                </nav-->
            </section>

        </div>
    </body>
</html>        
</template>

<script>
import userRoutes from "../services/auth-user";
let testAlert = 0;

export default 
{
    name: "ProfileView",
    //Récupération du data grâce au v-model 
    data() 
    {
        return {email: "", nom: "", prenom: "", profil: "", id: ""};
    },
    // récupération des données depuis le ls
    mounted: function() {
    let  userData= JSON.parse(localStorage.getItem("groupomania-user")).userData 
    /*console.log(userData);*/
    this.email=userData.uEmail,
    this.nom=userData.uName,
    this.prenom=userData.uFirstname,
    this.id=userData.id,
    this.profil=userData.uIsadmin,
    this.password=userData.uPassword,
    this.token=JSON.parse(localStorage.getItem("groupomania-user")).token
    }, 
    methods: 
    { 

        /* Suppression de l'utilisateur */
        deletion(id) 
        {
        let storageUser = JSON.parse(localStorage.getItem("groupomania-user")).userData; //let wToken=JSON.parse(localStorage.getItem("groupomania-user")).token
        id = storageUser.id; //console.log("ligne 99 "+storageUser.id);    console.log("wToken "+wToken);
        
            userRoutes.delete(id)
            .then(() => 
            {
                localStorage.clear(); 
                if (testAlert === 0) 
                {
                   alert("user " +id+ " supprimé"); 
                   testAlert ++;
                }
                // console.log("Compte supprimé !")
                this.$router.push("/connexion");
                
            })
            .catch((error) => 
            {
                console.log(error); alert("Votre compte n'a pas été supprimé! " +storageUser.id); //console.log("Votre compte n'a pas été supprimé! " +storageUser.id); console.log("mdp " +storageUser.uPassword); console.log("token "+storageUser.token);
            });        
        
        },
        

    },
};
</script>


<style scoped >
*
{
    font-family: arial;  color: #000000;
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
    min-width:280px;
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
    /*margin-bottom: 15px;*/
    margin: 15px auto;
    /*rdx couleur noire*/
    color:#000000;font-weight: bold;font-size: 18px; 
    /*background-color: #ffb233;*/background-color: #ffffff;
    justify-content: center; align-items: center;
    
}
input
    {
        margin-left: auto;
        margin-right: auto;
        color: #000000;
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