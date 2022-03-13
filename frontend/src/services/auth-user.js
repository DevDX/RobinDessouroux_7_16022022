import axios from "./http-common";

class UserRoutes 
{      
    getAllUsers() {
      const token = JSON.parse(localStorage.getItem("groupomania-user")).token; //console.log("auth-user token :"+token); 
      return axios.get('/auth/profils/', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
    delete(id) {
      const token = JSON.parse(localStorage.getItem("groupomania-user")).token; //console.log("auth-user token :"+token); 
      return axios.delete(`/auth/profil/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
}

export default new UserRoutes(); 