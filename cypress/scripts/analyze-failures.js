// Importa os módulos necessários do Node.js
const fs = require('fs');
const path = require('path');
const { analyzeWithIA } = require('../utils/analyzeWithIA');

// Importa a função que faz a análise via IA (arquivo utils/analyzeWithIA.js)
const { analyzeWithIA } = require('../utils/analyzeWithIA');

// Caminho onde o Cypress e o plugin Allure salvam os resultados dos testes
const allureResultsPath = './allure-results';

// Função principal que analisa os testes com falha e enriquece com sugestão da IA
async function analyzeFailures() {
  const files = fs.readdirSync(allureResultsPath); // Lista os arquivos do diretório
  let failureCount = 0;

  for (const file of files) {
    if (file.endsWith('-result.json')) {
      const filePath = path.join(allureResultsPath, file);
      const result = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Verifica se o status do teste foi "failed"
      if (result.status === 'failed') {
        failureCount++;

        const testName = result.name;
        const errorMessage = result.statusDetails.message || '';
        const errorTrace = result.statusDetails.trace || '';

        const fullErrorLog = `${errorMessage}\n${errorTrace}`;

        // Chama a IA passando o erro e aguarda a resposta com análise
        const aiAnalysis = await analyzeWithIA(fullErrorLog);

        // Adiciona a resposta da IA no campo `description`, visível no Allure Report
        result.description = `
🤖 **Análise com IA personalizada**
🧪 Cenário: ${testName}

${aiAnalysis}
        `;

        // Sobrescreve o arquivo original com a nova descrição
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
        console.log(`✅ Análise da IA adicionada ao teste com falha: ${file}`);
      }
    }
  }

  // Feedback no terminal
  if (failureCount === 0) {
    console.log('🎉 Nenhuma falha encontrada nos testes!');
  } else {
    console.log(`⚠️ ${failureCount} teste(s) com falha analisado(s) e atualizado(s) com sugestão da IA.`);
  }
}

// Executa a função
analyzeFailures();
