# Morveth Bot Base

![Morveth Banner](https://uploads.speedhostingg.cloud/uploads/lvcZXjY1P5.jpg)

> Uma base modular para criação de bots de WhatsApp, organizada para estudos, tutoriais e desenvolvimento de comandos de forma simples, limpa e escalável.

---

## Sobre o Projeto

A **Morveth Bot Base** foi criada com foco em organização, aprendizado e facilidade de manutenção.

A proposta da base é separar os comandos por arquivos e categorias, evitando aquele código gigante cheio de `case` dentro do `index.js`.

---

## Estrutura de Pastas

```bash
├── commands
│   ├── adm
│   ├── owner
│   ├── vip
│   ├── menu.js
│   └── template.js
│
├── files
│   ├── audio
│   ├── database
│   ├── images
│   ├── utils
│   └── video
│
├── index.js
├── owner
│   └── config.json
├── package.json
└── start.sh
```

---

## Criando um Comando

```js
const {
  prefix
} = require("../owner/config.json");

module.exports = {
  nome: "NOME",
  descricao: "DESCRIÇÃO",
  comandos: ["comando", "comando2"],
  uso: `${prefix}comando`,

  handle: async ({ reply }) => {
    reply("Funcionando!");
  },
};
```

---

## Funções Disponíveis

```
files, msg, fotomenu, morveth, client, baileys,
fetchJson, getBuffer, getFileBuffer,
enviar, escrever, reagir, reply,
enviarImg, enviarImg2,
enviarGif, enviarGif2,
enviarVd, enviarVd2,
enviarAd, enviarAd2,
data, hora, esperar,
selo, info, args, q, text, body, type,
sender, sender2, from,
groupMembers, metadata,
numeroBot, owner, menc, pushname,
isdono, isAdm, isGroup,
Dispositivo, isQuotedImage,
uptimeBot
```

---

## Configuração

```json
{
  "prefix": "!",
  "botName": "Morveth",
  "ownerName": "Pedrozz Mods",
  "ownerJid": ["559999999999@s.whatsapp.net"],
  "ownerLid": ["559999999999@lid"],
  "Link": "https://wa.me/559999999999"
}
```

---

## Instalação

```bash
npm install
```

---

## Inicialização

```bash
node index.js
```

ou

```bash
bash start.sh
```

---

## Autor

Pedrozz Mods
