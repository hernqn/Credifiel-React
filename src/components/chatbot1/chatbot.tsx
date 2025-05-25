import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  companyName: string;
}

const AIChatbot: React.FC<ChatbotProps> = ({ companyName }) => {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', content: '¡Hola! Soy tu asistente con inteligencia artificial. Una vez que configures tu API Key, podremos conversar sobre cualquier tema. 😊' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const setupAPI = () => {
    const key = apiKey.trim();
    
    if (!key) {
      setError('Por favor ingresa tu API Key');
      return;
    }

    if (!key.startsWith('sk-')) {
      setError('La API Key debe comenzar con "sk-"');
      return;
    }

    setIsConnected(true);
    setError('');
    setMessages(prev => [...prev, { sender: 'bot', content: '¡Perfecto! Ya estoy conectado con OpenAI. ¿En qué puedo ayudarte?' }]);
  };

  const sendMessage = async () => {
    const message = currentMessage.trim();
    if (!message) return;

    // Agregar mensaje del usuario
    const newMessages = [...messages, { sender: 'user', content: message }];
    setMessages(newMessages);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Agregar mensaje a historial
      const newHistory = [...conversationHistory, { role: 'user' as const, content: message }];
      
      // Llamar directamente a OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system' as const, content: 'Eres un asistente útil y amigable que responde en español.' },
            ...newHistory
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      
      // Agregar respuesta del bot
      const updatedHistory = [...newHistory, { role: 'assistant' as const, content: botResponse }];
      setConversationHistory(updatedHistory);
      setMessages(prev => [...prev, { sender: 'bot', content: botResponse }]);

    } catch (error) {
      console.error('Error completo:', error);
      let errorMessage = 'Lo siento, ocurrió un error. ';
      
      const err = error as { message: string };
      if (err.message.includes('401')) {
        errorMessage += 'API Key inválida o sin permisos.';
      } else if (err.message.includes('429')) {
        errorMessage += 'Límite de uso excedido. Esperando 60 segundos...';
        setMessages(prev => [...prev, { sender: 'bot', content: errorMessage }]);
        // Esperar 60 segundos y reintentar
        await new Promise(resolve => setTimeout(resolve, 60000));
        return sendMessage(); // Reintentar el mensaje
      } else if (err.message.includes('400')) {
        errorMessage += 'Error en la solicitud. Revisa tu configuración.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage += 'Error de conexión. Verifica tu internet.';
      } else {
        errorMessage += `Error: ${err.message}`;
      }
      
      setMessages(prev => [...prev, { sender: 'bot', content: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isConnected) {
        sendMessage();
      } else {
        setupAPI();
      }
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  return (
    <div className="chat-container">
      <div className="chat-header">
        🤖 Mi Chatbot con IA
      </div>
      
      {!isConnected && (
        <div className="api-setup">
          {error && <div className="error">{error}</div>}
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyPress={handleKeyPress}
            className="api-input"
            placeholder="Ingresa tu API Key de OpenAI"
          />
          <button className="api-button" onClick={setupAPI}>
            Conectar IA
          </button>
          <div className="status">
            Necesitas una API Key de OpenAI para usar el chatbot.<br/>
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
              Obtén tu API Key aquí
            </a>
          </div>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.content}
          </div>
        ))}
        
        {isTyping && (
          <div className="typing">
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
          placeholder="Escribe tu mensaje..."
          disabled={!isConnected}
        />
        <button
          className="send-button"
          onClick={sendMessage}
          disabled={!isConnected}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;  