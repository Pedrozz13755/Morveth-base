const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const baileys = require("baileys");

//=========== CORES ===========\\
const cor = {
titulo: chalk.hex("#c77dff").bold,
roxo: chalk.hex("#9d4edd"),
roxoClaro: chalk.hex("#e0aaff"),
roxoEscuro: chalk.hex("#7b2cbf"),
sucesso: chalk.hex("#b517ff").bold,
aviso: chalk.hex("#c77dff").bold,
erro: chalk.hex("#ff4d6d").bold,
cinza: chalk.hex("#b8b8b8"),
branco: chalk.white.bold
};

function logBox(titulo, texto) {
  console.log(`${cor.titulo(titulo)} - ${cor.roxoClaro(texto)}`);
}

//=========== DATA / HORA ===========\\
function getDataHora() {
const date = new Date();

return {
data: new Intl.DateTimeFormat("pt-BR").format(date),
hora: date.toLocaleTimeString("pt-BR", { hour12: false })
};
}

function formatTime(seconds) {
const h = Math.floor(seconds / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);

return `${h}h ${m}m ${s}s`;
}

//=========== FUNÇÕES ÚTEIS ===========\\
function limparNumero(numero) {
return String(numero || "").replace(/[^0-9]/g, "");
}

async function fetchJson(url, options = {}) {
try {
const res = await axios({
method: "GET",
url,
headers: {
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
},
...options
});

return res.data;
} catch (err) {
return err;
}
}

async function getBuffer(url, options = {}) {
const res = await axios({
method: "GET",
url,
headers: {
DNT: 1,
"Upgrade-Insecure-Request": 1
},
responseType: "arraybuffer",
...options
});

return res.data;
}

async function getFileBuffer(mediakey, mediaType) {
const stream = await baileys.downloadContentFromMessage(mediakey, mediaType);
let buffer = Buffer.from([]);

for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}

return buffer;
}

//=========== CACHE DE METADATA ===========\\
const metaCache = new Map();
async function getMetaCached(client, jid) {
const now = Date.now();
const cached = metaCache.get(jid);

if (cached && now - cached.time < 5 * 60 * 1000) {
return cached.data;
}

const data = await client.groupMetadata(jid);
metaCache.set(jid, { time: now, data });

return data;
}

setInterval(() => { metaCache.clear(); }, 5 * 60 * 1000);

//=========== PEGAR TEXTO ===========\\
function getBody(info) {
const msg = info.message || {};

return (msg.conversation || msg.extendedTextMessage?.text || msg.imageMessage?.caption || msg.videoMessage?.caption || msg.documentMessage?.caption || "" );
}

function getTipoMensagem(type) {
const tipos = {
conversation: "Texto",
extendedTextMessage: "Texto",
audioMessage: "Áudio",
stickerMessage: "Figurinha",
imageMessage: "Imagem",
videoMessage: "Vídeo",
documentMessage: "Documento",
contactMessage: "Contato",
locationMessage: "Localização"
};
return tipos[type] || "Desconhecido";
}

//=========== MENSAGENS RÁPIDAS ===========\\
const msg = {
espera: "- *Não me apresse.*\n> Meu poder não se curva à sua ansiedade... aguarde.",
owner: "- *Você ousa tocar no que não te pertence...*\n> Este comando responde apenas ao meu mestre — e você não é ele.",
query: "- *Eu vasculhei o vazio por você...*\n> Mas não havia nada digno de ser encontrado.",
adm: "- *Você ainda não carrega autoridade suficiente...*\n> Apenas meus generais podem usar este comando.",
admBot: "- *Quer que eu aja... mas me mantém acorrentada.*\n> Conceda-me poder como administradora — ou não me peça nada.",
vip: "- *Esse poder não é para qualquer um...*\n> Somente os escolhidos caminham por esse caminho — e você ainda não foi chamado."
};
//=>Export
module.exports = { cor, logBox, getDataHora, formatTime, limparNumero, fetchJson, getBuffer, getFileBuffer, getMetaCached, getBody, getTipoMensagem, msg }