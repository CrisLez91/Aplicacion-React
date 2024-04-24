import axios from 'axios';
import authHeader from './auth-header';

const url = process.env.REACT_APP_API_URL;
const parts = url.split("/api/");
const urlPart = parts[0] + "/api/";


const API_URL = urlPart;


class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }


  getUserBoard() {
  return axios.get(API_URL + 'all', { headers: authHeader() });
  }

  
  getModeratorBoard() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }
}

export default new UserService();
