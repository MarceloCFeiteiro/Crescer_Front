# 📘 Guia de Treinamento QA – Hat Store Front

> Material de apoio para **QAs iniciantes** aprenderem automação de testes frontend utilizando **Playwright** e o padrão **Page Object Model (POM)**, com base no projeto **Hat Store Front**.

---

## 🧭 1. Introdução

Este guia tem como objetivo explicar **cada teste automatizado** existente no projeto Hat Store Front, mostrando o que ele faz, como funciona e o que o QA aprende com ele.

O projeto simula uma loja virtual de chapéus, onde o usuário pode:
- Buscar produtos;
- Fazer login;
- Adicionar chapéus ao carrinho;
- Finalizar compras com pagamento via PIX ou boleto.

Os testes automatizados garantem que todas essas funcionalidades se comportem corretamente.

---

## ⚙️ 2. Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| **Playwright** | Automação de interface e testes visuais |
| **Node.js** | Ambiente de execução |
| **Faker PT-BR** | Geração de dados dinâmicos |
| **GitHub Actions** | Integração contínua dos testes |
| **JavaScript (ES6)** | Linguagem principal dos scripts |

---

## 🧩 3. Conceitos Fundamentais

### 🔹 O que é Automação de Testes Frontend?
É o processo de **simular as ações de um usuário** (como clicar, digitar ou enviar formulários) para garantir que o sistema funciona corretamente.  
Esses testes ajudam a encontrar falhas mais cedo e garantem uma **melhor experiência para o usuário final**.

### 🔹 O que é o Playwright?
O **Playwright** é uma ferramenta moderna de automação de navegadores. Ele permite:
- Executar testes em Chrome, Firefox e Safari;  
- Fazer **capturas de tela e vídeos**;  
- Testar fluxos completos de ponta a ponta (E2E).  

### 🔹 O que é o Page Object Model (POM)?
O **POM** é um padrão de organização de código onde cada página da aplicação tem sua própria classe de ações e seletores.  
Isso facilita a **manutenção e reutilização** de código.

📁 Exemplo no projeto:
```
pages/
 ├── auth_page.js      → Página de login
 ├── checkout_page.js  → Página de checkout
 └── home_page.js      → Página inicial
```

---

## 🧪 4. Explicação dos Testes Automatizados

### 🧠 Estrutura dos Testes

Os testes estão localizados na pasta `/tests` e são divididos por tipo:

| Arquivo | Tipo de Teste | Foco |
|----------|----------------|------|
| `home.spec.js` | Funcional (E2E) | Busca e fluxo completo de compra |
| `visual.spec.js` | Regressão Visual | Comparação de layout (Login e Home) |

---

### 🔍 **Cenário 1: Buscar chapéu inexistente**

**Arquivo:** `home.spec.js`  
**Objetivo:** Validar que o sistema exibe corretamente uma mensagem de erro ao buscar um item que não existe.

#### 🧱 Passos:
1. Abre a página inicial da loja;  
2. Digita “Crocodilo Dundee” no campo de busca;  
3. Valida a mensagem “Nenhum chapéu encontrado”.

#### 💡 O que o QA aprende:
- Como **interagir com campos de busca** e botões;  
- Como **verificar mensagens de feedback**;  
- Importância de validar **comportamentos de erro**.

---

### 🧢 **Cenário 2: Buscar chapéu existente**

**Arquivo:** `home.spec.js`  
**Objetivo:** Garantir que a busca por produtos válidos retorna o resultado correto.

#### 🧱 Passos:
1. Pesquisa o termo “Gaúcho”;  
2. Valida que o produto retornado é exatamente “Chapéu Gaúcho”.

#### 💡 O que o QA aprende:
- Validar elementos dinâmicos;  
- Criar assertivas específicas (`toHaveText`, `toBeVisible`);  
- Evitar falsos positivos com verificações precisas.

---

### 💳 **Cenário 3: Comprar chapéu sem login (fluxo completo via PIX)**

**Arquivo:** `home.spec.js`  
**Objetivo:** Testar o fluxo completo de compra, incluindo login, checkout e pagamento.

#### 🧱 Passos:
1. Adiciona um “Chapéu Floppy” ao carrinho;  
2. Tenta concluir a compra (é redirecionado para login);  
3. Faz login com usuário de teste;  
4. Preenche dados pessoais e endereço;  
5. Escolhe **PIX** como forma de pagamento;  
6. Valida o modal com o código PIX;  
7. Retorna à home.

#### 💡 O que o QA aprende:
- Criar **testes E2E** (de ponta a ponta);  
- Reutilizar page objects;  
- Gerar dados com **faker**;  
- Validar modais e fluxos complexos.  

---

### 🔐 **Cenário 4: Regressão visual da página de login**

**Arquivo:** `visual.spec.js`  
**Objetivo:** Garantir que o layout da tela de login não sofreu alterações inesperadas.

#### 🧱 Passos:
1. Abre a página `/auth.html`;  
2. Valida que os campos “Email”, “Senha” e o botão “Entrar” estão visíveis;  
3. Faz uma captura de tela e compara com o baseline (`login-chromium-win32.png`).

#### 💡 O que o QA aprende:
- Automatizar **validações visuais**;  
- Criar e manter **baselines**;  
- Entender diferenças entre regressão **funcional** e **visual**.

---

### 🏠 **Cenário 5: Regressão visual da home**

**Arquivo:** `visual.spec.js`  
**Objetivo:** Detectar mudanças não intencionais na página inicial.

#### 🧱 Passos:
1. Abre a página principal;  
2. Aguarda o carregamento completo;  
3. Compara com a imagem baseline (`home-chromium-win32.png`).

#### 💡 O que o QA aprende:
- Como criar baselines múltiplos;  
- Detectar alterações sutis de layout;  
- Manter consistência visual do produto.  

---

## 💡 5. Boas Práticas e Dicas

- **Nomeie bem os testes** → use descrições claras e humanas.  
- **Separe dados de lógica** → mantenha entradas em variáveis ou fixtures.  
- **Use Page Objects** → evite duplicação e facilite manutenção.  
- **Valide sempre** → não teste só o “happy path”.  
- **Cuide dos baselines visuais** → atualize quando o layout mudar propositalmente.  

---

## 🧩 6. Desafios para Praticar

Para fixar o aprendizado, aqui estão alguns desafios sugeridos:

1. Criar um teste para **aplicar o cupom HATOFF** e validar o desconto.  
2. Automatizar o fluxo de **compra via boleto**.  
3. Criar um teste negativo: tentar finalizar sem preencher campos obrigatórios.  
4. Adicionar validação para **quantidade de itens no carrinho**.  
5. Criar um novo teste visual para a tela de **checkout**.  

> 💬 *Dica:* Comece duplicando os arquivos de teste existentes e adaptando os seletores e asserts.

---

## 🧠 Conclusão

Este guia foi criado para ajudar QAs iniciantes a compreenderem como estruturar, organizar e executar testes automatizados com **Playwright**.  
Com prática e curiosidade, você será capaz de criar suítes de testes completas e confiáveis.

---

## ✨ Créditos

- **Marcelo Cardoso Feiteiro** — Desenvolvimento do projeto e estrutura base da automação  
- **Joelma Prestes Ferreira** — Documentação, revisão técnica e criação do guia didático  

---

🎓 *Hat Store Front – Projeto Educacional de Automação de Testes Frontend (Programa Crescer)*
