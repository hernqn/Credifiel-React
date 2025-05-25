import React, { useState } from 'react';
import './Chat.css';

interface Message {
  type: 'user' | 'bot';
  content: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      sender: 'Usuario'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        type: 'bot',
        content: data.response,
        sender: 'Chatbot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Lo siento, hubo un error al procesar tu mensaje.',
        sender: 'Sistema'
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="chat-toggle"
        onClick={() => setIsOpen(true)}
      >
        💬 Chat
      </button>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Chat con IA</h3>
        <button onClick={() => setIsOpen(false)}>✕</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.type === 'bot' ? 'other' : 'user'}`}
          >
            <span className="sender">{msg.sender}</span>
            <span className="content">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat; 