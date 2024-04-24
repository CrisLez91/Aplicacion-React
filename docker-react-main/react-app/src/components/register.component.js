import React, { useState } from "react";
import { useForm } from "react-hook-form";


import AuthService from "../services/auth.service";


export default function Register() {

  const options = ["nombre", "email", "password", "fecha_nacimiento"]
  const [usuario, setUsuario] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [boton, setBoton] = useState(true);
  const [errorView, setErrorView] = useState(null);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      nombre: ''
    }
  });


  const onChangeUsername = (e) => {
    setUsuario(e.target.value);
    if (errorView === options[0])
      setMessage(null)
    if (e.target.value.length !== 0 && password.length !== 0 && fecha_nacimiento.length !== 0 && email.length !== 0)
      setBoton(false)

    if (e.target.value.length === 0)
      setBoton(true)
  }



  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (errorView === options[1])
      setMessage(null)
    if (e.target.value.length !== 0 && password.length !== 0 && fecha_nacimiento.length !== 0 && usuario.length !== 0)
      setBoton(false)

    if (e.target.value.length === 0)
      setBoton(true)
  }




  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (errorView === options[2])
      setMessage(null)
    if (e.target.value.length !== 0 && email.length !== 0 && fecha_nacimiento.length !== 0 && usuario.length !== 0)
      setBoton(false)

    if (e.target.value.length === 0)
      setBoton(true)
  }




  const onChangeFecha_nacimiento = (e) => {
    setFecha_nacimiento(e.target.value);
    if (errorView === options[3])
      setMessage(null)
    if (e.target.value.length !== 0 && email.length !== 0 && password.length !== 0 && usuario.length !== 0)
      setBoton(false)

    if (e.target.value.length === 0)
      setBoton(true)
  }




  const handleRegister = (data) => {
    var cont = "";
    var clean = false;
    var space = "";
    var i;
    for (i = 0; i < data.nombre.length; i++) {
      if (data.nombre.charAt(i) === ' ' && clean)
        space = data.nombre.charAt(i);
      if (data.nombre.charAt(i) !== ' ') {
        cont = cont + space + data.nombre.charAt(i);
        clean = true
        space = "";
      }
    }
    data.nombre = cont
    if (data.nombre.length < 5) {
      setMessage("Error: El campo nombre requiere almenos 5 caracteres.");
      setErrorView("nombre")
      return
    }
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if (!(data.fecha_nacimiento.match(RegExPattern))) {
      setMessage("Error: El campo fecha nacimiento debe tener este formato: 01/01/1991");
      setErrorView("fecha_nacimiento")
      return;
    }
    var fechaf = data.fecha_nacimiento.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    if (day > 31 || day < 1) {
      setMessage("Error: El campo fecha nacimiento requiere elementos validos.");
      setErrorView("fecha_nacimiento")
      return;
    }
    if (month > 12 || month < 1) {
      setMessage("Error: El campo fecha nacimiento requiere elementos validos.");
      setErrorView("fecha_nacimiento")
      return;
    }
    if (year > 2020 || year < 1950) {
      setMessage("Error: El campo fecha nacimiento requiere elementos validos.");
      setErrorView("fecha_nacimiento")
      return;
    }
    if (fechaf[0].length === 1) {
      day = "0" + day
    }
    if (fechaf[1].length === 1) {
      month = "0" + month
    }
    data.fecha_nacimiento = day + "/" + month + "/" + year
    var regOficial = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/
    if (!regOficial.test(data.email)) {
      setMessage("Error: El campo email requiere elementos validos.");
      setErrorView("email")
      return;
    }
    for (i = 0; i < data.password.length; i++)
      if (data.password.charAt(i) === ' ') {
        setMessage("Error: La contraseña no admite espacios.");
        setErrorView("password")
        return;
      }
    if (data.password.length < 6) {
      setMessage("Error: La contraseña debe tener almenos 6 caracteres");
      setErrorView("password")
      return;
    }
    setSuccessful(false)
    setLoading(true)
    setBoton(true)


    AuthService.register(data).then(
      response => {
        setMessage(response.data.message)
        setSuccessful(true)
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error.response.data);
        setSuccessful(false)
        setMessage(resMessage)
        setErrorView("email")
        setLoading(false)
        setBoton(false)
      }
    );
  }


  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        {!successful && (
          <form onSubmit={handleSubmit(handleRegister)}>
            <div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  {...register("nombre", {
                    required: "This input is required.",
                  })}
                  placeholder=""
                  type="text"
                  className="form-control"
                  id="nombre"
                  onChange={onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                <input
                  {...register("fecha_nacimiento", {
                    required: "This input is required."
                  })}
                  placeholder=""
                  type="datetime"
                  className="form-control"
                  id="fecha_nacimiento"
                  onChange={onChangeFecha_nacimiento}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", {
                    required: "This input is required."
                  })}
                  placeholder=""
                  type="text"
                  className="form-control"
                  id="email"
                  onChange={onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  {...register("password", {
                    required: "This input is required."
                  })}
                  placeholder=""
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={onChangePassword}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={boton}
                  type="submit"
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Sign Up
                </button>

              </div>
            </div>
          </form>
        )}

        {message ? (
          <div className="form-group">
            <div
              className={
                successful
                  ? "alert alert-success"
                  : "wardengue"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        ) : (
          <div className="form-group">
            <br/>
            <br/>
          </div>
        )}


      </div>
    </div>
  );

}
