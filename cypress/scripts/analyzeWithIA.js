// Importa o 'fetch' do Node.js para fazer requisições HTTP
import fetch from 'node-fetch';
// Importa o dotenv para carregar as variáveis de ambiente definidas no arquivo .env
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env para o processo atual
dotenv.config();

// Exporta uma função assíncrona que recebe o texto do erro e o título do teste
export async function analyzeErrorWithIA(errorText, testTitle) {
  // Recupera as variáveis de ambiente necessárias para usar a IA
  const API_KEY = process.env.IA_API_KEY;
  const API_URL = process.env.IA_API_URL;
  const MODEL = process.env.IA_MODEL;

  // Verifica se todas as variáveis foram definidas corretamente
  if (!API_KEY || !API_URL || !MODEL) {
    console.warn("⚠️ Variáveis de ambiente da IA não configuradas corretamente.");
    return "Erro ao se comunicar com a IA: Variáveis de ambiente não definidas";
  }

  try {
    // Realiza uma requisição POST para a API da IA com os dados do erro
    const response = await fetch(API_URL, {
      method: "POST", // Método da requisição
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // Autenticação via token
        'Content-Type': 'application/json' // Tipo do corpo da requisição
      },
      body: JSON.stringify({
        model: MODEL, // Modelo de linguagem a ser usado (ex: claude-3-haiku, gpt-4)
        messages: [
          {
            role: "system", // Instrução de comportamento da IA
            content: "Você é um analista de QA sênior que ajuda times a entenderem falhas automatizadas."
          },
          {
            role: "user", // Mensagem do usuário com o contexto do erro
            content: `Explique tecnicamente o seguinte erro de teste:\n\nTítulo: ${testTitle}\nErro:\n${errorText}`
          }
        ]
      })
    });

    // Aguarda e interpreta a resposta da IA
    const data = await response.json();

    // Verifica se há conteúdo de resposta válido e retorna a explicação
    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    }

    // Caso a IA responda de forma inesperada
    return "Erro: resposta inesperada da IA.";
  } catch (err) {
    // Caso ocorra erro na requisição (ex: rede, timeout, etc.)
    console.error("❌ Erro ao chamar IA:", err.message);
    return "Erro inesperado ao tentar se comunicar com a IA.";
  }
}
