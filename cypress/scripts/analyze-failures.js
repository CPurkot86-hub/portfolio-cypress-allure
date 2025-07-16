// Importa o módulo nativo 'fs' para manipular arquivos e diretórios
const fs = require('fs');

// Importa o módulo 'path' para lidar com caminhos de arquivos de forma segura entre sistemas
const path = require('path');

// Define o caminho para a pasta onde estão os resultados brutos dos testes do Allure
const allureResultsPath = './allure-results';

// -------------------------
// Função principal: percorre os arquivos de resultado do Allure
// e insere uma análise automática nos testes com falha
// -------------------------
function analyzeFailures() {
  // Lê todos os arquivos do diretório 'allure-results'
  const files = fs.readdirSync(allureResultsPath);

  // Contador de falhas encontradas (para exibir no final)
  let failureCount = 0;

  // Para cada arquivo do diretório:
  files.forEach(file => {
    // Verifica se é um arquivo de resultado de teste (termina com -result.json)
    if (file.endsWith('-result.json')) {
      const filePath = path.join(allureResultsPath, file); // Caminho completo do arquivo
      const result = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Lê e transforma em objeto JSON

      // Se o teste estiver com status "failed", analisamos
      if (result.status === 'failed') {
        failureCount++; // Incrementa o número de falhas

        // Extrai informações importantes do erro: mensagem e rastreio
        const message = result.statusDetails.message || '';
        const trace = result.statusDetails.trace || '';
        const testName = result.name; // Nome do teste com falha

        // Gera um conteúdo simulado de "análise da IA" que será embutido no relatório
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

        // Adiciona a análise no campo 'description' do resultado do teste (aparece no Allure Report)
        result.description = analysis;

        // Reescreve o arquivo JSON com a nova análise embutida
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');

        // Exibe no console que a análise foi adicionada
        console.log(`✅ Análise adicionada ao teste com falha: ${file}`);
      }
    }
  });

  // Mensagem final para o terminal
  if (failureCount === 0) {
    console.log('🎉 Nenhuma falha encontrada nos testes!');
  } else {
    console.log(`⚠️ ${failureCount} teste(s) com falha(s) analisado(s) e enriquecido(s) com IA.`);
  }
}

// -------------------------
// Execução da função (ponto de entrada do script)
// -------------------------
analyzeFailures();
