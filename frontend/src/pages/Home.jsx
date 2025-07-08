import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>¡Bienvenido a la Escuelita Marvel!</h1>
      <p>Gestión Estudiantil</p>
      <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
        Ir al Dashboard
      </button>
    </div>
  );
};

export default Home;