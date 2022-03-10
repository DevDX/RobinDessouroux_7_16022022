import axios from "./http-common";

class MessageRoutes {
  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.post(`/post/:id`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  getAll() {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get(`/post/:id`,  {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete(post, message) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.delete('/post/' + post + '/message/' + comment, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new MessageRoutes();