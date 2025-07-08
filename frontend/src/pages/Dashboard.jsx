import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDashboard from "../hooks/pages/Dashboard";
import AddStudentModal from "../components/addStudentModal";
import EditStudentModal from "../components/editStudentModal";
import DeleteStudentModal from "../components/deleteStudentModal";
import useEditStudentModal from "../hooks/modals/useEditStudentModal";
import useDeleteStudentModal from "../hooks/modals/useDeleteStudentModal";
import "./styles/Dashboard.css";

const Dashboard = () => {
  const {
    formValues,
    loading,
    error,
    students,
    handleInputChange,
    handleAddStudent,
    loadStudents,
    activeCount,
    inactiveCount,
    fetchCounts,
  } = useDashboard();

  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const {
    editValues,
    handleEditInputChange,
    handleEditStudent,
    setEditValues,
    editLoading,
  } = useEditStudentModal(loadStudents, setEditModalOpen);

  const {
    handleDeleteStudent,
    deleteLoading,
  } = useDeleteStudentModal(loadStudents, setDeleteModalOpen);

  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
    fetchCounts();
  }, []);

  const handleSave = () => {
    handleAddStudent();
    setShowModal(false);
    setTimeout(() => fetchCounts(), 500);
  };

  const closeModal = () => setShowModal(false);

  //Edit Modal Handlers
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditValues({
      carnet: student.carnet,
      nombre: student.nombre,
      apellido: student.apellido,
      grado: student.grado,
      estado: student.estado,
      _id: student._id,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const handleEditSave = () => {
    handleEditStudent();
    setEditModalOpen(false);
    setTimeout(() => fetchCounts(), 500);
  };

  return (
    <div>
      <h1>Alumnos</h1>
      <button className="home-btn" onClick={() => navigate("/")}>
        Volver a Inicio
      </button>
      <div className="add-student-btn-row" style={{ gap: 24 }}>
        <button
          className="add-student-btn"
          onClick={() => setShowModal(true)}
          disabled={loading}
        >
          Agregar Estudiante
        </button>
        <div className="student-counters">
          <span className="counter active">
            Activos: <b>{activeCount}</b>
          </span>
          <span className="counter inactive">
            Inactivos: <b>{inactiveCount}</b>
          </span>
        </div>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table className="students-table">
          <thead>
            <tr>
              <th>Carnet</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Grado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.carnet}</td>
                <td>{student.nombre}</td>
                <td>{student.apellido}</td>
                <td>{student.grado}</td>
                <td>{student.estado}</td>
                <td>
                  <button
                    className="edit-student-btn"
                    onClick={() => openEditModal(student)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-student-btn"
                    onClick={() => {
                      setStudentToDelete(student);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <AddStudentModal
          values={formValues}
          onChange={handleInputChange}
          onSave={handleSave}
          onClose={closeModal}
          loading={loading}
        />
      )}
      {editModalOpen && (
        <EditStudentModal
          values={editValues}
          onChange={handleEditInputChange}
          onSave={handleEditSave}
          onClose={closeEditModal}
          loading={editLoading}
        />
      )}
      {deleteModalOpen && studentToDelete && (
        <DeleteStudentModal
          student={studentToDelete}
          onDelete={handleDeleteStudent}
          onClose={() => setDeleteModalOpen(false)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;