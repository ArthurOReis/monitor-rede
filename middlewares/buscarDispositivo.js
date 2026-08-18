import { dispositivos } from "../data/dispositivos.js";

function buscarDispositivo(req, res, next) {
    const id = Number(req.params.id);
    const dispositivo = dispositivos.find((d) => d.id === id);

    if (!dispositivo){
        return res.status(404).json({ erro: "Dispositivo não encontrado" });
    }

    req.dispositivo = dispositivo;
    next();
}

export default buscarDispositivo;