import React from "react";
import "./styles/DeleteStudentModal.css";

const DeleteStudentModal = ({
  student,
  onDelete,
  onClose,
  loading
}) => (
  <div className="student-modal-overlay" onClick={onClose}>
    <div className="student-modal" onClick={e => e.stopPropagation()}>
      <h2>Eliminar Estudiante</h2>
      <p>
        ¿Estás seguro que deseas eliminar al siguiente estudiante?<br />
        <b>{student.nombre} {student.apellido}</b><br />
        <span className="student-code">Carnet: {student.carnet}</span>
      </p>
      <button
        className="delete-student-btn"
        onClick={() => onDelete(student._id)}
        disabled={loading}
      >
        Eliminar
      </button>
      <button className="close-modal-btn" onClick={onClose}>
        Cancelar
      </button>
    </div>
  </div>
);

export default DeleteStudentModal;