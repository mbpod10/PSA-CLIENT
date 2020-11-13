import axios from "axios"
import apiUrl from "./APIConfig"

export class API {
  static login(body) {
    return axios.post(`${apiUrl}/api/users/login/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
  static register(body) {
    return axios.post(`${apiUrl}/api/users/register/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
}