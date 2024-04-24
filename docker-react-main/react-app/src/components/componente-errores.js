import React, { useState, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";


export default function Errores({ errors, name }) {

  const [imp, setImp] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [visible, setVisible] = useState(false);



  console.log(errors)


  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p className="wardengue" key={type}>{message}</p>
        ))
      }
    />
  );


}
