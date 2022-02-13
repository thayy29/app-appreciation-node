import "reflect-metadata";
import express from "express";

import "./database";

//atua nas rotas 
const app = express();

//rotas
// iniciando o servidor
app.listen(3000, () => console.log("Server is running")); 


