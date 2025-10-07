# 🧢 Hat Store Front — Automação com Playwright

> Projeto de automação de testes end-to-end (E2E) e regressão visual da loja fictícia **Hat Store**, desenvolvido para fins educacionais e de prática em automação de testes frontend.

---

## 🚀 Visão Geral

Este projeto utiliza o **Playwright** para automatizar fluxos reais de uma loja virtual:
- Busca e compra de chapéus 🧢  
- Login e autenticação 🔐  
- Checkout com validação de dados e pagamento 💳  
- Regressão visual das páginas principais 👁️  

Foi desenvolvido como material de **aprendizado para QAs iniciantes**, com arquitetura organizada e testes que simulam o comportamento do usuário final.

---

## 🧩 Stack Utilizada

- **Playwright** → automação de interface e testes visuais  
- **Faker PT-BR** → geração de dados dinâmicos de usuário  
- **Node.js** → ambiente de execução  
- **GitHub Actions** → integração contínua dos testes  

---

## 📂 Estrutura do Projeto

```
📂 Crescer_Front
├── .github/
│   └── workflows/
│       └── playwright.yml             → pipeline de execução automática no GitHub Actions
│
├── 📁 fixture/
│   └── hookFixture.js                 → configuração e criação de contexto de teste
│
├── 📁 pages/
│   ├── auth_page.js                   → page object da tela de login
│   ├── checkout_page.js               → page object do checkout
│   └── home_page.js                   → page object da página inicial
│
├── 📁 tests/
│   ├── home.spec.js                   → testes E2E de busca e fluxo de compra
│   ├── visual.spec.js                 → testes de regressão visual (home e login)
│   └── 📁 visual.spec.js-snapshots/   → baseline de imagens comparativas
│       ├── login-chromium-win32.png
│       ├── login-chromium-win32__1.png
│       ├── home-chromium-win32.png
│
├── 📁 docs/
│   └── README_Treinamento_QA.md       → guia didático para QAs iniciantes
│
├── .env.dev                           → variáveis de ambiente
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

---

## 🧠 Cobertura Atual de Testes

| Tipo de Teste | Arquivo | Descrição |
|----------------|----------|------------|
| 🔍 Busca Inexistente | `home.spec.js` | Valida que o sistema exibe mensagem apropriada quando o produto não existe |
| 🧢 Busca Existente | `home.spec.js` | Valida retorno correto de produtos existentes |
| 💳 Compra via PIX | `home.spec.js` | Simula o fluxo completo de compra com login e pagamento via PIX |
| 🔐 Regressão Visual (Login) | `visual.spec.js` | Compara o layout atual da tela de login com o baseline |
| 🏠 Regressão Visual (Home) | `visual.spec.js` | Compara o layout atual da home com o baseline salvo |

---

## 📘 Documentação de Treinamento QA

Para quem deseja aprender mais sobre os testes automatizados deste projeto,  
há uma documentação detalhada explicando **cada cenário**, **suas validações** e **o que o QA iniciante aprende com ele**:

📄 **[Guia de Treinamento QA – Hat Store Front](./docs/README_Treinamento_QA.md)**

> Esse guia é indicado para quem está iniciando em automação de testes com **Playwright**, **JavaScript** e **Padrão Page Object Model (POM)**.  
> Contém explicações didáticas, exemplos, boas práticas e desafios para fixação.

[![Documentação QA](https://img.shields.io/badge/docs-Guia%20de%20Treinamento-blue)](./docs/README_Treinamento_QA.md)

---

## 🔁 Integração Contínua (CI/CD)

O pipeline do projeto é executado automaticamente via **GitHub Actions**, através do arquivo:

```
.github/workflows/playwright.yml
```

Esse fluxo:
1. Instala as dependências do Node.js;  
2. Executa os testes Playwright em modo headless;  
3. Gera o relatório de execução;  
4. Pode ser estendido para upload automático de screenshots e vídeos.

---

## 🧪 Como Executar Localmente

### 1️⃣ Instale as dependências
```bash
npm install
```

### 2️⃣ Execute todos os testes
```bash
npx playwright test
```

### 3️⃣ Execute apenas os testes visuais
```bash
npx playwright test tests/visual.spec.js
```

### 4️⃣ Gere o relatório
```bash
npx playwright show-report
```

---

## 💡 Boas Práticas no Projeto

- Utiliza **Page Object Model (POM)** para melhor organização.  
- Cria dados dinâmicos com **fakerPT_BR**.  
- Mantém **baselines visuais versionados** para rastrear alterações no layout.  
- Integração contínua automatizada para execução a cada *push*.

---

## 👩‍💻 Contribuindo

1. Crie uma branch:
   ```bash
   git checkout -b docs/treinamento-qa
   ```
2. Adicione suas alterações:
   ```bash
   git add .
   ```
3. Faça o commit:
   ```bash
   git commit -m "docs: adiciona guia de treinamento QA"
   ```
4. Envie para o repositório:
   ```bash
   git push origin docs/treinamento-qa
   ```
5. Abra um **Pull Request** no GitHub.

---

## 🧑‍🏫 Autores e Colaboradores

**Marcelo Cardos Feiteiro**  
📧 [linkedin.com/in/marcelo-feiteiro](https://www.linkedin.com/in/marcelo-feiteiro-96a7a4142/)  
💼 Projeto desenvolvido no programa **Crescer** — Automação de testes frontend com foco em qualidade de software.  

**Joelma Prestes Ferreira**  
📧 [linkedin.com/in/joprestes](https://www.linkedin.com/in/joprestes)  
💬 Documentação, revisão técnica e guia de treinamento QA para iniciantes.  

---

## 🏁 Licença

Este projeto é livre para uso educacional e aprendizado, sob a licença MIT.
