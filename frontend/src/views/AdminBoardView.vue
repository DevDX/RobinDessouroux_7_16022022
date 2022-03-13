<template>
    <body>
        <div class="signup">
            <section id="choice">
                <h1>Bonjour {{ this.prenom }} </h1>
            </section>

        </div>
    </body>      
</template>

<script>
import userRoutes from "../services/auth-user";

export default 
{
    name: "AdminBoard",
    //Récupération du data grâce au v-model 
    data() 
    {
        return {
            allUser: [],  
        };
    },
    computed: {
        CurrentUser() {
        return this.$store.state.auth.user
        }
    },
    // récupération des données depuis le ls
    mounted: function() {  
        userRoutes.getAllUsers()
        .then((res) =>{
            this.allUser = res.data
            console.log(this.allUser);
        }) 
        .catch((error) => {
            console.log(error);
        })
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
                this.$store.dispatch("auth/logout");
                alert("user " +id+ " supprimé"); 
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

.container
{
    display: flex; 
    flex-direction: column;
    margin: 15px auto;
}
</style>