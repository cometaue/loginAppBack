import express from "express";
import router from "./routes/auth.js";
import cors from "cors";
import { dbConnection } from "./db/config.js";
import dotenv from "dotenv/config";

const _PORT = parseInt(process.env.PORT);
//Crear el servidor de express

const app = express();
// Coneccion base de datos
dbConnection();
// Directorio public
app.use(express.static("public"));
//CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

app.use("/api/auth", router);

app.listen(_PORT, () => console.log(`servidor run on port ${_PORT}`));
