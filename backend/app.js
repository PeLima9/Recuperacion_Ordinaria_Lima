//Imports
import express from "express";
import cors from "cors";

//Routes
import studentsRoutes from "./src/routes/students.js";

//Express
const app = express();

//Json Middleware
app.use(express.json());
app.use(cors());

//Define Routes
app.use("/api/students", studentsRoutes);

//Export
export default app;