import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const useDashboard = (initialValues = {
  carnet: "",
  nombre: "",
  apellido: "",
  grado: "",
  estado: "",
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const { fetchStudents } = useAuth();

  // Cargar estudiantes
  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Contadores de activos/inactivos
  const fetchCounts = async () => {
    try {
      const [activeRes, inactiveRes] = await Promise.all([
        fetch(`${API_URL}/students/activeCount`),
        fetch(`${API_URL}/students/inactiveCount`),
      ]);
      const activeData = await activeRes.json();
      const inactiveData = await inactiveRes.json();
      setActiveCount(activeData[0]?.count || 0);
      setInactiveCount(inactiveData[0]?.count || 0);
    } catch {
      setActiveCount(0);
      setInactiveCount(0);
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar estudiante
  const handleAddStudent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (!res.ok) throw new Error("Error al agregar estudiante");
      setFormValues(initialValues);
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return {
    formValues,
    setFormValues,
    students,
    setStudents,
    loading,
    error,
    handleInputChange,
    handleAddStudent,
    loadStudents,
    activeCount,
    inactiveCount,
    fetchCounts,
  };
};

export default useDashboard;