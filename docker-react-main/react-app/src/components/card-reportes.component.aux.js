import { useState, useEffect } from "react";
import Modal from './Modal';
import { useForm } from "react-hook-form";
import Errores from "./componente-errores";
import Abierta from "./componente-abierta.component";
import PreguntasService from "../services/pregunta.service";
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

export default function GataiReportes({ elson, indexo, keyo, preguntaid, content}) {
  const a = ["abierta", "cerrada", "mapa", "imagen", "Checkbox", "text"]
  const [active, setActive] = useState("text");
  const [idPreg, setIdPreg] = useState(false);
  const [respuesta, setRespuesta] = useState(false);
  const [centerMap, setCenterMap] = useState([]);
  const [state, setState] = useState(
    [[[19.393197568754356, -99.064663691525], [19.395383496602307, -99.06421321560734]], [[19.3933392501528, -99.06427756930985], [19.395403736537794, -99.06374128845553]]]);


  const multiLinestring = [
    [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]],
    [[51.51, -0.12], [51.505, -0.15], [51.502, -0.1]]
  ];

  useEffect(() => {
    for (let j = 0; j < content.length; j++) {
      if (preguntaid === content[j].id) {
        setIdPreg(content[j].enunciadoPregunta)
        if (content[j].tipoPregunta === a[1]) {
          if (content[j].subTipoPregunta != a[4]) {
            setRespuesta(content[j].opciones[parseInt(elson)])
          } else {
            if (elson.length > 0) {
              let arregloEnteros = elson.split(",").map(Number);

              if (arregloEnteros.length > 0) {
                var aux = ""
                for (let i = 0; i < arregloEnteros.length; i++) {
                  if (i < arregloEnteros.length - 1)
                    aux = aux + content[j].opciones[arregloEnteros[i]] + ", "
                  else
                    aux = aux + content[j].opciones[arregloEnteros[i]] + " "
                }
                setRespuesta(aux)
              }
            }

          }
        } else if (content[j].tipoPregunta === a[2]) {
          setRespuesta(elson)
          let cadena = elson
          const coordinates = JSON.parse(cadena);
          setState(coordinates)
          setCenterMap(coordinates[0][0])
          setActive(a[2])
        } else if (content[j].tipoPregunta === a[3]) {
          setRespuesta(elson)
          setActive(a[3])
        } else {
          setRespuesta(elson)
        }
      }
    }
  }, []);


  if (active === a[3])
    return (
      <div className="" >
        <div className="">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">{idPreg}</h6>
          </div>
          <div className="contenedorIMAGE" >
            <img src={respuesta} className="imgReportes" alt="Imagen convertida a Base64" />
          </div>

        </div>
      </div>
    );

  if (active === a[2])
    return (
      <div className="" >
        <div className="">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">{idPreg}</h6>
          </div>
          <MapContainer center={centerMap} zoom={16} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {state.map((linestring, index) => (
              <Polyline key={index} positions={linestring} color="blue" />
            ))}
          </MapContainer>

        </div>
      </div>
    );


  if (active === a[5])
    return (
      <div className="" >
        <div className="">
          <div key={indexo} class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">{idPreg}</h6>
            <p class="card-text"> {respuesta}</p>
          </div>
        </div>
      </div>
    );

}
