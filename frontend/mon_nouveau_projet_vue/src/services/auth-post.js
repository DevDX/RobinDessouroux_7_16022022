import axios from "./http-common";

// CRUD vers la table post
// Utilisation d'axios les requêtes http
// Récupération du token depuis le localStorage 
class PostRoutes {
  getAll() {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get("/post/", {               // à vérifier avec Denis         
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  get(id) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get(`/post/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.post("/post", data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete(id) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.delete(`/post/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new PostRoutes();