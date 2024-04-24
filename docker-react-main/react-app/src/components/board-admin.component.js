import AuthService from "../services/auth.service";
import PreguntasService from "../services/pregunta.service";
import { Navigate } from "react-router-dom";
import Radiobutton from "./componente-radioButon.component";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";


export default function BoardAdmin(props) {


  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ usuario: "" });


  const [SemaforotPCerrada, setSemaforotPCerrada] = useState(false);
  const [SemaforotPMapa, setSemaforotPMapa] = useState(false);



  var opcionesPMapa = ["Point", "LineString", "Polygon", "MultiPoint", "MultiLinestring", "MultiPolygon"];
  var opcionesPCerrada = ["Checkbox", "ComboBox", "Radiobutton"];

  const {
    register,
    formState,
    setError,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    resetField,
    reset,
    clearErrors,
  } = useForm({
    criteriaMode: "all"
  });

  const [tipoPregunta, setTipoPregunta] = useState(null);
  const [opciones, setOpciones] = useState(null);



  const onChangeOpciones = (e) => {
    if (e.target.value.length === 0)
      setOpciones(false);
    else
      setOpciones(true);
    clearErrors("opciones");
  }


  const onChangePreguntaAbierta = (e) => {
    clearErrors("enunciadoPregunta");
  }

  const onChangeCheckbox = (e) => {
    if (opciones)
      clearErrors("opciones");
    clearErrors("subTipoPregunta");
  }

  const onChangeTipoPreguntaImagen = (e) => {
    resetField("opciones");
    resetField("subTipoMapa");
    resetField("subTipoPregunta");
    setTipoPregunta(e.target.value);
    setSemaforotPCerrada(false);
    setSemaforotPMapa(false);
    setOpciones(false);

  }

  const onChangeTipoPreguntaAbierta = (e) => {
    resetField("opciones");
    resetField("subTipoMapa");
    resetField("subTipoPregunta");
    setTipoPregunta(e.target.value);
    setSemaforotPCerrada(false);
    setSemaforotPMapa(false);
    setOpciones(false);

  }


  const onChangeTipoPreguntaCerrada = (e) => {
    clearErrors("opciones");
    resetField("subTipoMapa");
    setTipoPregunta(e.target.value);
    setSemaforotPCerrada(true);
    setSemaforotPMapa(false);


  }




  const onChangeTipoPreguntaMapa = (e) => {
    resetField("opciones");
    resetField("subTipoPregunta");
    setTipoPregunta(e.target.value);
    setSemaforotPCerrada(false);
    setSemaforotPMapa(true);
    setOpciones(false);


  }



  const onSubmit = (data) => {
    const tipos = ["enunciadoPregunta", "opciones", "Checkbox", ""]

    //tratamiento
    var aux = []
    var cont = "";
    var findError = false;
    var i;
    var clean;
    var space;

    //tratamiento "Enunciado Pregunta"
    cont = "";
    clean = false;
    space = "";
    for (i = 0; i < data.enunciadoPregunta.length; i++) {
      if (data.enunciadoPregunta.charAt(i) === ' ' && clean)
        space = data.enunciadoPregunta.charAt(i);
      if (data.enunciadoPregunta.charAt(i) !== ' ') {
        cont = cont + space + data.enunciadoPregunta.charAt(i);
        clean = true
        space = "";
      }
    }
    data.enunciadoPregunta = cont;
    if (cont.length < 5) {
      setError("enunciadoPregunta", {
        type: "manual",
        message: "Error: El campo requiere almenos 5 caracteres validos."
      });
      findError = true;
    }


    //tratamiento "opcionies"
    if (data.opciones) {
      cont = "";
      clean = false;
      space = "";
      for (i = 0; i < data.opciones.length; i++) {
        if (data.opciones.charAt(i) === ' ' && clean)
          space = data.opciones.charAt(i);
        if (data.opciones.charAt(i) !== ' ' && data.opciones.charAt(i) !== ',') {
          cont = cont + space + data.opciones.charAt(i);
          clean = true
          space = "";
        } if (data.opciones.charAt(i) === ',') {
          aux.push(cont)
          cont = "";
          space = "";
          clean = false;
        }
      }
      aux.push(cont);
      if (data.subTipoPregunta != tipos[2]) {
        console.log(aux.length)
        if (aux.length < 2) {
          console.log(data.subTipoPregunta)
          setError("opciones", {
            type: "manual",
            message: "Error: El campo requiere almenos 2 opciones."
          });
          findError = true;
        }
      }
      for (i = 0; i < aux.length; i++) {
        if (aux[i].length === 0) {
          setError("opciones", {
            type: "manual",
            message: "Error: El campo no contiene opciones validas."
          });
          findError = true;
        }
      }
      data.opciones = aux
    }

    //si hay errores retorna
    if (findError) {
      console.log(errors)
      return;
    }


    //todo bien enviamos la data
    PreguntasService.postPregunta(data)
      .then(
        () => {//<-Se recive la data
          console.log("nio");
          alert(JSON.stringify(data));
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


  };


  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser)
      setRedirect("/home");
    else if (!currentUser.roles.includes("ROLE_administrador"))
      setRedirect("/home");

    setCurrentUser(currentUser);
    setUserReady(true);
  }, []);


  if (userReady)
    if (redirect) {
      return (<Navigate to={redirect} />);
    } else
      return (
        <div className="cardPREGUNTAS">
          <div className="container" >
            <header className="card">
              <div className="mb-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Enunciado de la pregunta</label>
                    <input
                      {...register("enunciadoPregunta", {
                        required: "Error: Este campo es requerido."
                      })}
                      placeholder="ejemplo: ¿Que dia es hoy?"
                      type="text"
                      className="form-control"
                      id="enunciadoPregunta"
                      onChange={onChangePreguntaAbierta}
                    />
                  </div>
                  {errors.enunciadoPregunta ? (<p className="wardengue" >{errors.enunciadoPregunta.message}</p>) :
                    (<br />)

                  }
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label for="inputPassword6" className="col-form-label">Tipo pregunta</label>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="abierta"
                          {...register("tipoPregunta", {
                            required: "Error: Este campo es requerido.",
                          })}
                          onChange={onChangeTipoPreguntaAbierta}
                        />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Abierta
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          value="cerrada"
                          {...register("tipoPregunta", {
                            required: "This input is required.",
                          })}
                          onChange={onChangeTipoPreguntaCerrada}
                        />
                        <label className="form-check-label" for="flexRadioDefault2">
                          Cerrada
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault3"
                          value="mapa"
                          {...register("tipoPregunta", {
                            required: "Error: Este campo es requerido.",
                          })}
                          onChange={onChangeTipoPreguntaMapa}
                        />
                        <label className="form-check-label" for="flexRadioDefault3">
                          Mapa
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="imagen"
                          {...register("tipoPregunta", {
                            required: "Error: Este campo es requerido.",
                          })}
                          onChange={onChangeTipoPreguntaImagen}
                        />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Imagen
                        </label>
                      </div>
                    </div>
                  </div>
                  {!tipoPregunta &&
                    <Errores errors={errors} name="tipoPregunta" />
                  }
                  <br />
                  {SemaforotPMapa &&
                    <div>
                      <br />
                      <Radiobutton
                        enunciadoPregunta="SubTipo Mapa"
                        nombreID="subTipoMapa"
                        opciones={opcionesPMapa}
                        register={register}
                      />
                      <Errores errors={errors} name="subTipoMapa" />
                    </div>
                  }
                  {SemaforotPCerrada &&
                    <div>
                      <div className="row g-3 align-items-center">
                        <div className="col-auto">
                          <label for="inputPassword6" className="col-form-label">{"SubTipo Pregunta"}</label>
                        </div>
                        <div className="col-auto">
                          <div className="col-auto">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="Checkbox"
                                {...register("subTipoPregunta", {
                                  required: "Error: Este campo es requerido.",
                                })}
                                onChange={onChangeCheckbox}
                              />
                              <label className="form-check-label" for="flexRadioDefault1">
                                Checkbox
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                value="ComboBox"
                                {...register("subTipoPregunta", {
                                  required: "Error: Este campo es requerido.",
                                })}
                              />
                              <label className="form-check-label" for="flexRadioDefault2">
                                ComboBox
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault3"
                                value="Radiobutton"
                                {...register("subTipoPregunta", {
                                  required: "Error: Este campo es requerido.",
                                })}
                              />
                              <label className="form-check-label" for="flexRadioDefault3">
                                Radiobutton
                              </label>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                      <Errores errors={errors} name="subTipoPregunta" />
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Opciones</label>
                        <input
                          {...register("opciones", {
                            required: "Error: Este campo es requerido.",
                          })}
                          placeholder="Ingrese las opciones separadas por ,"
                          type="text"
                          className="form-control"
                          id="opciones"
                          onChange={onChangeOpciones}
                        />
                      </div>
                      {errors.opciones ?
                        (<p className="wardengue" >{errors.opciones.message}</p>) :
                        (<br />)

                      }
                    </div>
                  }
                  <br />
                  <input type="submit" className="btn btn-primary" />

                </form>
              </div>

            </header>
          </div>
        </div>
      );
}
