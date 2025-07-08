import React from "react";
import StudentTextBoxes from "./StudentTextBoxes";
import "./styles/AddStudentModal.css";

const AddStudentModal = ({
  values,
  onChange,
  onSave,
  onClose,
  loading
}) => (
  <div className="student-modal-overlay" onClick={onClose}>
    <div className="student-modal" onClick={e => e.stopPropagation()}>
      <h2>Agregar Estudiante</h2>
      <StudentTextBoxes values={values} onChange={onChange} />
      <button
        className="save-student-btn"
        onClick={onSave}
        disabled={loading}
      >
        Guardar Estudiante
      </button>
      <button className="close-modal-btn" onClick={onClose}>
        Cancelar
      </button>
    </div>
  </div>
);

export default AddStudentModal;