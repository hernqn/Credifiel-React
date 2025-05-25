import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const fetchOpenAIResponse = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error('API Key no encontrada. Asegúrate de configurar VITE_OPENAI_API_KEY en el archivo .env');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      console.error('Respuesta inesperada de OpenAI:', response.data);
      return 'No se pudo obtener una respuesta válida del chatbot.';
    }
  } catch (error: any) {
    if (error.response?.status === 429) {
      return 'El servicio está ocupado. Por favor, espera un momento y vuelve a intentar.';
    }
    if (error.response?.status === 401) {
      return 'Error de autenticación. Verifica tu API key.';
    }
    console.error('Error al llamar a OpenAI:', error.response?.data || error.message);
    return 'Hubo un error al conectarse con el chatbot.';
  }
};
