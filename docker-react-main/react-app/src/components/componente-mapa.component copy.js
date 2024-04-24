import React, { useState, useEffect } from "react";
import Errores from "./componente-errores";
import { MapContainer, useMap, Popup, Marker, TileLayer } from "react-leaflet";


export default function Mapa({ punto }) {

  const [imp, setImp] = useState(null);
  const [nombre, setNombre] = useState([]);
  const [visible, setVisible] = useState(false);

  const zoom = 16

  var aux = [];
  var cont = "";
  var i;


  for (i = 0; i < punto.length; i++) {
    if (punto.charAt(i) !== '[' && punto.charAt(i) !== ',' && punto.charAt(i) !== ']' && punto.charAt(i) !== ' ')
      cont = cont + punto.charAt(i);
    if (punto.charAt(i) === ',' || punto.charAt(i) === ']') {
      aux.push(parseFloat(cont))
      cont = "";
    }
  }

  if (aux.length == 2)
    return (
      <div className="mb-3">
        <MapContainer center={aux} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={aux}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );

}
