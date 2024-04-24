import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import Radiobutton from "./componente-radioButon.component";
import Abierta from "./componente-abierta.component";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import userService from "../services/user.service"
import PreguntasService from "../services/pregunta.service"
import CardPreuntas from "./card-preguntas.component";

export default function BoardUser(props) {


  const [content, setContent] = useState(false);
  const [errore, setErrore] = useState(false);

  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ usuario: "" });



  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    PreguntasService.getPreguntasAplicacion().then(
      response => {
        setContent(
          response.data
        );
      },
      error => {
        /*
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        )
        setErrore(true)
        */
      }
    );
    if (!currentUser)
      setRedirect("/home");
    setCurrentUser(currentUser);
    setUserReady(true);

  }, []);

  console.log(content)

  if (userReady && content)
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
              {content.map((el, index) => (
                <CardPreuntas elson={el} indexo={index} />
              ))}
            </header>
          </div>
        );

    }


}
