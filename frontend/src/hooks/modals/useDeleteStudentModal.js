import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const useDeleteStudentModal = (reloadStudents, setDeleteModalOpen) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteStudent = async (studentId) => {
    setDeleteLoading(true);
    try {
      await fetch(`${API_URL}/students/${studentId}`, {
        method: "DELETE",
      });
      setDeleteModalOpen(false);
      reloadStudents();
    } catch (err) {
      // Manejo de error opcional
    }
    setDeleteLoading(false);
  };

  return {
    handleDeleteStudent,
    deleteLoading,
  };
};

export default useDeleteStudentModal;