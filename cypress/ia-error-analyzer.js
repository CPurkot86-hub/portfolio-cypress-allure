require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Compatível com ESModules no Node.js

const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;
const MODEL_NAME = 'meta-llama/llama-4-maverick:free';

async function analyzeWithIA(logDeErro) {
  const prompt = `
Você é um especialista em QA. Analise o seguinte erro de teste automatizado:

"${logDeErro}"

Responda com:
1. 📌 **Motivo provável da falha**
2. ✅ **Sugestão de correção**
`;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 300
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '❌ Erro: resposta da IA vazia.';
  } catch (error) {
    return `❌ Erro ao se comunicar com a IA: ${error.message}`;
  }
}

module.exports = { analyzeWithIA };
