import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const useAddStudentModal = (reloadStudents, setShowModal) => {
  const [formValues, setFormValues] = useState({
    carnet: "",
    nombre: "",
    apellido: "",
    grado: "",
    estado: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = async () => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      setFormValues({
        carnet: "",
        nombre: "",
        apellido: "",
        grado: "",
        estado: "",
      });
      setShowModal(false);
      reloadStudents();
    } catch (err) {
      // Manejo de error opcional
    }
    setLoading(false);
  };

  return {
    formValues,
    setFormValues,
    handleInputChange,
    handleAddStudent,
    loading,
  };
};

export default useAddStudentModal;