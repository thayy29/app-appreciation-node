import express, { response } from "express";

//atua nas rotas 
const app = express();

/**
 * GET    => Buscar uma informação
 * POST   => Inserir (Criar) uma informação
 * PUT    => Alterar uma informação
 * DELETE => Remover um dado
 * PATCH  => Alterar uma informação específica (alterar o avatar do usuário)
 */


//rotas
app.get("/teste", (request, response)=> {
  //Request => Entrando
  //Response => Saindo
  return response.send("Olá mundo")
})

app.post("/teste-post", (request, response) => {
  return response.send("Olá mundo post")
})



// iniciando o servidor
app.listen(3000, () => console.log("Server is running")); 


