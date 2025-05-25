import React, { useState } from 'react';
import { fetchOpenAIResponse } from './openaiService';
import './Chatbot.css';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setInput('');

    const botReply = await fetchOpenAIResponse(userMessage);
    setMessages((prev) => [...prev, { type: 'bot', text: botReply }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
