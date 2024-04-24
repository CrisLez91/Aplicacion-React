import axios from 'axios';
import authHeader from './auth-header';

const url = process.env.REACT_APP_API_URL;
const parts = url.split("/api/");
const urlPart = parts[0] + "/api/";
const idPart = parts[1].trim();

const API_URL = urlPart+"reporte";
const Id_Aplicacion = idPart
//const Id_Aplicacion = "65f0d05dc60fcb54b3da1882";

class ReportesService {

  postReporte({usuario_id,respuesta}) {
    return axios.post(
    API_URL + '/aplicacion/' + Id_Aplicacion, //ruta
    {usuario_id,respuesta},//datos
    {headers: authHeader()}//headers con el JWT
    );
  }

  getReportesAplicacion() {
    return axios.get(
      API_URL + '/aplicacion/' + Id_Aplicacion,
      {headers: authHeader()}
    );
  }
}

export default new ReportesService();
