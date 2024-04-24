import { useState, useEffect } from "react";
import Modal from './Modal';
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import Abierta from "./componente-abierta.component";
import PreguntasService from "../services/pregunta.service";
import GataiReportes from "./card-reportes.component.aux"

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

    <button onClick={handleClick} className="boton-editar">
    </button>

  );
}




export default function CardReportes({ elson, indexo, keyo, content, usuarios }) {
  const a = ["abierta", "cerrada", "mapa", "imagen"]
  const [active, setActive] = useState(false);
  const [idPreg, setIdPreg] = useState("");
  const [editar, setEditar] = useState("");
  const [idnombre, setIdnombre] = useState(null);
  const [datefecha, setDatefecha] = useState(null);



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





  console.log(elson)


  useEffect(() => {
    for (let j = 0; j < usuarios.length; j++) {
      if (usuarios[j].id === elson.usuario_id)
        setIdnombre(usuarios[j].nombre)
    }
    const fecha = new Date(elson.fechaCreacion);
    setDatefecha(fecha.toLocaleString())
  }, []);

  if (idnombre)
    return (
      <div className="container" >
        <div class="card">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">Reporte {indexo + 1}</h6>
            <p class="card-text">{elson.id} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Fecha creacion</h6>
            <p class="card-text">{datefecha} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">Publicador</h6>
            <p class="card-text">{idnombre} </p>



            {elson.respuesta.map((el, index) => (
              <GataiReportes elson={el} indexo={index} preguntaid={elson.preguntas_id[index]} content={content} />
            ))}

            <div className="botones-superiores">
            </div>
          </div>
        </div>
      </div>
    );

}
