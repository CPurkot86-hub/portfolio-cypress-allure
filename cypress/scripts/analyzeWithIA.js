// Importa o módulo 'node-fetch' para fazer requisições HTTP (necessário no Node.js)
import fetch from 'node-fetch';

// Importa o módulo 'dotenv' para ler variáveis de ambiente definidas em um arquivo .env
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env para o processo atual (Node.js)
dotenv.config();

// Função principal exportada: recebe o texto do erro e o título do teste como argumentos
export async function analyzeErrorWithIA(errorText, testTitle) {
  // Lê as variáveis de ambiente definidas no repositório ou no arquivo .env
  const API_KEY = process.env.IA_API_KEY;
  const API_URL = process.env.IA_API_URL;
  const MODEL = process.env.IA_MODEL;

  // Validação de segurança: garante que todas as variáveis estejam configuradas
  if (!API_KEY || !API_URL || !MODEL) {
    console.warn("⚠️ Variáveis de ambiente da IA não configuradas corretamente.");
    return "Erro ao se comunicar com a IA: Variáveis de ambiente não definidas";
  }

  try {
    // Realiza a chamada HTTP POST para o endpoint da IA
    const response = await fetch(API_URL, {
      method: "POST", // Método HTTP usado
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // Envia o token de autenticação no header
        'Content-Type': 'application/json'     // Define o formato da requisição como JSON
      },
      body: JSON.stringify({
        // Parâmetros da requisição que serão enviados à IA
        model: MODEL, // Modelo de IA a ser utilizado (ex: openai/gpt-4, anthropic/claude-3-haiku)

        // Mensagens no formato esperado pela API (estilo OpenAI)
        messages: [
          {
            role: "system", // Define o "papel" da IA para responder com o tom adequado
            content: "Você é um analista de QA sênior. Responda com markdown, usando estrutura clara e emojis para exibição em relatórios Allure."
          },
          {
            role: "user", // Mensagem do usuário com o contexto real do erro
            content: `
### 🧠 Análise técnica do erro de teste

**Título do teste:** ${testTitle}

**Erro encontrado:**
\`\`\`
${errorText}
\`\`\`

Por favor, explique de forma técnica o que pode ter causado esse erro, liste possíveis causas numeradas e sugestões de correção em uma seção separada.
`
          }
        ]
      })
    });

    // Espera a resposta da API e converte para JSON
    const data = await response.json();

    // Verifica se a resposta veio corretamente no formato esperado
    if (data?.choices?.[0]?.message?.content) {
      // Retorna o conteúdo da resposta, já formatado em markdown para o Allure
      return data.choices[0].message.content.trim();
    }

    // Caso a IA responda com um formato inesperado
    return "❌ Erro: resposta inesperada da IA.";
  } catch (err) {
    // Captura erros de rede, timeout ou falhas na chamada
    console.error("❌ Erro ao chamar IA:", err.message);
    return "Erro inesperado ao tentar se comunicar com a IA.";
  }
}
