//Imports
import app from "./app.js";
import "./database.js";
import {config} from "./src/config.js";

//Run Server
async function main() {
    app.listen(config.server.PORT);
    console.log("Server on Port: " + config.server.PORT);
}   

//Run App
main();