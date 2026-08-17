import express from "express"; // Importa a biblioteca express com funcionalidades de criar rotas e requisições HTTP

const app = express(); // Objeto principal para gerar rotas, middlewares ligar o servidor
const PORTA = 3600; // Número da PORTA onde o servidor vai escutar as requisições

app.use(express.json()); // Middleware que roda em toda requisição antes de chegar na rota final

let dispositivos = [
    { id: 1, nome: "Roteador Sala Técnica", tipo: "roteador", status: "offline", ipAddress: "192.168.0.1" },
    { id: 2, nome: "Antena Setor Norte", tipo: "antena", status: "offline", ipAddress: "192.168.0.2" },
]; // Array para armazenar localmente os dispositivos registrados

app.get("/", (req, res) => {
    res.send("Servidor de monitoramento de rede rodando");
}); // Resposta do servidor ao fazer a requisição GET para o endereço raíz

app.get("/dispositivos", (req, res) => {
    res.json(dispositivos);
}); // Retorna todos os dispositivos registrados no servidor

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
}); // Permite com que o servidor receba e responda requisições