import React from "react";
import StudentTextBoxes from "./StudentTextBoxes";
import "./styles/EditStudentModal.css";

const EditStudentModal = ({
  values,
  onChange,
  onSave,
  onClose,
  loading
}) => (
  <div className="student-modal-overlay" onClick={onClose}>
    <div className="student-modal" onClick={e => e.stopPropagation()}>
      <h2>Editar Estudiante</h2>
      <StudentTextBoxes values={values} onChange={onChange} />
      <button
        className="save-student-btn"
        onClick={onSave}
        disabled={loading}
      >
        Guardar Cambios
      </button>
      <button className="close-modal-btn" onClick={onClose}>
        Cancelar
      </button>
    </div>
  </div>
);

export default EditStudentModal;