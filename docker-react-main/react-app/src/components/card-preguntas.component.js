import { useState, useEffect } from "react";
import Modal from './Modal';
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import Abierta from "./componente-abierta.component";
import PreguntasService from "../services/pregunta.service";

function DeleteButton({ id, onDelete }) {
  const handleClick = () => {
    onDelete(id);
  };

  return (
    <button onClick={handleClick} className="boton-eliminar">
      
    </button>


  );
}

function EditButton({ id, onEdit }) {
  const handleClick = () => {
    onEdit(id);
  };

  return (

    <button onClick={handleClick}  className="boton-editar">
    </button>

  );
}




export default function CardPreuntas({ elson, indexo, keyo }) {
  const a = ["abierta", "cerrada", "mapa", "imagen"]
  const [active, setActive] = useState(false);
  const [idPreg, setIdPreg] = useState("");

  const [editar, setEditar] = useState("");



  const toggle = () => {
    setActive(!active);
  }
  const [boton, setBoton] = useState(true);
  const [message, setMessage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
    reset,
    clearErrors,
  } = useForm({
    criteriaMode: "all"
  });

  useEffect(() => {
    if (active) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
    clearErrors("");
    setMessage("");
    reset("")
    setBoton(true)
  }, [active]);


  const onSubmit = (data) => {

    let claves = Object.keys(data);
    let clave = claves[0]
    if (data[clave].length < 5) {
      setMessage("El nuevo enunciado debe tener un tamaño minimo de 5")
      return;
    }


    PreguntasService.putPregunta({ "enunciadoPregunta": data[clave], "Id_pregunta": clave })
      .then(
        () => {//<-Se recive la data
          console.log(clave);

          console.log(data);
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
    //window.location.reload();
    //todo bien enviamos la data


  }

  const onChangePreguntaAbierta = (e) => {
    setMessage("")
    if (e.target.value.length === 0)
      setBoton(true)
    else
      setBoton(false)

  }

  const handleEdit = (id) => {
    // Lógica para editar el elemento con el ID dado
    setEditar(true);
    setActive(!active);

    console.log(`Editar elemento con ID ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el elemento con el ID dado
    setIdPreg(id);
    setEditar(false);
    setActive(!active);
    console.log(`Eliminar elemento con ID ${id}`);

  };

  const handleDeleteChiil = () => {
    // Aquí puedes colocar la lógica para eliminar algo
    console.log(idPreg);
    PreguntasService.delPregunta({ "Id_pregunta": idPreg })
      .then(
        () => {//<-Se recive la data
          alert(JSON.stringify("data"));
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
    //window.location.reload();
    //todo bien enviamos la data
  };


  if (elson.tipoPregunta === a[0]) {
    return (
      <div className="container" >
        <div class="card">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">Pregunta {indexo + 1}</h6>
            <p class="card-text">{elson.enunciadoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Id pregunta</h6>
            <p class="card-text">{elson.id} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Tipo Pregunta</h6>
            <p class="card-text">{elson.tipoPregunta} </p>
            <div className="botones-superiores">
              <EditButton id={elson.id} onEdit={handleEdit} />
              <DeleteButton id={elson.id} onDelete={handleDelete} />
            </div>

            <Modal active={active} toggle={toggle}>
              {editar &&
                <div>
                  <h1>Editar Pregunta {indexo + 1}</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Proporcione el nuevo enunciado</label>
                      <input
                        {...register(elson.id, {
                          required: "Error: Este campo es requerido."
                        })}
                        placeholder={elson.enunciadoPregunta}
                        type="text"
                        className="form-control"
                        id="enunciadoPregunta"
                        onChange={onChangePreguntaAbierta}
                      />
                    </div>
                    {message ? (
                      <div>
                        <div
                          className="wardengue"
                          role="alert"
                        >
                          {message}
                        </div>
                        <br />
                      </div>
                    ) : (
                      <div>
                        <br />
                        <br />
                      </div>
                    )}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={boton}
                    >
                      Guardar
                    </button>
                  </form>
                </div>

              }
              {!editar &&
                <div>
                  <h1>Eliminar Pregunta {indexo + 1}</h1>
                  <p>Se eliminara la pregunta "{elson.enunciadoPregunta}" junto a sus referencias en reportes.</p>
                  <div
                    className="wardengue"
                    role="alert"
                  >
                    desea continuar con la eliminacion?
                  </div>
                  <div>
                    <br />
                    <br />
                  </div>
                  <button className="btn btn-primary" onClick={handleDeleteChiil}>Confirmar</button>
                </div>

              }
            </Modal>
          </div>
        </div>
      </div>
    );
  } if (elson.tipoPregunta === a[1]) {
    return (
      <div className="container">
        <div class="card">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">Pregunta {indexo + 1}</h6>
            <p class="card-text">{elson.enunciadoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Id pregunta</h6>
            <p class="card-text">{elson.id} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Tipo Pregunta</h6>
            <p class="card-text">{elson.tipoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Subtipo Pregunta</h6>
            <p class="card-text">{elson.subTipoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Opciones</h6>
            <ul class="list-group list-group-flush">
              {elson.opciones.map((el, index) => (
                <li key={index} class="list-group-item">{el}</li>
              ))}
            </ul>
            <br />
            <div className="botones-superiores">
              <EditButton id={elson.id} onEdit={handleEdit} />
              <DeleteButton id={elson.id} onDelete={handleDelete} />
            </div>
            <Modal active={active} toggle={toggle}>
              {editar &&
                <div>
                  <h1>Editar Pregunta {indexo + 1}</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Proporcione el nuevo enunciado</label>
                      <input
                        {...register(elson.id, {
                          required: "Error: Este campo es requerido."
                        })}
                        placeholder={elson.enunciadoPregunta}
                        type="text"
                        className="form-control"
                        id="enunciadoPregunta"
                        onChange={onChangePreguntaAbierta}
                      />
                    </div>
                    {message ? (
                      <div>
                        <div
                          className="wardengue"
                          role="alert"
                        >
                          {message}
                        </div>
                        <br />
                      </div>
                    ) : (
                      <div>
                        <br />
                        <br />
                      </div>
                    )}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={boton}
                    >
                      Guardar
                    </button>
                  </form>
                </div>

              }
              {!editar &&
                <div>
                  <h1>Eliminar Pregunta {indexo + 1}</h1>
                  <p>Se eliminara la pregunta "{elson.enunciadoPregunta}" junto a sus referencias en reportes.</p>
                  <div
                    className="wardengue"
                    role="alert"
                  >
                    desea continuar con la eliminacion?
                  </div>
                  <div>
                    <br />
                    <br />
                  </div>
                  <button className="btn btn-primary" onClick={handleDeleteChiil}>Confirmar</button>
                </div>

              }
            </Modal>
          </div>
        </div>
      </div>
    );
  } if (elson.tipoPregunta === a[2]) {
    return (
      <div className="container">
        <div class="card">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">Pregunta {indexo + 1}</h6>
            <p class="card-text">{elson.enunciadoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Id pregunta</h6>
            <p class="card-text">{elson.id} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Tipo Pregunta</h6>
            <p class="card-text">{elson.tipoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Subtipo Mapa</h6>
            <p class="card-text">{elson.subTipoMapa} </p>
            <div className="botones-superiores">
              <EditButton id={elson.id} onEdit={handleEdit} />
              <DeleteButton id={elson.id} onDelete={handleDelete} />
            </div>
            <Modal active={active} toggle={toggle}>
              {editar &&
                <div>
                  <h1>Editar Pregunta {indexo + 1}</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Proporcione el nuevo enunciado</label>
                      <input
                        {...register(elson.id, {
                          required: "Error: Este campo es requerido."
                        })}
                        placeholder={elson.enunciadoPregunta}
                        type="text"
                        className="form-control"
                        id="enunciadoPregunta"
                        onChange={onChangePreguntaAbierta}
                      />
                    </div>
                    {message ? (
                      <div>
                        <div
                          className="wardengue"
                          role="alert"
                        >
                          {message}
                        </div>
                        <br />
                      </div>
                    ) : (
                      <div>
                        <br />
                        <br />
                      </div>
                    )}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={boton}
                    >
                      Guardar
                    </button>
                  </form>
                </div>

              }
              {!editar &&
                <div>
                  <h1>Eliminar Pregunta {indexo + 1}</h1>
                  <p>Se eliminara la pregunta "{elson.enunciadoPregunta}" junto a sus referencias en reportes.</p>
                  <div
                    className="wardengue"
                    role="alert"
                  >
                    desea continuar con la eliminacion?
                  </div>
                  <div>
                    <br />
                    <br />
                  </div>
                  <button className="btn btn-primary" onClick={handleDeleteChiil}>Confirmar</button>
                </div>

              }
            </Modal>
          </div>

        </div>
      </div>
    );
  } if (elson.tipoPregunta === a[3]) {
    return (
      <div className="container" >
        <div class="card">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">Pregunta {indexo + 1}</h6>
            <p class="card-text">{elson.enunciadoPregunta} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Id pregunta</h6>
            <p class="card-text">{elson.id} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Tipo Pregunta</h6>
            <p class="card-text">{elson.tipoPregunta} </p>
            <div className="botones-superiores">
              <EditButton id={elson.id} onEdit={handleEdit} />
              <DeleteButton id={elson.id} onDelete={handleDelete} />
            </div>
            <Modal active={active} toggle={toggle}>
              {editar &&
                <div>
                  <h1>Editar Pregunta {indexo + 1}</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Proporcione el nuevo enunciado</label>
                      <input
                        {...register(elson.id, {
                          required: "Error: Este campo es requerido."
                        })}
                        placeholder={elson.enunciadoPregunta}
                        type="text"
                        className="form-control"
                        id="enunciadoPregunta"
                        onChange={onChangePreguntaAbierta}
                      />
                    </div>
                    {message ? (
                      <div>
                        <div
                          className="wardengue"
                          role="alert"
                        >
                          {message}
                        </div>
                        <br />
                      </div>
                    ) : (
                      <div>
                        <br />
                        <br />
                      </div>
                    )}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={boton}
                    >
                      Guardar
                    </button>
                  </form>
                </div>

              }
              {!editar &&
                <div>
                  <h1>Eliminar Pregunta {indexo + 1}</h1>
                  <p>Se eliminara la pregunta "{elson.enunciadoPregunta}" junto a sus referencias en reportes.</p>
                  <div
                    className="wardengue"
                    role="alert"
                  >
                    desea continuar con la eliminacion?
                  </div>
                  <div>
                    <br />
                    <br />
                  </div>
                  <button className="btn btn-primary" onClick={handleDeleteChiil}>Confirmar</button>
                </div>

              }
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
