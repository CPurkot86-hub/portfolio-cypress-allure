// Importa o módulo 'fs' para trabalhar com arquivos (leitura e escrita)
import fs from 'fs';
// Importa o módulo 'path' para lidar com caminhos de diretórios de forma segura
import path from 'path';
// Importa a função personalizada que usa IA para analisar erros
import { analyzeErrorWithIA } from './analyzeWithIA.js';
// Importa o dotenv para ler variáveis de ambiente do arquivo .env
import * as dotenv from 'dotenv';

// Carrega as variáveis do .env para o processo atual (ex: IA_API_KEY, IA_API_URL, etc.)
dotenv.config();

// Define o caminho da pasta onde o Allure salva os resultados dos testes
const resultsDir = './allure-results';

// Função principal assíncrona que realiza a análise de falhas
async function runAnalysis() {
  // Lista todos os arquivos que terminam com '-result.json' (arquivos de teste individuais do Allure)
  const files = fs.readdirSync(resultsDir).filter(file => file.endsWith('-result.json'));
  let totalAnalisados = 0; // Contador de testes analisados pela IA

  // Percorre todos os arquivos encontrados
  for (const file of files) {
    const filePath = path.join(resultsDir, file); // Monta o caminho completo do arquivo
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Lê e interpreta o conteúdo JSON

    const isFailed = content.status === 'failed'; // Verifica se o teste falhou
    const title = content.name; // Nome do teste
    const errorMsg = content.statusDetails?.message || ''; // Mensagem de erro do teste (fallback: string vazia)

    // Verifica se o teste falhou e ainda não tem análise da IA (evita sobrescrever)
    if (isFailed && !content.description?.includes('Análise da IA:')) {
      // Chama a função que analisa o erro usando IA e retorna uma sugestão descritiva
      const iaDescription = await analyzeErrorWithIA(errorMsg, title);

      // Atualiza a descrição do teste com a análise da IA
      content.description = `🧠 Análise da IA:\n${iaDescription}`;
      // Escreve novamente o arquivo atualizado com a nova descrição
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');

      // Exibe no terminal que o teste foi analisado
      console.log(`✅ IA analisou a falha do teste: ${title}`);
      totalAnalisados++; // Incrementa o contador
    }
  }

  // Exibe o total de testes que foram analisados
  console.log(`🔍 ${totalAnalisados} teste(s) com falha analisado(s) com IA.`);
}

// Executa a função principal
runAnalysis();
