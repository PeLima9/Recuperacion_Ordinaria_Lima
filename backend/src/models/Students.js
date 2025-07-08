/*
    Fields:
        carnet
        nombre
        apellido
        grado
        estado
*/

//Imports
import {Schema, model} from "mongoose";

//Schema
const studentSchema = new Schema({
    carnet: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    grado: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: true
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Students", studentSchema);