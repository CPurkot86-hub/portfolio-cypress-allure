# 🚀 Portfólio de Testes Automatizados com Cypress + Allure + I

Este projeto demonstra um fluxo completo de automação de testes com **Cypress**, geração de relatórios com **Allure**, **integração contínua via GitHub Actions**, publicação automática do relatório via **GitHub Pages**, e **sugestões por IA** para falhas e melhorias nos testes.
---
---

## 📊 Relatório Allure

[![GitHub Pages](https://github.com/CPurkot86-hub/portfolio-cypress-allure/actions/workflows/pages/pages-build-deployment/badge.svg)](https://cpurkot86-hub.github.io/portfolio-cypress-allure/)
[![Build Status](https://github.com/CPurkot86-hub/portfolio-cypress-allure/actions/workflows/testes.yml/badge.svg)](https://github.com/CPurkot86-hub/portfolio-cypress-allure/actions)

🔗 **Acesse o relatório completo**: [📈 Allure Report](https://cpurkot86-hub.github.io/portfolio-cypress-allure/)

📷 **Exemplo de visualização do Allure Report**:

![Allure Report Print](.github/assets/allure-print.png)

---

## 📁 Estrutura do Projeto

```
📁 cypress/
 ┣ 📁 e2e/ → Testes automatizados
 ┣ 📁 support/ → Suporte (hooks, comandos)
 ┣ 📁 reports/ → Resultados Allure
📁 .github/
 ┗ 📁 workflows/ → Pipelines GitHub Actions
📄 cypress.config.js → Configuração do Cypress
📄 package.json → Dependências e scripts
📄 README.md → Documentação
```

---

## 📦 Pré-requisitos
- Node.js instalado (recomendado: v18+)
- Git instalado
  
---

## 🛠️ Comandos Úteis

```bash
# Rodar os testes em modo headless
npm run test

# Abrir o Cypress com interface
npx cypress open

# Gerar e abrir o relatório Allure localmente
npm run report
```
---

## 💻 Clonar e Executar Localmente

```bash
git clone https://github.com/CPurkot86-hub/portfolio-cypress-allure.git
cd portfolio-cypress-allure
npm install
npm run test
npm run report
```
🧪 Apenas verifique:
```bash
1-Se o package.json do projeto já inclui:
"devDependencies": {
  "cypress": "...",
  "@shelex/cypress-allure-plugin": "...",
  "allure-commandline": "..."
}
2-Se o npm run report está configurado corretamente no scripts:
"scripts": {
  "report": "allure generate --clean && allure open"
}
```
---

## 🤖 Diagnóstico com IA
Ao ocorrer uma falha no teste, o relatório Allure pode exibir explicações automáticas e sugestões inteligentes com base na falha identificada.

💡 **Exemplo de falha analisada:**
- ❌ **Teste falhou:** não foi encontrado o seletor `.search-item`
- ✅ **Sugestão da IA:** Verifique se o elemento foi renderizado corretamente ou aumente o tempo de espera (timeout).

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
