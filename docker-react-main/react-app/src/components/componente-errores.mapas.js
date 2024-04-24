import React, { useState, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";


export default function ErroresMapas({ nombreID, errorMapa }) {

  const [content, setContent] = useState(false);
  const errorRef = useRef(null);
  var message = ""
  var flag = false;
  console.log(errorMapa)


  let claves = Object.keys(errorMapa); // claves = ["nombre", "color", "macho", "edad"]
  for (let i = 0; i < claves.length; i++) {
    let clave = claves[i];
    if (clave === nombreID) {
      flag = true;
      message=errorMapa[clave]
      if(i===0)
      errorRef.current.scrollIntoView({ block: 'center' });
    }

  }


  if (flag)
    return (
      <div ref={errorRef}>
        <p className="wardengue" key={nombreID}>{message}</p>
      </div>


    );
  else
    return (
      <div  ref={errorRef}>
        <br />
      </div>
    );
}
