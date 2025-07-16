// Carrega variáveis de ambiente do arquivo .env para process.env (ex: API_KEY, URL, etc.)
require('dotenv').config();

// Importa dinamicamente a biblioteca 'node-fetch' para fazer requisições HTTP
// Isso garante compatibilidade com ambientes que usam ESModules no Node.js
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Define a URL da API do OpenRouter, obtida do .env
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;

// Nome do modelo de IA utilizado para análise (gratuito via OpenRouter)
const MODEL_NAME = 'meta-llama/llama-4-maverick:free';

// ----------------------------
// Função principal para enviar o erro para a IA
// e obter uma resposta estruturada
// ----------------------------
async function analyzeWithIA(logDeErro) {
  // Prompt que será enviado à IA com instruções claras para análise
  const prompt = `
Você é um especialista em QA. Analise o seguinte erro de teste automatizado:

"${logDeErro}"

Responda com:
1. 📌 **Motivo provável da falha**
2. ✅ **Sugestão de correção**
`;

  try {
    // Faz a requisição POST para a API da IA via OpenRouter
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        // Envia o token da IA presente no arquivo .env
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL_NAME, // Modelo a ser usado
        messages: [{ role: 'user', content: prompt }], // Envia a mensagem do usuário (prompt)
        temperature: 0.3, // Controla a criatividade da resposta (0 = mais precisa, 1 = mais criativa)
        max_tokens: 300   // Limita a resposta da IA
      })
    });

    // Converte a resposta da API em JSON
    const data = await response.json();

    // Retorna o conteúdo da resposta da IA ou uma mensagem de erro
    return data.choices?.[0]?.message?.content || '❌ Erro: resposta da IA vazia.';
  } catch (error) {
    // Captura e retorna qualquer erro ocorrido na requisição
    return `❌ Erro ao se comunicar com a IA: ${error.message}`;
  }
}

// Exporta a função para ser usada em outros arquivos (ex: analyze-failures.js)
module.exports = { analyzeWithIA };
