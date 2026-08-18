import express from "express"; // Importa a biblioteca express com funcionalidades de criar rotas e requisições HTTP

const app = express(); // Objeto principal para gerar rotas, middlewares ligar o servidor
const PORTA = 3600; // Número da PORTA onde o servidor vai escutar as requisições

app.use(express.json()); // Middleware que roda em toda requisição antes de chegar na rota final

let dispositivos = [
    { 
        id: 1, 
        nome: "Roteador Sala Técnica", 
        tipo: "roteador", 
        status: "offline", 
        ipAddress: "192.168.0.1" 
    },
    { 
        id: 2, 
        nome: "Antena Setor Norte", 
        tipo: "antena", 
        status: "offline", 
        ipAddress: "192.168.0.2" 
    },
]; // Array para armazenar localmente os dispositivos registrados

app.get("/", (req, res) => {
    res.send("Servidor de monitoramento de rede rodando");
}); // Resposta do servidor ao fazer a requisição GET para o endereço raíz

app.get("/dispositivos", (req, res) => {
    res.json(dispositivos);
}); // Retorna todos os dispositivos registrados no servidor

app.get("/dispositivos/:id", (req, res) => {
    const id = Number(req.params.id);
    const dispositivo = dispositivos.find((d) => d.id === id);

    if (!dispositivo){
        return res.status(404).json({ erro: "Dispositivo não encontrado" });
    }

    res.json(dispositivo);
}); // Retorna o dispositivo de id igual ao parâmetro

app.post("/dispositivos", (req, res) => {
    const { nome, tipo, status, ipAddress } = req.body;

    if(!nome || !tipo || !ipAddress) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, tipo, ipAddress" });
    };

    const novoId = dispositivos.length > 0 
    ? Math.max(...dispositivos.map((d) => d.id)) + 1
    : 1;

    const novoDispositivo = {
        id: novoId,
        nome: nome,
        tipo: tipo,
        status: status || "offline",
        ipAdress: ipAddress
    };

    dispositivos.push(novoDispositivo);

    res.status(201).json(novoDispositivo);
}); // Registra novo dispositivo

app.put("/dispositivos/:id", (req, res) => {
    const id = Number(req.params.id);
    const dispositivo = dispositivos.find((d) => d.id === id);

    if (!dispositivo){
        return res.status(404).json({ erro: "Dispositivo não encontrado" });
    }

    const { status } = req.body;

    if(!status) {
        return res.status(400).json({ erro: "Campo obrigatório: status" });
    };

    if(status !== "online" && status !== "offline") {
        return res.status(400).json({ erro: "Valor inválido" });
    };

    dispositivo.status = status;
    
    res.status(200).json(dispositivo);

}); // Atualiza o status de um dispositivo específico

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
}); // Permite com que o servidor receba e responda requisições