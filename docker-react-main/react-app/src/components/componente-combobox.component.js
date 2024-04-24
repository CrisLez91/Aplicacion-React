import React, { useState, useEffect } from "react";
import Errores from "./componente-errores";

export default function Comboboxe({ register, enunciadoPregunta, nombreID, opciones ,setErrorMapa, errorMapa}) {
  
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
    <div >
      <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
      <select
        {...register(nombreID)}
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleChange}

      >
        <option selected>Despliega para ver las opciones</option>
        {
          opciones.map(
            (c, i) =>
              <option key={i} value={i}>{c}</option>
          )
        }
      </select>
    </div>
  );

}
