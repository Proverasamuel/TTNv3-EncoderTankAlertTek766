# 🛰️ Configuração Remota do Sensor Tank Alert TEK 766 via TTN

Este projeto contém um script para enviar comandos downlink ao sensor **Tank Alert TEK 766** através da plataforma **The Things Network (TTN)**, permitindo a alteração remota do intervalo de envio de dados LoRaWAN.

## 📌 Objetivo

Modificar remotamente o tempo de envio dos dados do sensor TEK 766 de **6 horas** para **1 hora**, sem necessidade de acesso físico ao dispositivo.

## ⚙️ Funcionalidade

✅ Envio de **payloads personalizados** para o sensor via **downlink**  
✅ Utilização do TTN (v3) para gerenciamento de dispositivos  
✅ Comunicação segura e bidirecional via LoRaWAN  

## 🧪 Tecnologias Utilizadas

- The Things Network (TTN)
- LoRaWAN
- JavaScript 
- TTN v3
- JSON Payload Formatter

## 📁 Estrutura do Projeto
 encoder-tank-alert-tek766.js # Script principal para envio de payload
├── payloads/
│ └── set-interval-1h.json # Payload exemplo para mudar tempo de envio
      gerador-payload.html
└── README.md # Este arquivo


## 🚀 Como Usar

1. **Clone o repositório:**

```bash
git clone https://github.com/Proverasamuel/TTNv3-EncoderTankAlertTek766.git
cd TTNv3-EncoderTankAlertTek766.git
