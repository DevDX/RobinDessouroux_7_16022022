<template>
<!--DOCTYPE html-->
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Groupomania réseau social interne</title> 
        <link rel="shortcut icon" href="../image/icon.svg"/>
    </head>
    <body>
        <div class="home">
            
            <header> 
                <img id="logo-groupomania-black" src="../image/icon-left-font-monochrome-black.png" alt="logo groupomania black" sizes="(min-width: 20px) 100px, 5vw"/>
                <!--h1>Bienvenue sur le réseau social d'entreprise de Groupomania.</h1>
                <h2>Rejoignez notre Communauté.</h2-->
            </header>
            
            <!--h1>  Bienvenue sur le réseau social d'entreprise de Groupomania. </h1-->
            <!--h2>Rejoignez notre Communauté.</h2-->
        
            
            <section id="choice">
                <h1>Bienvenue sur le réseau social d'entreprise de Groupomania</h1>
                    <h2>Rejoignez notre Communauté</h2>
                    <nav> 
                        <ul>
                        <li>
                            <router-link class="link" to="/signup" ><p>Inscription</p></router-link >
                        </li>
                        <li>
                            <router-link class="link" to="/login"><p>Connexion</p></router-link>
                        </li>
                        </ul>
                    </nav>
            </section>
            
        </div>  
    </body> 
</html> 
</template>


<style>
*
{
    font-family: arial;  
}
body
{
    margin: 0;
    padding: 0;
}    
.home
{
    display: inline;
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
#choice , nav, ul,li
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5px;    
}  
ul
{
        padding:0;
}   
.link 
{
    /*margin: 150px auto ;*/
    padding-left: 10px;
    padding-right: 10px;
    font-size: 22px; 
    font-weight: bold;
    color: #000000;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;  
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;  
    background-color: #ffb233;
    height: 50px; width:150px;
    align-content: center;
    /*border: 1px solid;*/  
    border: 1px solid #000000;
    box-shadow: 0 0 4px black;
}    
.link, p 
{
    text-align: center;
    align-self: center;
    margin: 10px auto;
    padding: 5px;        
}
.link:hover
{
    background-color: #000000;
    color: #ffffff;
    transition: all .3s ease-in-out;
}
</style>
