import "reflect-metadata";
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";

import { router } from "../src/routes";

import "./database";

//atua nas rotas 
const app = express();

app.use(express.json())

app.use(router);


// Middleware para tratamento de erros
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) =>{
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
)




// iniciando o servidor
app.listen(3000, () => console.log("Server is running")); 


