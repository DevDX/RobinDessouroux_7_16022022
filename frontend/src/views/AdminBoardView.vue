<template>
    <body>
        <div class="signup">
            <section id="choice">
                <h1>Bonjour {{ CurrentUser.userData.uName }} </h1>
                <div class="admin" v-for="user in allUser" :key="user.id">
                    <p v-if="CurrentUser.userData.id != user.id "> {{ user.uEmail }} </p>  
                    <button v-if="CurrentUser.userData.id != user.id " class="group-button" @click="deletion(user.id)">Suppr.</button>  
                </div>
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
                
            userRoutes.delete(id)
            .then(() => 
            {
              userRoutes.getAllUsers()
                .then((res) =>{
                    this.allUser = res.data
                    console.log(this.allUser);
                }) 
                .catch((error) => {
                    console.log(error);
                }) 
            })
            .catch((error) => 
            {
                console.log(error); 
            });        
        
        },
        

    },
};
</script>


<style scoped >
#choice
{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.admin
{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    width: 60%;
    max-width: 20rem;
    align-items: center;
    
}
.group-button
{
    font-weight: bold;
    background-color: #fd2d01;  
    height: 20px; 
    width: 50px;
    border-radius: 10px;
    border: 1px solid #000000;
    font-size: 10px; 
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