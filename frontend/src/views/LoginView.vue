<template>
    <body>
        <div class="login">
            <section id="choice">
                <h1>Connexion au réseau social d'entreprise de Groupomania</h1>
                <section id="login-form">
                    <form  id="form">  
                        <fieldset class="FlexElt">
                            <legend>Connexion</legend> 

                            <label for="email">Email :</label>
                            <input class="FlexElt" type="email" name="email" required placeholder="Saisissez votre email" id="email" v-model="email"/> 
                            <br> 	
                            <label for="password">Mot de passe :</label>
                            <input class="FlexElt" type="password" name="password" required placeholder="Saisissez votre mot de passe" id="password" v-model="password"/> 
                            <br><br><br>		

                            <button class="group-button" type="submit" v-on:click.prevent="login">Connexion</button>
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
            let user =  {
                uEmail: this.email,
                uPassword: this.password
            }
            this.$store.dispatch("auth/login",user)
            .then(()=> {
                this.$router.push("/profil")
            }, (error) => {
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
    align-items: center;
    max-width: 275px;
    margin: 15px auto;
    font-size: 18px; 
    border-radius: 10px;
}
.group-button
{
    font-weight: bold;
    background-color: #ffb233;  
    height: 55px; 
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
</style>