import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import Radiobutton from "./componente-radioButon.component";
import Abierta from "./componente-abierta.component";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import userService from "../services/user.service"
import PreguntasService from "../services/pregunta.service"
import CardReportes from "./card-reportes.component";
import ReportesService from "../services/reporte.service"
import UsuariosService from "../services/usuario.service"
import CardUsuarios from "./card-usuarios.component";

export default function VerUsuarios(props) {

  const [currentUser, setCurrentUser] = useState({ usuario: "" });

  const [content, setContent] = useState(false);
  const [reportes, setReportes] = useState(false);
  const [usuarios, setUsuarios] = useState(false);

  const [errore, setErrore] = useState(false);

  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);




  useEffect(() => {

    UsuariosService.getUsuariosAplicacion().then(
      response => {
        setUsuarios(
          response.data
        );
      },
      error => {        
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        )
        setErrore(true)        
      }
    );

    ReportesService.getReportesAplicacion().then(
      response => {
        setReportes(
          response.data
        );
      },
      error => {        
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        )
        setErrore(true)        
      }
    );


    const currentUser = AuthService.getCurrentUser();
    PreguntasService.getPreguntasAplicacion().then(
      response => {
        setContent(
          response.data
        );
      },
      error => {        
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        )
        setErrore(true)        
      }
    );
    if (!currentUser)
      setRedirect("/home");
    setCurrentUser(currentUser);
    setUserReady(true);

  }, []);

  console.log(usuarios)
  console.log(reportes)

  if (userReady && content && reportes && usuarios)
    if (redirect) {
      return (<Navigate to={redirect} />);
    } else {
      if (errore)
        return (
          <div className="form-group">
          <div
            className="alert alert-danger"           
            role="alert"
          >
            {content}
          </div>
        </div>
        );
      else
        return (
          <div className=""  >
            <header className="cardPREGUNTAS" >
              {usuarios.map((el, index) => (
                <CardUsuarios elson={el} indexo={index}/>
              ))}
            </header>
          </div>
        );

    }


}
