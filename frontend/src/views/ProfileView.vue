<template>
    <body>
        <div class="signup">
            <section id="choice">
                <h1>Bonjour {{ this.prenom }} </h1>

                <section id="signup-form">
                    <form id="form_1" v-on:submit.prevent="deletion"> 
                        <fieldset class="FlexElt">
                            <legend>Mon Profil</legend> 
                            <legend>Informations personnelles</legend>
                                        
                            <div class="container">
                                <label for="userid">Table user - id : {{ this.id }} </label>
                                <label for="profil" v-if="this.profil === true">Administrateur</label>  
                                <label for="profil" v-else>Utilisateur</label>
                            </div>
                            <br> 
                            <label for="nom">Nom :</label> <input  type="text" name="nom" id="nom" v-model="nom" readonly  size = 30/>   
                            <br> 	
                            <label for="prenom">Prénom :</label> <input  type="text" name="prenom"  id="prenom" v-model="prenom" readonly size = 30/>   
                            <br> 					
                            <label for="email">Email :</label>
                            <input  type="email" name="email"  id="email" readonly v-model="email" size = 30/> 
                            <br> 	                            
                            <button id="deletion" class="group-button" type="submit" >Suppression</button>
                        </fieldset>
                    </form>
                </section>

            </section>

        </div>
    </body>      
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
                this.$store.dispatch("auth/logout")
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

.FlexElt
{
    display: flex;
    flex-direction: column;
    max-width: 275px;
    margin: 15px auto;
    font-weight: bold;
    align-items: center;
    border-radius: 10px;
}
.group-button
{
    font-weight: bold;
    background-color: #ffb233;  
    height:55px; 
    width: 150px;
    border-radius: 10px;
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
    border-radius: 5px; 
}

.container
{
    display: flex; 
    flex-direction: column;
    margin: 15px auto;
}
</style>