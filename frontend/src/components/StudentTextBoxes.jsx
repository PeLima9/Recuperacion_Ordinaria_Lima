import React from "react";

const StudentTextBoxes = ({ values, onChange }) => (
  <div className="student-textboxes">
    <input
      type="text"
      name="carnet"
      placeholder="Carnet"
      value={values.carnet}
      onChange={onChange}
    />
    <input
      type="text"
      name="nombre"
      placeholder="Nombre"
      value={values.nombre}
      onChange={onChange}
    />
    <input
      type="text"
      name="apellido"
      placeholder="Apellido"
      value={values.apellido}
      onChange={onChange}
    />
    <input
      type="text"
      name="grado"
      placeholder="Grado"
      value={values.grado}
      onChange={onChange}
    />
    <input
      type="text"
      name="estado"
      placeholder="Estado"
      value={values.estado}
      onChange={onChange}
    />
  </div>
);

export default StudentTextBoxes;