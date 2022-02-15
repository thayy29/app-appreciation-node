import "reflect-metadata";
import "reflect-metadata";
import express from "express";

import { router } from "../src/routes";

import "./database";

//atua nas rotas 
const app = express();

app.use(express.json())

app.use(router);
// iniciando o servidor
app.listen(3000, () => console.log("Server is running")); 


