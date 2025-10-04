

<div align="center">
 <img width="100" height="100" alt="bot" src="https://github.com/user-attachments/assets/b9c24716-81e7-411d-9ddf-6e416e7c061e" />
 <h1><b>Beatmap-bot</b></h1>
</div>

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-v20+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-✔-blue)
![Redis](https://img.shields.io/badge/Redis-enabled-red)
![Docker](https://img.shields.io/badge/Docker-supported-blue)

---

## 📖 Descrição

**beatmap-bot** é um bot do Discord que utiliza a **API do osu!** para retornar informações de **usuários** e **beatmaps** diretamente no Discord.  
O bot possui dois comandos principais:

- `/user` → mostra informações detalhadas de um jogador do osu  
- `/beatmap` → exibe informações sobre um música/beatmap específico  

---

## ⚙️ Instalação e Execução

### 🔧 Pré-requisitos
- Node.js v20+
- Redis instalado ou em container
- Docker (opcional)

### 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/DiegoArauj0/beatmap-bot.git

# Entre na pasta
cd beatmap-bot

# Instale as dependências
npm install
```

---

## 🚀 Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm start

```

---

## 🐳 Executando com Docker

### 🧩 Docker compose

```bash
docker compose up
```

### 🏗️ Criar imagem manualmente

```bash
docker build -t beatmap-bot -f dockerfile.Production .
```
---

## ⚙️ Arquivo .env (ou .env.example)

Você pode usar o arquivo .env.example como base e renomeá-lo para:

- .env.development.local → para ambiente de desenvolvimento
- .env.production.local → para ambiente de produção

