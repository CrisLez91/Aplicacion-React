import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const parts = url.split("/api/");
const urlPart = parts[0] + "/api/";
const idPart = parts[1].trim();

const API_URL = urlPart+"usuario/auth/";
const Id_Aplicacion = idPart
//const Id_Aplicacion = "65f0d05dc60fcb54b3da1882";


class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login/aplicacion/" + Id_Aplicacion, {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register({nombre, fecha_nacimiento ,email, password}) {
    console.log(API_URL + "registro/aplicacion/" + Id_Aplicacion)
    return axios.post(API_URL + "registro/aplicacion/" + Id_Aplicacion, {
      nombre,
      fecha_nacimiento,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
