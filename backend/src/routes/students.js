//Imports
import express from "express";
import studentsController from "../controllers/studentsController.js";

//Router
const router = express.Router();

//Routes
router.route("/")
    .get(studentsController.getStudents)
    .post(studentsController.createStudent);

//Specific Routes
router.route("/activeCount")
    .get(studentsController.getActiveCount);
router.route("/inactiveCount")
    .get(studentsController.getInactiveCount);

router.route("/:id")
    .get(studentsController.getStudentById)
    .put(studentsController.updateStudent)
    .delete(studentsController.deleteStudent);

//Export
export default router;