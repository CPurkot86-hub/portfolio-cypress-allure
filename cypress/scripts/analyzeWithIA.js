// Importa o 'fetch' do Node.js para fazer requisições HTTP
import fetch from 'node-fetch';

// Importa o dotenv para carregar as variáveis de ambiente do arquivo .env
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env para o processo atual
dotenv.config();

// Exporta uma função assíncrona para análise da falha usando IA
export async function analyzeErrorWithIA(errorText, testTitle) {
  // Recupera as variáveis de ambiente necessárias
  const API_KEY = process.env.IA_API_KEY;
  const API_URL = process.env.IA_API_URL;
  const MODEL = process.env.IA_MODEL;

  // Verifica se as variáveis estão definidas corretamente
  if (!API_KEY || !API_URL || !MODEL) {
    console.warn("⚠️ Variáveis de ambiente da IA não configuradas corretamente.");
    return "❌ Erro ao se comunicar com a IA: Variáveis de ambiente não definidas.";
  }

  try {
    // Monta a requisição para a IA com o modelo e contexto
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "Você é um analista de QA sênior que ajuda times a entenderem falhas automatizadas de testes E2E. Sua resposta deve conter título visual com emoji e uma explicação estruturada."
          },
          {
            role: "user",
            content: `Explique tecnicamente o seguinte erro de teste e organize em tópicos:\n\n🧪 Título: ${testTitle}\n\n❗Erro capturado:\n${errorText}`
          }
        ]
      })
    });

    // Transforma a resposta em JSON
    const data = await response.json();

    // Se a IA retornou uma explicação válida
    if (data?.choices?.[0]?.message?.content) {
      const explanation = data.choices[0].message.content.trim();

      // Verifica e adiciona emojis conforme o tipo de erro para deixar bonito
      if (errorText.includes("Timeout")) {
        return `⏱️ **Erro de Timeout**\n\n${explanation}`;
      }

      if (errorText.includes("not found") || errorText.includes("Cannot find") || errorText.includes("never found")) {
        return `🔍 **Elemento não encontrado no DOM**\n\n${explanation}`;
      }

      if (errorText.includes("network") || errorText.includes("ECONNREFUSED")) {
        return `🌐 **Erro de Rede/API**\n\n${explanation}`;
      }

      // Resposta padrão formatada
      return `🤖 **Análise da IA**\n\n${explanation}`;
    }

    // Se não veio uma resposta válida da IA
    return "⚠️ Erro: resposta inesperada da IA.";
  } catch (err) {
    // Em caso de erro na requisição
    console.error("❌ Erro ao chamar IA:", err.message);
    return "🚨 Erro inesperado ao tentar se comunicar com a IA.";
  }
}
