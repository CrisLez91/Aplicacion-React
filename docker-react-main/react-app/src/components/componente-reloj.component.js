import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reloj = ({ enunciadoPregunta, register, nombreID, unregister, setErrorMapa, errorMapa }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);

  const eliminarError = (clave) => {
    // Crea una copia del objeto de errores
    const nuevoErrorMapa = { ...errorMapa };
    // Elimina la clave del objeto
    delete nuevoErrorMapa[clave];
    // Actualiza el estado con el nuevo objeto sin la clave
    setErrorMapa(nuevoErrorMapa);
  };


  const handleDateChange = date => {

    setSelectedDate(date);
    unregister(nombreID)
    register(nombreID, { value: date })

    eliminarError(nombreID);

    setDateSelected(true);
  };

  return (
    <div>
      <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
      <div
        style={{
          position: 'relative',
          zIndex: 9999,
        }}
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Hora"
          dateFormat="h:mm aa"
        />
      </div>
    </div >
  );
};

export default Reloj;