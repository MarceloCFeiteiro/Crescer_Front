# 🚀 Desafio QA – Automação E2E (Front + Back)
### *Hat Store – Fluxo Completo de Compra com Cupom*

---

## 🎯 Objetivo

Automatizar o fluxo completo de **cadastro, login e compra com cupom de desconto**, integrando **testes de interface (Playwright)** e **validações de API (REST)**.

---

## 🧩 Cenário do Desafio

1. O usuário **acessa a loja** (frontend).  
2. **Cria uma nova conta** com email e senha (POST `/auth/register`).  
3. Faz **login** e obtém o **token JWT** (POST `/auth/login`).  
4. **Lista os produtos disponíveis** (GET `/hats`).  
5. Adiciona um item ao **carrinho** (POST `/cart/add`).  
6. Vai até o **checkout** e preenche os dados pessoais.  
7. Aplica o **cupom HATOFF** (20% de desconto no primeiro pedido).  
8. Escolhe o **pagamento via PIX** e finaliza a compra.  
9. Valida o **registro do pedido** via API (POST `/pedido`).  
10. Confirma que o pedido aparece na **consulta de pedidos** (GET `/pedido?cpf=...`).  

---

## ⚙️ Requisitos Técnicos

| Área | Ferramenta | Objetivo |
|------|-------------|-----------|
| **Frontend** | Playwright | Automatizar fluxo visual e interações |
| **Backend** | API REST (Swagger `https://hatstore-prd.fly.dev/swagger/index.html`) | Validar respostas, tokens e regras de negócio |
| **Linguagem** | JavaScript ou TypeScript | Implementação dos testes |
| **Dados** | Faker PT-BR | Gerar usuários e endereços dinâmicos |
| **Documentação** | README e comentários no código | Explicar decisões de teste |

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
- Validação de regra: **cupom só é aceito uma vez por CPF**;
- Confirmação do pedido via GET `/pedido`.

---

## 🧠 Extras (para quem quiser ir além)

- Criar fixtures para gerar usuários dinâmicos automaticamente;  
- Reutilizar o token JWT do login para validar APIs protegidas;  
- Fazer screenshot final do comprovante PIX;  
- Criar logs e prints automáticos em caso de falha.

---

## 🧪 Critérios de Avaliação

| Critério | Peso |
|-----------|------|
| Cobertura do fluxo E2E (front + back) | ⭐⭐⭐⭐ |
| Clareza e estrutura do código | ⭐⭐⭐ |
| Boas práticas e reutilização (POM, fixtures, asserts) | ⭐⭐⭐ |
| Documentação e explicações no README | ⭐⭐ |
| Criatividade e automações extras | ⭐ |

---

## 💬 Entrega Esperada

📦 Um repositório com:
- `/tests/` → scripts Playwright + API;  
- `/pages/` → page objects reutilizáveis;  
- `/api/` → requests e validações backend;  
- `/docs/` → documentação e guia de aprendizado;  
- `README.md` → instruções para execução, objetivos e aprendizados.  

---

## 🏁 Desafio Bônus

Crie um teste negativo validando que:
- O mesmo CPF **não consegue usar o cupom HATOFF duas vezes** (validação de negócio).  

💡 *Dica:* esse fluxo pode começar simulando as APIs com o Swagger e depois validar o mesmo fluxo visualmente no frontend (autenticação + compra).

---

## 🧩 Etapa Extra: Regras de Negócio do Cadastro (Front + API)

### 🎯 Objetivo
Testar e automatizar as principais **regras de negócio do cadastro de usuários**, começando pela **escrita dos cenários em Gherkin** e depois implementando os testes com **Playwright + chamadas HTTP**.

---

## ✍️ Parte 1 – Escrita dos Cenários (Gherkin)

Cada QA deve escrever seus cenários em **Gherkin**, representando as regras de negócio do endpoint `/auth/register`.

### 📋 Exemplo de Estrutura
```
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

### 💡 Boas práticas para Gherkin
- **Evite detalhes técnicos** → descreva o comportamento, não o código.  
- **Cada cenário testa uma regra.**  
- **Dado / Quando / Então** devem ser curtos e claros.  
- Use linguagem **natural e consistente** (português BR).  

---

## 💻 Parte 2 – Automação dos Cenários

Depois de escrever os cenários, os QAs devem implementá-los em testes Playwright + API.

### 🧠 Sugestão técnica
Crie um novo arquivo:

```
tests/api/register.spec.js
```

E utilize requisições diretas para validar cada regra:

```javascript
import { test, expect } from '@playwright/test';

test.describe('Cadastro de Usuário - Regras de Negócio', () => {

  test('Cadastro bem-sucedido', async ({ request }) => {
    const response = await request.post('https://hatstore-prd.fly.dev/api/auth/register', {
      data: { email: 'usuario@teste.com', password: '123456' }
    });
    expect(response.status()).toBe(201);
  });

  test('E-mail duplicado', async ({ request }) => {
    const email = 'duplicado@teste.com';
    await request.post('https://hatstore-prd.fly.dev/api/auth/register', { data: { email, password: '123456' } });
    const duplicate = await request.post('https://hatstore-prd.fly.dev/api/auth/register', { data: { email, password: '123456' } });
    expect(duplicate.status()).toBe(409);
  });
});
```

---

## 🔗 Conexão com o Frontend
Depois que as regras de negócio da API estiverem validadas, o QA deve:
1. Reproduzir o mesmo fluxo via **interface** (preenchendo o formulário de cadastro).  
2. Validar se as mensagens de erro exibidas ao usuário são coerentes com as respostas da API.  

---

## 🧩 Aprendizados Esperados

- Pensar como **usuário e negócio** antes do código;  
- Escrever **cenários BDD claros** e organizados;  
- Traduzir **Gherkin → automação**;  
- Integrar frontend e backend num mesmo fluxo;  
- Validar **mensagens e status HTTP** de forma assertiva.

---

🎓 *Desafio oficial do Programa Crescer – Automação de Testes Front + Back (Hat Store)*
