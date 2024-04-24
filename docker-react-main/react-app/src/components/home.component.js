import React, { useEffect, useState } from "react";

import UserService from "../services/user.service";




export default function Home() {



console.log(process.env.REACT_APP_API_URL)
console.log(process.env.REACT_APP_API_IDO)


  return (

      <div className="cardPREGUNTAS">
        <div className="container">
          <br></br>
          <br></br>
          <br></br>
          <h3>Tianguis CDMX</h3>
          <h2>Busca tu mercado cerca, sube un nuevo lugar.</h2>
        </div>
      </div>
  );

}
