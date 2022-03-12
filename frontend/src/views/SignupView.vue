<template>  
    <body>
        <div class="signup">
            <section id="choice">
                <h1>Inscription au réseau social d'entreprise de Groupomania</h1>

                <section id="signup-form">
                    <form id="form_1" > 
                        <fieldset class="FlexElt">
                            <legend>Inscription</legend> 
                            <legend>Informations personnelles</legend>
                                        
                            <div class="container">
                                <label for="user-profil">Profil :</label>
                                <select v-model="isadmin" name="user-profil" id="user-profil">
                                    <option disabled value="">--SVP, sélectionnez votre profil</option>
                                    <option value=false>Utilisateur</option>
                                    <option value=true>Administrateur</option>  
                                </select>
                            </div>
                            <br>                             
                            <label for="nom">Nom :</label> <input class="FlexElt" type="text" name="nom" v-model="nom" required placeholder="Saisissez votre nom" id="nom" aria-label="Saisissez-votre nom"/>   
                            <br> 	
                            <label for="prenom">Prénom :</label> <input class="FlexElt" type="text" name="prenom" v-model="prenom" required placeholder="Saisissez votre prénom" id="prenom" aria-label="Saisissez-votre prénom"/>   
                            <br> 					
                            <label for="email">Email :</label>
                            <input class="FlexElt" type="email" name="email" v-model="email" required placeholder="Saisissez votre email" id="email" /> 
                            <br> 	
                            <label for="password">Mot de passe :</label>
                            <input class="FlexElt" type="password" name="password" v-model="password" required placeholder="Saisissez votre mot de passe" id="password" /> 
                            <br>                                                
                            <button class="group-button" type="submit" v-on:click.prevent="signup">Inscription</button>
                        </fieldset>
                    </form>
                </section>
            </section>

        </div>
    </body>       
</template>

<script>

export default 
{
    name: "SignupView",
    // Récupération de data grâce aux v-model 
    data() 
    {
        return {email: "",password: "", nom: "", prenom: "", isadmin: false};
    },
    // utilisation d'axios pour envoi des données 
    methods: 
    {
        signup() 
        {
            let user = {
                uEmail: this.email,
                uPassword: this.password,
                uName: this.nom,
                uFirstname: this.prenom,
                uIsadmin: this.isadmin
            }
            console.log(this.isadmin);
            this.$store.dispatch("auth/register",user)
            .then(() => {
             this.$router.push("/connexion")
            }, (error)=> {
                console.log(error);
            })
        },
    },
};
</script>


<style scoped>
.FlexElt
{
    display: flex;
    flex-direction: column;
    max-width: 275px;
    margin: 15px auto;
    font-weight: bold;
    align-items: center;
}
fieldset
{
    border-radius: 10px;
}
.group-button
{
    font-weight: bold;
    background-color: #ffb233;  
    height:55px; width: 150px;
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
    color: #000000;
    border-radius: 5px;      
}
select
{
	border-radius: 20px;
	border: 1px solid #000000;
	text-align: center;
}
.container
{
    display: flex;
    flex-direction: column;
    margin: 15px auto;
}
</style>