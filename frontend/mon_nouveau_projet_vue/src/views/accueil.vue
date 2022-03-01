<template>
<!--DOCTYPE html-->
<div class="home">
    
    <div id="header"> 
        <img id="logo-groupomania-black" src="../images/icon-left-font-monochrome-black.png" alt="logo-groupomania-black" sizes="(min-width: 20px) 100px, 5vw"/>
    </div>
    
    <h1>Bienvenue sur le réseau social d'entreprise de Groupomania.</h1>
    <!--h2>Rejoignez notre Communauté.</h2-->
  
    
    <section id="choice">
        <h2>Rejoignez notre Communauté.</h2>
        <nav> 
            <ul>
              <li>
                <router-link class="link" to="/signup" ><p>Signup</p></router-link >
              </li>
              <li>
                <router-link class="link" to="/login"><p>Login</p></router-link>
              </li>
            </ul>
          </nav>
    </section>
    
</div>
</template>

<style>
/*
*
{
    text-decoration: none;
    list-style-type: none;
}*/
body
{
    margin: 0;
    padding: 0;
}
.home
{
    display: inline;
}
#header 
{
    display: flex;
    justify-content: center;
    background-color: #ffb233;
    align-items: center;
    flex-wrap: wrap;
}
#header #logo-groupomania-black 
{
    width: 170px;height:170px;    
    padding: 0;
    margin: 10px auto;
}
h1, h2 
{
    background-color: #ffb233;
    border-radius: 10px;
    padding: 20px; /* à vérifier rdx */
    margin: 15px 80px;
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
    font-size:25px;
    margin: 5px 350px;
    min-width: 190px; /* à vérifier */
}    
#choice , nav, ul,li
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5px;    
}  
.link 
{
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
}
</style>
