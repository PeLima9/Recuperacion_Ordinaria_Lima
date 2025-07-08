import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const AuthContext = createContext();
const API_URL = "http://localhost:4000/api";

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (userData) => setUser(userData);

  // Función para cerrar sesión
  const logout = () => setUser(null);

  // Función para obtener estudiantes
  const fetchStudents = async () => {
    const res = await fetch(`${API_URL}/students`);
    if (!res.ok) throw new Error("Error al cargar los estudiantes");
    return res.json();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchStudents }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);