import React, { useState, useEffect } from "react";
import Errores from "./componente-errores";

export default function Abierta({register, enunciadoPregunta ,nombreID ,marcaDagua , setErrorMapa, errorMapa}) {

  const eliminarError = (clave) => {
    // Crea una copia del objeto de errores
    const nuevoErrorMapa = { ...errorMapa };
    // Elimina la clave del objeto
    delete nuevoErrorMapa[clave];
    // Actualiza el estado con el nuevo objeto sin la clave
    setErrorMapa(nuevoErrorMapa);
  };

  const handleChange = (event) => {
    eliminarError(nombreID);
  };



  return (
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
      <input
        {...register(nombreID)}
        placeholder={marcaDagua}
        type="text"
        className="form-control"
        id={nombreID}
        onChange={handleChange}
      />
    </div>
  );

}
