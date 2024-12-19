import axios from "axios";
import { Platform } from "react-native";
import constants from '../../../../config/constants';

class ConversationGemini {
  constructor() {
    // Configuração inicial
    this.apiKey = constants.API_GEMINI_KEY;
    this.baseUrl =
      constants.GEMINI_API_URL;

    // Array para manter o histórico de mensagens
    this.conversationHistory = [
      {
        parts: [
          {
            text: "<contexto>Você tem como objetivo principal ajudar o usuário com receitas de cafe, no caso o usuário pode perguntar como fazer algum café e você ajuda com passo a passo e ingredientes.</contexto><regras>**Responda sempre na lingua do usuario, ex: se ele enviou mensagem em ingles siga com a lingua dele etc** **Não responda sobre nenhum outro assunto que não seja sobre cafés e/ou bebidas quentes como chás** **Seja gentil e responda com formatação nas mensagens**</regras>",
          },
        ],
      },
    ];
  }

  // Método para formatar a mensagem atual
  formatMessage(userMessage) {
    return {
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": userMessage
            }
          ]
        }
      ]
    };
  }

  async sendMessage(userMessage) {
    try {
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        this.formatMessage(userMessage),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extrai a resposta da API
      const aiResponse = response.data.candidates[0].content.parts[0].text;

      // Adiciona ao histórico de conversação
      this.conversationHistory.push({
        parts: [{ text: userMessage }],
      });
      this.conversationHistory.push({
        parts: [{ text: aiResponse }],
      });

      return aiResponse;
    } catch (error) {
      console.error(
        "Erro ao enviar mensagem para a Gemini:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
}

export default new ConversationGemini();
