import express from "express";
const router = express.Router();
import { dispositivos } from "../data/dispositivos.js";

router.get("/", (req, res) => {
    res.json(dispositivos);
}); // Retorna todos os dispositivos registrados no servidor

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const dispositivo = dispositivos.find((d) => d.id === id);

    if (!dispositivo){
        return res.status(404).json({ erro: "Dispositivo não encontrado" });
    }

    res.json(dispositivo);
}); // Retorna o dispositivo de id igual ao parâmetro

router.post("/", (req, res) => {
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
        ipAddress: ipAddress
    };

    dispositivos.push(novoDispositivo);

    res.status(201).json(novoDispositivo);
}); // Registra novo dispositivo

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = dispositivos.findIndex((d) => d.id === id)

    if (indice === -1){
        return res.status(404).json({ erro: "Dispositivo não encontrado" });
    }

    dispositivos.splice(indice, 1);

    res.status(200).json({ sistema: "Dispositivo removido com sucesso!" });
}); // Deleta um dispositivo específico

export default router;