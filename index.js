import express from "express"; // Importa a biblioteca express com funcionalidades de criar rotas e requisições HTTP
import dispositivosRouter from "./routes/dispositivos.js";

const app = express(); // Objeto principal para gerar rotas, middlewares ligar o servidor
const PORTA = 3600; // Número da PORTA onde o servidor vai escutar as requisições

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor de monitoramento de rede rodando");
}); // Resposta do servidor ao fazer a requisição GET para o endereço raíz

app.use("/dispositivos", dispositivosRouter); // Todas as rotas de '/dispositivos'

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
}); // Permite com que o servidor receba e responda requisições