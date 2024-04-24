import React, { useState, useEffect } from "react";
import Errores from "./componente-errores";
import { MapContainer, useMapEvents, Popup, Marker, TileLayer } from "react-leaflet";
import { MarkerIcon } from './react-leaflet-icon.js';
import EditFeature from "./EditFeature.js";
import EditFeaturePolyline from "./EditFeature.Polyline.js";



export default function Mapa({ enunciadoPregunta, register, unregister, nombreID, errorMapa, setErrorMapa }) {

  const [imp, setImp] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [state, setState] = useState({
    currentLocation: { lat: 19.435761, lng: -99.144119 },
    zoom: 12,
  });


  const zoom = 16



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        setState({
          currentLocation: { lat: position.coords.latitude, lng: position.coords.longitude },
        });
        setImp(true)
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        setImp(true)
      },
      {
        enableHighAccuracy: true,
      },

    );
  }, []);


  if (imp) {
    const { currentLocation, zoom } = state;
    return (
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
        <MapContainer center={currentLocation} zoom={16} scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <EditFeaturePolyline
            register={register}
            unregister={unregister}
            nombreID={nombreID}
            errorMapa={errorMapa}
            setErrorMapa={setErrorMapa}
          />
        </MapContainer>
      </div>
    );
  }


}
