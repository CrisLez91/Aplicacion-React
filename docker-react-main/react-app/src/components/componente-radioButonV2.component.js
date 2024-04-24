import React, { useState, useEffect } from "react";


export default function RadiobuttonV2({ opciones, enunciadoPregunta, register, nombreID, setErrorMapa, errorMapa }) {


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
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label for="inputPassword6" className="col-form-label">{enunciadoPregunta}</label>
        {opciones.map((el, index) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={nombreID}
              id={index}
              value={index}
              {...register(nombreID)}
              onChange={handleChange}
            />
            <label className="form-check-label" for={nombreID}>
              {el}
            </label>
          </div>
        ))}
      </div>


      <br />
    </div>
  );

}
