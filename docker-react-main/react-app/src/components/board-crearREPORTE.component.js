import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import Radiobutton from "./componente-radioButon.component";
import Abierta from "./componente-abierta.component";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import userService from "../services/user.service"
import PreguntasService from "../services/pregunta.service"
import ReportesService from "../services/reporte.service"
import CardPreuntas from "./card-preguntas.component";
import ComponentsGatai from "./component-gatai";


export default function BoardUser(props) {


  const [content, setContent] = useState(false);
  const [dataS, setDataS] = useState(false);
  const [errore, setErrore] = useState(false);

  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ usuario: "" });

  const [errorMapa, setErrorMapa] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
  } = useForm({
    criteriaMode: "all"
  });


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





  const onSubmit = (data) => {
    const a = ['ComboBox', 'Checkbox']

    var error = false;
    let claves = Object.keys(data);
    var imp = false;

    console.log(data)
    /*********Errors No nulo ************ */
    for (let j = 0; j < content.length; j++) {
      error = false;
      for (let i = 0; i < claves.length; i++) {
        let clave = claves[i]
        if (claves[i] === content[j].id) {
          error = true;
          if (content[j].subTipoPregunta === a[0] && data[claves[i]].length > 30) {
            error = false;
          }
          if (data[clave] === null || data[clave] === '') {
            error = false;
          }
        }
      }
      if (!error) {
        setErrorMapa(prevState => ({
          ...prevState,
          [content[j].id]: 'Error: Este campo es requerido.'
        }));
        console.log("error", content[j].id, errorMapa)
        imp = true
      }
      error = false;
    }
    /************************************* */

    if (imp)
      return;

    var aux = [];

    for (let j = 0; j < content.length; j++) {
      for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if (claves[i] === content[j].id)
          if (data[clave] === false)
            aux.push("");
          else if (typeof data[clave] === 'string')
            aux.push(data[clave]);
          else
            aux.push(data[clave].toString());
      }
    }
    console.log(data)
    console.log(aux)

    //todo bien enviamos la data
    ReportesService.postReporte({ "usuario_id": currentUser.id, "respuesta": aux })
      .then(
        () => {//<-Se recive la data
          console.log("nio");
          alert(JSON.stringify({ "usuario_id": currentUser.id, "respuesta": aux }));
          window.location.reload();

        },
        error => {//<-Se recive un error de la Api
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          var imp = error.response.data
          console.log(resMessage);


        }
      );


  }



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
          <div className="cardPREGUNTAS">
            <div className="container">
              <header className="card">
                <div className="mb-3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {content.map((el, index) => (
                      <div>
                        <ComponentsGatai
                          register={register}
                          index={index}
                          data={el}
                          unregister={unregister}
                          errors={errors}
                          errorMapa={errorMapa}
                          setErrorMapa={setErrorMapa}
                        />
                      </div>
                    ))}
                    <input type="submit" className="btn btn-primary" />
                  </form>
                </div>
              </header>
            </div>
          </div>
        );

    }


}