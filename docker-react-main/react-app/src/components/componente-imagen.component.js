import React, { useState, useEffect } from "react";
import Errores from "./componente-errores";

export default function Imagen({ enunciadoPregunta, register, unregister, nombreID , errorMapa, setErrorMapa }) {

  const [base64Image, setBase64Image] = useState('');

  
  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();


    const eliminarError = (clave) => {
      // Crea una copia del objeto de errores
      const nuevoErrorMapa = { ...errorMapa };
      // Elimina la clave del objeto
      delete nuevoErrorMapa[clave];
      // Actualiza el estado con el nuevo objeto sin la clave
      setErrorMapa(nuevoErrorMapa);
    };

    reader.onloadend = () => {
      setBase64Image(reader.result);
      unregister(nombreID)
      register(nombreID, { value: reader.result })
      eliminarError(nombreID);
      console.log(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
      <input 
      type="file"
      onChange={handleImageInputChange} />      
    </div>
  );

}
