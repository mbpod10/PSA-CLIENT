import axios from "axios"
import apiUrl from "./APIConfig"

export class API {
  static loginClicked(body) {
    return axios.post(`${apiUrl}/api/users/login/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
  static registerClicked(body) {
    return axios.post(`${apiUrl}/api/users/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
}