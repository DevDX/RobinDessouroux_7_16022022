import axios from "./http-common";

class MessageRoutes {
  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.post(`/message`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete(id) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.delete('/message/'+id , {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new MessageRoutes();