import axios from 'axios';
import authHeader from './auth-header';

const url = process.env.REACT_APP_API_URL;
const parts = url.split("/api/");
const urlPart = parts[0] + "/api/";
const idPart = parts[1].trim();

const API_URL = urlPart+"pregunta";
const Id_Aplicacion = idPart
//const Id_Aplicacion = "65f0d05dc60fcb54b3da1882";

class PreguntasService {

  postPregunta({enunciadoPregunta,tipoPregunta,subTipoPregunta,subTipoMapa,opciones}) {
    return axios.post(
    API_URL + '/aplicacion/' + Id_Aplicacion, //ruta
    {enunciadoPregunta,tipoPregunta,subTipoPregunta,subTipoMapa,opciones},//datos
    {headers: authHeader()}//headers con el JWT
    );
  }

  putPregunta({enunciadoPregunta,Id_pregunta}) {
    return axios.put(
    API_URL + '/' + Id_pregunta, //ruta
    {enunciadoPregunta},//datos
    {headers: authHeader()}//headers con el JWT
    );
  }

  delPregunta({Id_pregunta}) {
    return axios.delete(
    API_URL + '/' + Id_pregunta, //ruta
    {headers: authHeader()}//headers con el JWT
    );
  }

  getPreguntasAplicacion() {
    return axios.get(
      API_URL + '/aplicacion/' + Id_Aplicacion,
      {headers: authHeader()}
    );
  }

  getPregunta({Id_pregunta}) {
    return axios.delete(
    API_URL + '/' + Id_pregunta, //ruta
    {headers: authHeader()}//headers con el JWT
    );
  }
}

export default new PreguntasService();
