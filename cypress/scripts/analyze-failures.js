const fs = require('fs');
const path = require('path');

const allureResultsPath = './allure-results';

// Função para analisar e modificar os arquivos de resultados de testes com falha
function analyzeFailures() {
  const files = fs.readdirSync(allureResultsPath);

  let failureCount = 0;

  files.forEach(file => {
    if (file.endsWith('-result.json')) {
      const filePath = path.join(allureResultsPath, file);
      const result = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (result.status === 'failed') {
        failureCount++;

        const message = result.statusDetails.message || '';
        const trace = result.statusDetails.trace || '';
        const testName = result.name;

        // Gera um conteúdo descritivo simulado como se fosse uma análise de IA
        const analysis = `
🤖 **Análise da IA:**

🧪 **Cenário:** ${testName}

📌 **Erro detectado:**
\`\`\`
${message}
\`\`\`

💥 **Possíveis causas:**
- O seletor utilizado pode estar incorreto ou desatualizado.
- O elemento pode realmente não existir para o cenário testado.
- A aplicação pode estar retornando uma resposta inesperada ou com erro.

🛠️ **Sugestões de correção:**
- Valide o seletor \`.search-item\` manualmente no navegador.
- Utilize \`cy.get('.search-item').should('not.exist')\` se a ausência do item for esperada.
- Verifique os dados mockados, interceptações ou estado da aplicação no início do teste.
`;

        // Insere a análise no campo `description` para aparecer no Allure Report
        result.description = analysis;

        // Escreve o novo JSON com a descrição da IA
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
        console.log(`✅ Análise adicionada ao teste com falha: ${file}`);
      }
    }
  });

  if (failureCount === 0) {
    console.log('🎉 Nenhuma falha encontrada nos testes!');
  } else {
    console.log(`⚠️ ${failureCount} teste(s) com falha(s) analisado(s) e enriquecido(s) com IA.`);
  }
}

// Executa a função
analyzeFailures();
