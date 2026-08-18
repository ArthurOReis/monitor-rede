import { dispositivos } from "../data/dispositivos.js";

function registrarDispositivo(req, res, next) {
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
    req.dispositivo = novoDispositivo;
    next();
}

export default registrarDispositivo;