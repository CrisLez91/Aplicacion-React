import React, { useState } from 'react';
import CustomCalendar from './componente-calendario.back.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';



const Calendario = ({ enunciadoPregunta, register, nombreID, unregister, setErrorMapa, errorMapa }) => {
  const [selectedDate, setSelectedDate] = useState(null);
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
    register(nombreID, { value: date.toLocaleDateString() })

    eliminarError(nombreID);

    setDateSelected(true);


  };

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 9999,
      }}>
      <label for="exampleInputEmail1" className="form-label">{enunciadoPregunta}</label>
      <CustomCalendar
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Seleccione una fecha"
      />
      <p>Fecha seleccionada: {selectedDate ? selectedDate.toLocaleDateString() : 'Ninguna'}</p>
    </div>
  );
};

export default Calendario;