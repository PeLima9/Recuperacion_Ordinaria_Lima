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

  const handleEditInputChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditStudent = async () => {
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
      // Puedes manejar errores aquí si lo deseas
    }
    setEditLoading(false);
  };

  return {
    editValues,
    setEditValues,
    handleEditInputChange,
    handleEditStudent,
    editLoading,
  };
};

export default useEditStudentModal;