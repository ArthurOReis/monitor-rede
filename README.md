# Monitor de Rede — API

## Objetivo

Servidor que utiliza API REST para gestão de dispositivos de rede (roteadores, antenas, switches), criada com objetivo de estudar Node.js e Express.js.

## Como instalar o projeto

1. Clona o repositório do projeto monitor de rede:
```bash
git clone https://github.com/ArthurOReis/monitor-rede
```

2. Ao acessar a pasta do projeto, instale as dependências e em seguida execute o arquivo principal
```bash
cd monitor-rede
npm install
node index.js
```

O servidor local opera na porta 3600, `http://localhost:3600`.

## Rotas e requisições 

| Requisição | Rota                  | Descrição                              |
|--------|------------------------|-----------------------------------------|
| GET    | `/`                     | Verifica se o servidor está online     |
| GET    | `/dispositivos`         | Lista todos os dispositivos             |
| GET    | `/dispositivos/:id`     | Busca um dispositivo específico         |
| POST   | `/dispositivos`         | Registra um novo dispositivo            |
| PUT    | `/dispositivos/:id`     | Atualiza o status de um dispositivo     |
| DELETE | `/dispositivos/:id`     | Remove um dispositivo                   |

## Estrutura dos dispositivos

Os dispositivos que são registrados no sistema ficam no formato:

```json
{
  "id": <id>,
  "nome": <nome>,
  "tipo": <tipo>,
  "status": "online"/"offline",
  "ipAddress": <ipAddress>
}
```

E para registrar um novo dispositivo, basta inserir os dados no formato body JSON do exemplo abaixo:

```json
{
  "nome": "Switch Sala Leste",
  "tipo": "switch",
  "ipAddress": "192.168.0.3"
}
```

E para mudar o status de um dispositivo, basta selecionar o dispositivo, `http://localhost:3600/dispositivos/<id>`, e colocar o status do objeto:

```json
{
    "status": "online"
}
```

Se houver alguma falha ao tentar manipular um dispositivo, será retornado um dos erros:

```json
{
  "erro": "Dispositivo não encontrado"
}
```

```json
{
  "erro": "Valor inválido"
}
```

```json
{
  "erro": "Campos obrigatórios: nome, tipo, ipAddress"
}
```

## Filtros de listagem

a rota `GET /dispositivos` tem a opção de filtrar status e tipos de dispositivos através de query params:

| Parâmetro | Valores aceitos   | Exemplo                    |
|--------|------------------------|-----------------------------------------|
| `status`    | `online`, `offline`   | `dispositivos?status=offline`     |
| `tipo`    | qualqer string          | `dispositivos?tipo=antena`                 |

## Escopo raíz do monitor de rede

```
monitor-rede/
├── index.js
├── data/
│   └── dispositivos.js
├── routes/
│   └── dispositivos.js
└── middlewares/
    ├── buscarDispositivo.js
    └── registrarDispositivo.js
```