import React, { useState, useEffect } from "react";
import Errores from "./componente-errores";

export default function Checkboxe({ register, enunciadoPregunta, nombreID, opciones }) {


  return (
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
      {
        opciones.map(
          (c, i) =>
            <div key={i} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={i}
                key={i}
                placeholder={nombreID}
                {...register(nombreID, {})} />
              <label className="form-check-label" for="flexCheckDefault">
                {c}
              </label>
            </div>
        )
      }
    </div>
  );

}
