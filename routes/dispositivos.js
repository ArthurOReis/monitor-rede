import express from "express";
import buscarDispositivo from "../middlewares/buscarDispositivo.js";
import registrarDispositivo from "../middlewares/registrarDispositivo.js";
import { dispositivos } from "../data/dispositivos.js";
const router = express.Router();

router.get("/", (req, res) => {
    const status = req.query.status;
    const tipo = req.query.tipo;
    let resultado = dispositivos;

    if (status && tipo) {
        resultado = dispositivos.filter((d) => d.status === status && d.tipo === tipo);
    } else if (status) {
        resultado = dispositivos.filter((d) => d.status === status);
    } else if (tipo) {
        resultado = dispositivos.filter((d) => d.tipo === tipo);
    }

    res.json(resultado);
}); // Retorna todos os dispositivos registrados no servidor

router.get("/resumo", (req, res) => {
    const quantidadeDispositivos = dispositivos.length;
    const dispositivosOnline = dispositivos.filter((d) => d.status === "online").length;
    const dispositivosOffline = dispositivos.filter((d) => d.status === "offline").length;

    res.json({
        total: quantidadeDispositivos,
        online: dispositivosOnline,
        offline: dispositivosOffline,
    });
});

router.get("/:id", buscarDispositivo, (req, res) => {
    res.json(req.dispositivo);
}); // Retorna o dispositivo de id igual ao parâmetro

router.post("/", registrarDispositivo, (req, res) => {
    res.status(201).json(req.dispositivo);
}); // Registra novo dispositivo

router.put("/:id", buscarDispositivo, (req, res) => {
    const { status } = req.body;

    if(!status) {
        return res.status(400).json({ erro: "Campo obrigatório: status" });
    };

    if(status !== "online" && status !== "offline") {
        return res.status(400).json({ erro: "Valor inválido" });
    };

    req.dispositivo.status = status;
    
    res.status(200).json(req.dispositivo);

}); // Atualiza o status de um dispositivo específico

router.delete("/:id", buscarDispositivo, (req, res) => {
    const indice = dispositivos.findIndex((d) => d.id === req.dispositivo.id)

    dispositivos.splice(indice, 1);

    res.status(200).json({ sistema: "Dispositivo removido com sucesso!" });
}); // Deleta um dispositivo específico

export default router;