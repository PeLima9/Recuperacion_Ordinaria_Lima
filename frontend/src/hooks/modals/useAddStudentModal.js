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
  const [error, setError] = useState("");

  //Only numbers [8 character max]
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "carnet") {
      if (value && (!/^\d*$/.test(value) || value.length > 8)) {
        return;
      }
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddStudent = async () => {
    setError("");
    // Validaciones
    if (!formValues.carnet) {
      setError("El carnet es obligatorio.");
      return;
    }
    if (!/^\d+$/.test(formValues.carnet)) {
      setError("El carnet solo debe contener números.");
      return;
    }
    if (formValues.carnet.length > 8) {
      setError("El carnet no debe tener más de 8 dígitos.");
      return;
    }
    if (!formValues.nombre) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!formValues.grado) {
      setError("El grado es obligatorio.");
      return;
    }
    if (!formValues.estado) {
      setError("El estado es obligatorio.");
      return;
    }

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
      setError("Error al agregar estudiante.");
    }
    setLoading(false);
  };

  return {
    formValues,
    setFormValues,
    handleInputChange,
    handleAddStudent,
    loading,
    error,
    setError,
  };
};

export default useAddStudentModal;