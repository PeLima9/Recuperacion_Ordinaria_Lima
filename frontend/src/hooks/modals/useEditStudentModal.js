import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const useEditStudentModal = (reloadStudents, setEditModalOpen) => {
  const [editValues, setEditValues] = useState({
    carnet: "",
    nombre: "",
    apellido: "",
    grado: "",
    estado: "",
    _id: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState("");

  //Only numbers [8 character max]
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "carnet") {
      if (value && (!/^\d*$/.test(value) || value.length > 8)) {
        return;
      }
    }
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  const handleEditStudent = async () => {
    setError("");
    // Validaciones
    if (!editValues.carnet) {
      setError("El carnet es obligatorio.");
      return;
    }
    if (!/^\d+$/.test(editValues.carnet)) {
      setError("El carnet solo debe contener números.");
      return;
    }
    if (editValues.carnet.length > 8) {
      setError("El carnet no debe tener más de 8 dígitos.");
      return;
    }
    if (!editValues.nombre) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!editValues.grado) {
      setError("El grado es obligatorio.");
      return;
    }
    if (!editValues.estado) {
      setError("El estado es obligatorio.");
      return;
    }

    setEditLoading(true);
    try {
      await fetch(`${API_URL}/students/${editValues._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
      setEditModalOpen(false);
      reloadStudents();
    } catch (err) {
      setError("Error al editar estudiante.");
    }
    setEditLoading(false);
  };

  return {
    editValues,
    setEditValues,
    handleEditInputChange,
    handleEditStudent,
    editLoading,
    error,
    setError,
  };
};

export default useEditStudentModal;