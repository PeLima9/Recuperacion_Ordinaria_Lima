//Imports
import studentsModel from "../models/Students.js";

//Array
const studentsController = {};

//Select - Get [All]
studentsController.getStudents = async (req, res) => {
    try {
        const students = await studentsModel.find();
        res.status(200).json(students);
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving sales data:", error);
    }
};

//Select - Get [by ID]
studentsController.getStudentById = async (req, res) => {
    try {
        const student = await studentsModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving student by ID:", error);
    }
};

//Insert - Post
studentsController.createStudent = async (req, res) => {
    try {
        const {carnet, nombre, apellido, grado, estado} = req.body;

        if (!carnet || !nombre || !apellido || !grado || !estado) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newStudent = await new studentsModel({carnet, nombre, apellido, grado, estado});
        await newStudent.save();

        //Confirm
        res.status(201).json({message: "Student created successfully"});
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error creating student:", error);
    }
};

//Update - Put
studentsController.updateStudent = async (req, res) => {
    try {
        const {carnet, nombre, apellido, grado, estado} = req.body;
        
        await studentsModel.findByIdAndUpdate(
            req.params.id,
            { carnet, nombre, apellido, grado, estado },
            { new: true }
        );

        res.status(200).json("Student updated successfully");
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error updating student:", error);
    }
};

//Delete
studentsController.deleteStudent = async (req, res) => {
    try {
        await studentsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error deleting student:", error);
    };
};

//Active Count
studentsController.getActiveCount = async (req, res) => {
    try {
        const result = await studentsModel.aggregate(
            [
                {
                    $match: { 
                        estado: "Activo" 
                    }
                },

                {
                    $group: {
                        _id: "$estado",
                        count: { $sum: 1 }
                    }
                },

                {
                    $sort: { 
                        count: -1 
                    }
                }
            ]
        );
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving active student count:", error);
    }
};

//Innactive Count
studentsController.getInactiveCount = async (req, res) => {
    try {
        const result = await studentsModel.aggregate(
            [
                {
                    $match: { 
                        estado: "Inactivo" 
                    }
                },

                {
                    $group: {
                        _id: "$estado",
                        count: { $sum: 1 }
                    }
                },

                {
                    $sort: { 
                        count: -1 
                    }
                }
            ]
        );
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error retrieving active student count:", error);
    }
};


//Export
export default studentsController;