# 🚀 Desafio QA – Automação E2E (Front + Back)
### *Hat Store – Fluxo Completo de Compra com Cupom*

[![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-green?logo=playwright)](https://playwright.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?logo=node.js)](https://nodejs.org)
[![QA Challenge](https://img.shields.io/badge/QA-Challenge-orange?logo=testing-library)](https://github.com/joprestes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📚 Sumário
- [🎯 Objetivo](#-objetivo)
- [🧩 Cenário do Desafio](#-cenário-do-desafio)
- [⚙️ Requisitos Técnicos](#️-requisitos-técnicos)
- [🔍 Validações Esperadas](#-validações-esperadas)
- [🧠 Extras](#-extras-para-quem-quiser-ir-além)
- [💬 Entrega Esperada](#-entrega-esperada)
- [🏁 Desafio Bônus](#-desafio-bônus)
- [🧩 Etapa Extra – Regras de Negócio do Cadastro (Front + API)](#-etapa-extra--regras-de-negócio-do-cadastro-front--api)
- [✍️ Parte 1 – Escrita dos Cenários (Gherkin)](#️-parte-1--escrita-dos-cenários-gherkin)
- [💻 Parte 2 – Automação dos Cenários](#-parte-2--automação-dos-cenários)
- [🔗 Conexão com o Frontend](#-conexão-com-o-frontend)
- [🧩 Aprendizados Esperados](#-aprendizados-esperados)

---

## 🎯 Objetivo

Automatizar o fluxo completo de **cadastro, login e compra com cupom de desconto**, integrando **testes de interface (Playwright)** e **validações de API (REST)**.  
O desafio visa unir **automação de frontend e backend** em um mesmo projeto, simulando um cenário real de testes end-to-end (E2E).

---

## 🧩 Cenário do Desafio

1. O usuário **acessa a loja** (frontend).  
2. **Cria uma nova conta** com e-mail e senha (POST `/auth/register`).  
3. Faz **login** e obtém o **token JWT** (POST `/auth/login`).  
4. **Lista os produtos disponíveis** (GET `/api/estoque`).  
5. Adiciona um item ao **carrinho** (ação simulada via interface).  
6. Vai até o **checkout** e preenche os dados pessoais.  
7. Aplica o **cupom HATOFF** (20% de desconto no primeiro pedido).  
8. Escolhe o **pagamento via PIX** e finaliza a compra.  
9. Valida o **registro do pedido** via API (POST `/api/pedido`).  
10. Confirma que o pedido aparece na **consulta de pedidos** (GET `/api/pedido?cpf=...`).  

---

## ⚙️ Requisitos Técnicos

| Área | Ferramenta | Objetivo |
|------|-------------|-----------|
| **Frontend** | Playwright | Automatizar o fluxo visual e interações de compra |
| **Backend** | API REST (Swagger: `https://hatstore-prd.fly.dev/swagger/index.html`) | Validar respostas, tokens e regras de negócio |
| **Linguagem** | JavaScript ou TypeScript | Implementação dos testes |
| **Dados** | Faker PT-BR | Gerar usuários e endereços dinâmicos |
| **Documentação** | README e comentários no código | Explicar decisões e aprendizados de teste |

---

## 🔍 Validações Esperadas

### 🧱 Frontend (Playwright)
- Campos obrigatórios do checkout validados;  
- Cupom aplicado com sucesso;  
- Modal de pagamento (PIX) visível com código válido;  
- Redirecionamento correto após finalizar pedido.

### 🔗 Backend (API)
- Registro bem-sucedido de usuário (`201 Created`);  
- Login retorna token JWT válido;  
- Pedido criado e armazenado em memória (`201 Created`);  
- Regra de negócio: **cupom só é aceito uma vez por CPF**;  
- Confirmação do pedido via `GET /api/pedido`.

---

## 🧠 Extras (para quem quiser ir além)

- Criar **fixtures** para geração automática de usuários dinâmicos;  
- Reutilizar o **token JWT** do login nos testes autenticados;  
- Fazer **screenshot final do comprovante PIX**;  
- Criar **logs e prints automáticos** em caso de falha;  
- Executar os testes via **GitHub Actions** para CI/CD.

---

## 💬 Entrega Esperada

📦 O repositório do aluno deve conter:

```
/tests/      → scripts Playwright (UI e API)
/pages/      → page objects reutilizáveis
/api/        → requests e validações backend
/docs/       → documentação e guia de aprendizado
README.md    → instruções, objetivos e aprendizados
```

> 💡 Dica: organize os testes de API e frontend em pastas separadas, mas mantenha tokens e dados dinâmicos integrados no mesmo fluxo.

---

## 🏁 Desafio Bônus

Crie um **teste negativo** validando que:
- O mesmo CPF **não consegue usar o cupom HATOFF duas vezes**.

💬 *Dica:* comece validando essa regra na API (`POST /api/pedido`) e depois simule o mesmo comportamento no frontend.

---

## 🧩 Etapa Extra – Regras de Negócio do Cadastro (Front + API)

### 🎯 Objetivo
Testar e automatizar as principais **regras de negócio do cadastro de usuários**, começando pela **escrita dos cenários em Gherkin** e depois implementando os testes com **Playwright + chamadas HTTP**.

---

## ✍️ Parte 1 – Escrita dos Cenários (Gherkin)

Cada QA deve escrever seus cenários em **Gherkin**, representando as regras de negócio do endpoint `/auth/register`.

### 📋 Exemplo de Estrutura
```gherkin
Funcionalidade: Cadastro de Usuário
  Como um novo cliente
  Quero criar minha conta na Hat Store
  Para poder realizar compras online

  Cenário: Cadastro bem-sucedido
    Dado que eu envio um email e senha válidos
    Quando eu realizo o cadastro
    Então o sistema deve retornar status 201 e mensagem "Usuário criado com sucesso!"

  Cenário: Tentativa de cadastro com e-mail duplicado
    Dado que já existe um usuário com o e-mail "teste@teste.com"
    Quando eu tento cadastrar novamente com o mesmo e-mail
    Então o sistema deve retornar status 409 e mensagem "Usuário já existe"

  Cenário: Cadastro com e-mail inválido
    Dado que eu informo o e-mail "emailinvalido"
    Quando eu tento realizar o cadastro
    Então o sistema deve retornar status 400 e mensagem "Requisição inválida"
```

### 💡 Boas práticas Gherkin
- **Evite detalhes técnicos** → descreva comportamento, não código.  
- Cada cenário deve validar **uma regra de negócio**.  
- Use **português natural** e frases curtas.  
- Mantenha consistência em **Dado / Quando / Então**.

---

## 💻 Parte 2 – Automação dos Cenários

Depois de escrever os cenários, implemente-os com **Playwright (modo API)**.

```javascript
import { test, expect } from '@playwright/test';

test.describe('Cadastro de Usuário - Regras de Negócio', () => {

  test('Cadastro bem-sucedido', async ({ request }) => {
    const response = await request.post('https://hatstore-prd.fly.dev/auth/register', {
      data: { email: 'usuario@teste.com', password: '123456' }
    });
    expect(response.status()).toBe(201);
  });

  test('E-mail duplicado', async ({ request }) => {
    const email = 'duplicado@teste.com';
    await request.post('https://hatstore-prd.fly.dev/auth/register', { data: { email, password: '123456' } });
    const duplicate = await request.post('https://hatstore-prd.fly.dev/auth/register', { data: { email, password: '123456' } });
    expect(duplicate.status()).toBe(409);
  });
});
```

---

## 🔗 Conexão com o Frontend

Após validar as regras da API, o QA deve:
1. Reproduzir o mesmo fluxo via **interface da loja (Playwright UI)**;  
2. Verificar se as mensagens exibidas ao usuário estão **coerentes com as respostas da API**.  

---

## 🧩 Aprendizados Esperados

- Pensar como **usuário e negócio**, não apenas como testador;  
- Escrever **cenários BDD** claros e objetivos;  
- Traduzir **Gherkin → automação real**;  
- Integrar frontend e backend em um único fluxo de testes;  
- Validar **mensagens, status e comportamento** ponta a ponta.

---

🎓 *Desafio oficial do Programa Crescer – Automação de Testes Front + Back (Hat Store)*  
💬 *“Automação não é sobre cliques, é sobre confiança no que entregamos.”*
