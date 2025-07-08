//Imports
import mongoose from "mongoose";

import {config} from "./src/config.js";

//Mongoose Connection
mongoose.connect(config.db.URI);

//DB Validation
const connection = mongoose.connection;

//Debbugging
connection.once("open", () => {
    console.log("DB Is Connected");
});
connection.on("disconnected", () => {
    console.log("DB Is Disconnected");
});
connection.on("error", (error) => {
    console.log("Error Found: " + error);
}); 