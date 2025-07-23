# 🚀 Portfólio de Testes Automatizados com Cypress + Allure + IA

Este projeto demonstra um fluxo completo de automação de testes com **Cypress**, geração de relatórios com **Allure**, **análise de falhas com Inteligência Artificial (IA)** via OpenRouter, **integração contínua com GitHub Actions** e publicação automática via **GitHub Pages**.

---

## 📊 Relatório Allure Online

[![GitHub Pages](https://github.com/CPurkot86-hub/portfolio-cypress-allure/actions/workflows/pages/pages-build-deployment/badge.svg)](https://cpurkot86-hub.github.io/portfolio-cypress-allure/)
[![Build Status](https://github.com/CPurkot86-hub/portfolio-cypress-allure/actions/workflows/testes.yml/badge.svg)](https://github.com/CPurkot86-hub/portfolio-cypress-allure/actions)

🔗 **Relatório online**: [📈 Acesse o Allure Report](https://cpurkot86-hub.github.io/portfolio-cypress-allure/)

📷 **Exemplo**:
![Allure Report Print](.github/assets/allure-print.png)

---

## 📁 Estrutura do Projeto

```
📁 cypress/
┣ 📁 e2e/ → Testes automatizados
┣ 📁 support/ → Comandos customizados e setup
┣ 📁 scripts/
┃ ┣ analyzeWithIA.js → Integração com IA
┃ ┗ analyze-failures.js → Aplica análise da IA no relatório
📁 .github/
┗ 📁 workflows/ → CI/CD com GitHub Actions

📄 .env → Chaves da IA (não versionado)
📄 cypress.config.js → Configuração Cypress
📄 package.json → Scripts e dependências
📄 README.md → Esta documentação
```
---

## ✅ Funcionalidades do Projeto

- ✅ Execução de testes automatizados com Cypress
- ✅ Geração de relatórios com Allure
- ✅ Integração com IA (OpenRouter) para diagnosticar falhas
- ✅ Pipeline CI com GitHub Actions
- ✅ Publicação automática do relatório no GitHub Pages

---

## 🔐 Como Configurar a IA (OpenRouter)

1. Acesse: [https://openrouter.ai](https://openrouter.ai)
2. Crie uma conta gratuita.
3. Vá em **API Keys**: [https://openrouter.ai/keys](https://openrouter.ai/keys)
4. Copie sua chave (`sk-...`).
5. Crie um arquivo `.env` na raiz do projeto com este conteúdo:

```dotenv
IA_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
IA_API_URL=https://openrouter.ai/api/v1/chat/completions
IA_MODEL=anthropic/claude-3-haiku

💡 Dica: Você pode testar também com openai/gpt-3.5-turbo, google/gemini-pro, etc.
---

## 📦 Pré-requisitos
✅ Node.js (v18+ recomendado)
✅ Git
✅ Conta no OpenRouter.ai (para uso da IA)
(opcional) Instalar Allure CLI globalmente:

npm install -g allure-commandline
  
---

## 🛠️ Comandos Principais

```bash
# Instala as dependências do projeto
npm install

# Executa os testes em modo headless com Allure ativo
npm run test:run

# Executa a análise das falhas com IA
npm run analyze:failures

# Gera o relatório Allure localmente
npm run report:generate

# Abre o relatório local em navegador
npm run report:open
```
---

## 🧪 Executando Localmente Passo a Passo

# Clone o repositório
git clone https://github.com/CPurkot86-hub/portfolio-cypress-allure.git
cd portfolio-cypress-allure

# Instale as dependências
npm install

# Configure as variáveis da IA
echo "IA_API_KEY=sk-..." >> .env
echo "IA_API_URL=https://openrouter.ai/api/v1/chat/completions" >> .env
echo "IA_MODEL=anthropic/claude-3-haiku" >> .env

# Execute os testes
npm run test:run

# Analise os testes com falha via IA
npm run analyze:failures

# Gere e abra o relatório Allure
npm run report:generate
npm run report:open


## 🤖 Como Funciona a Análise de Falhas com IA
```
1-Após rodar os testes, falhas são salvas em arquivos *-result.json na pasta allure-results/.
2-O script analyze-failures.js identifica esses arquivos.
3-Cada erro é enviado via API para a IA configurada.
4-A resposta da IA é salva no campo description do teste.
5-Ao gerar o relatório, a descrição estará visível no Allure Report.
```

💡 **Exemplo de análise da IA**
🧠 Análise da IA:
O seletor `.search-item` não foi encontrado. Isso pode ocorrer se o produto não estiver disponível ou se o tempo de espera (timeout) estiver muito curto.
Sugestão: verifique a lógica da busca e considere adicionar um `cy.wait()` ou `cy.intercept()`.

---

## ⚙️ Tecnologias Utilizadas
- ✅ **Cypress** – Testes E2E  
- ✅ **Allure Reports** – Visualização rica dos testes  
- ✅ **@shelex/cypress-allure-plugin**  
- ✅ **GitHub Actions** – Integração contínua  
- ✅ **GitHub Pages** – Publicação automática de relatórios  
- ✅ **Integração com IA** – Diagnóstico e sugestões automatizadas

---

✍️ Autor
Cleverson da Silva Purkot
💼 QA Automation | Testes E2E | Cypress | CI/CD | Allure | IA para QA
