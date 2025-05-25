import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import './chatbot.css';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  companyName?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ companyName = "Credifiel" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `¡Hola! Soy el asistente virtual de ${companyName}. ¿En qué puedo ayudarte hoy?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'hola': '¡Hola! Bienvenido a Credifiel. ¿Te interesa conocer nuestros préstamos?',
    'préstamo': 'Ofrecemos préstamos personales con tasas competitivas. ¿Qué monto necesitas?',
    'prestamo': 'Ofrecemos préstamos personales con tasas competitivas. ¿Qué monto necesitas?',
    'tasa': 'Nuestras tasas van desde el 15% anual. Depende del monto y plazo que elijas.',
    'requisitos': 'Los requisitos son: ser mayor de edad, tener ingresos comprobables y identificación oficial.',
    'tiempo': 'El proceso de aprobación toma menos de 24 horas una vez que tengas todos los documentos.',
    'monto': 'Prestamos desde $5,000 hasta $500,000 pesos, dependiendo de tu capacidad de pago.',
    'documentos': 'Necesitas: INE, comprobante de ingresos, comprobante de domicilio y estado de cuenta.',
    'sucursal': 'Tenemos sucursales en las principales ciudades del país. ¿En qué ciudad te encuentras?',
    'contacto': 'Puedes contactarnos al 01-800-CREDIFIEL o visitar nuestra página de contacto.',
    'horario': 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.',
    'ayuda': 'Puedo ayudarte con información sobre préstamos, requisitos, tasas, montos y más.',
    'gracias': '¡De nada! ¿Hay algo más en lo que pueda ayudarte?',
    'adiós': '¡Hasta luego! No dudes en contactarnos si necesitas más información.',
    'adios': '¡Hasta luego! No dudes en contactarnos si necesitas más información.'
  };

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Buscar palabras clave en el mensaje
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    // Respuestas contextuales más inteligentes
    if (message.includes('cuanto') || message.includes('cuánto')) {
      if (message.includes('tiempo') || message.includes('tardar')) {
        return 'El proceso completo toma entre 1 a 3 días hábiles desde que envías tu solicitud.';
      }
      if (message.includes('pagar') || message.includes('mensual')) {
        return 'Los pagos mensuales dependen del monto y plazo. ¿Te gustaría que calculemos una cotización personalizada?';
      }
      return 'Prestamos desde $5,000 hasta $500,000 pesos con tasas desde 15% anual.';
    }

    if (message.includes('solicitar') || message.includes('aplicar')) {
      return 'Puedes solicitar tu préstamo directamente en nuestra página web o visitando una sucursal. ¿Prefieres que te guíe por el proceso en línea?';
    }

    if (message.includes('seguro') || message.includes('confiable')) {
      return 'Credifiel es una empresa 100% regulada por la CONDUSEF con más de 10 años de experiencia en el mercado financiero mexicano.';
    }

    // Respuesta por defecto
    return 'Gracias por tu pregunta. Te recomiendo contactar a uno de nuestros asesores al 01-800-CREDIFIEL para información más específica. ¿Hay algo más en lo que pueda ayudarte?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 segundos de delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    '¿Qué requisitos necesito?',
    '¿Cuánto puedo pedir prestado?',
    '¿Cuáles son las tasas de interés?',
    'Quiero solicitar un préstamo'
  ];

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="chatbot">
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chat con {companyName}</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FaComments />
        </button>
      )}
    </div>
  );
};

export default Chatbot;