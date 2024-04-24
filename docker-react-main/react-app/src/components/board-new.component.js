import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import Radiobutton from "./componente-radioButon.component";
import Abierta from "./componente-abierta.component";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import userService from "../services/user.service"
import PreguntasService from "../services/pregunta.service"

export default function BoardUser(props) {


  const [content, setContent] = useState(false);

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
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        )
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
    } else
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>aa</h3>
          </header>
          {content.map((el, index) => (
            <div className="form-check">
              <h1 key={index}>
                {el.enunciadoPregunta} {index}
              </h1>
            </div>
          ))}
          
        </div>
      );
}
