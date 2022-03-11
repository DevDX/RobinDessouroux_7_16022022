import axios from "axios";
const URL = "http://localhost:3000/api/auth/"

class AuthService {
    login(user){
        return axios.post(URL +"login",{
            uEmail: user.uEmail, 
            uPassword: user.uPassword 
        }) 
        .then((res) => {
            localStorage.setItem("groupomania-user", JSON.stringify(res.data));
            return(res.data)
        }  )      
    }
    logout(){
        localStorage.removeItem("groupomania-user")

    }
    register(user){
        return axios.post(URL +"signup",{
            uEmail: user.uEmail, 
            uPassword: user.uPassword,
            uName: user.uName,
            uFirstname: user.uFirstname,
            uIsadmin: user.uIsadmin 
        })  
    }
}

export default  new AuthService();