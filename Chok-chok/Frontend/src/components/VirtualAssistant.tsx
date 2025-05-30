'use client';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  typing?: boolean;
}

interface SuggestedQuestion {
  id: string;
  text: string;
  category: string;
  emoji: string;
}

export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Preguntas sugeridas por categoría
  const suggestedQuestions: SuggestedQuestion[] = [
    { id: '1', text: '¿Qué rutina me recomiendas para piel grasa?', category: 'Rutinas', emoji: '🧴' },
    { id: '2', text: '¿Cómo eliminar las manchas de acné?', category: 'Tratamientos', emoji: '✨' },
    { id: '3', text: '¿Qué protector solar es mejor para mi tipo de piel?', category: 'Productos', emoji: '☀️' },
    { id: '4', text: '¿Con qué frecuencia debo exfoliar mi rostro?', category: 'Cuidados', emoji: '🔄' },
    { id: '5', text: '¿Cómo crear una rutina anti-aging efectiva?', category: 'Anti-aging', emoji: '🌟' },
    { id: '6', text: '¿Qué ingredientes debo evitar en productos?', category: 'Ingredientes', emoji: '⚠️' }
  ];

  // Mensaje de bienvenida
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      text: '¡Hola! 👋 Soy tu asistente personal de skincare. Puedo ayudarte con rutinas, productos, ingredientes y consejos personalizados. ¿En qué puedo ayudarte hoy?',
      sender: 'assistant',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll al final
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simular respuesta de OpenAI
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Aquí iría la llamada real a OpenAI API
    // const response = await fetch('/api/openai', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: userMessage })
    // });
    
    // Simulación de respuestas basadas en palabras clave
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('piel grasa') || lowerMessage.includes('grasa')) {
      return `Para piel grasa, te recomiendo una rutina que incluya:

🧼 **Limpieza (2x al día)**: Gel limpiador con ácido salicílico
🧴 **Tónico**: Con niacinamida para controlar sebo
💧 **Hidratante**: Gel-crema oil-free con ácido hialurónico
☀️ **Protector solar**: SPF 30+ de textura ligera

**Ingredientes clave**: Ácido salicílico, niacinamida, zinc
**Evita**: Productos muy oclusivos o con aceites pesados

¿Te gustaría que profundice en algún paso específico?`;
    }
    
    if (lowerMessage.includes('acné') || lowerMessage.includes('manchas')) {
      return `Para tratar manchas de acné, te sugiero:

✨ **Tratamiento nocturno**: Retinol o retinoides (empezar gradualmente)
🎯 **Spot treatment**: Peróxido de benzoilo al 2.5%
🌟 **Exfoliación química**: AHA/BHA 2-3 veces por semana
🧴 **Vitamina C**: Por las mañanas para unificar tono

**Cronograma sugerido**:
- Semana 1-2: Solo limpieza suave + hidratante
- Semana 3-4: Agregar tratamiento 1x por semana
- Semana 5+: Aumentar frecuencia gradualmente

¡La paciencia es clave! Los resultados se ven en 6-12 semanas.`;
    }
    
    if (lowerMessage.includes('protector') || lowerMessage.includes('solar') || lowerMessage.includes('spf')) {
      return `El protector solar ideal depende de tu tipo de piel:

**Piel Grasa** 🧴
- Fórmulas gel o fluidas
- Oil-free y no comedogénicas
- SPF 30-50

**Piel Seca** 💧
- Fórmulas cremosas con ceramidas
- Con ingredientes hidratantes
- SPF 30-50

**Piel Sensible** 🌿
- Filtros minerales (zinc/titanio)
- Sin fragancias ni alcohol
- SPF 30-50

**Consejos de aplicación**:
- 2mg/cm² (1/4 cucharadita para rostro)
- Reaplicar cada 2-3 horas
- Usar incluso en días nublados

¿Cuál es tu tipo de piel para darte una recomendación más específica?`;
    }
    
    if (lowerMessage.includes('rutina') && lowerMessage.includes('anti')) {
      return `Rutina anti-aging efectiva por edades:

**25-30 años** 🌱
- Prevención con antioxidantes (Vitamina C)
- Retinol suave 1-2x por semana
- Hidratación intensa + SPF

**30-40 años** 🌟
- Retinol/retinoides más potentes
- Péptidos y factores de crecimiento
- Ácido hialurónico + niacinamida

**40+ años** ✨
- Tratamientos profesionales complementarios
- Ingredientes potentes (tretinoin)
- Cuidado específico de cuello y contorno

**Pasos básicos**:
1. Limpieza suave
2. Sérum antioxidante (AM) / Retinol (PM)
3. Hidratante con péptidos
4. SPF obligatorio en el día

¿En qué rango de edad te encuentras?`;
    }
    
    // Respuesta genérica pero útil
    return `Gracias por tu pregunta sobre skincare. Basándome en la información más actualizada, te recomiendo consultar con un dermatólogo para obtener consejos personalizados.

Mientras tanto, algunos principios generales:
- Mantén una rutina consistente
- Introduce productos nuevos gradualmente
- Usa siempre protector solar
- Escucha a tu piel y ajusta según sea necesario

¿Hay algo más específico en lo que pueda ayudarte? Puedo darte consejos sobre ingredientes, rutinas por tipo de piel, o productos específicos.`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const response = await generateAIResponse(userMessage.text);
      
      setIsTyping(false);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo en unos momentos.',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageText = (text: string) => {
    // Convertir markdown básico a JSX
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Asistente IA SkinCare</h2>
            <p className="text-blue-100 text-sm">Especialista en cuidado facial personalizado</p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 mt-3 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-blue-100">Online • Responde en segundos</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-4 bg-white/50 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-sm'
                  : 'bg-white shadow-md text-gray-800 rounded-bl-sm border border-gray-100'
              }`}
            >
              {message.sender === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                  <span className="text-lg">🤖</span>
                  <span>Asistente IA</span>
                </div>
              )}
              
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {formatMessageText(message.text)}
              </div>
              
              <div className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white shadow-md p-3 rounded-2xl rounded-bl-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-lg">🤖</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm">escribiendo...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {showSuggestions && messages.length === 1 && (
        <div className="p-4 bg-white/70 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">💡 Preguntas populares:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.slice(0, 4).map((question) => (
              <button
                key={question.id}
                onClick={() => handleSuggestedQuestion(question.text)}
                className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 text-sm text-gray-700"
              >
                <span className="mr-2">{question.emoji}</span>
                {question.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregúntame sobre skincare, rutinas, productos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white shadow-sm text-gray-700"
              disabled={isLoading}
            />
            {inputValue && (
              <button
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              !inputValue.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="text-lg">📤</span>
            )}
          </button>
        </div>
        
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => handleSuggestedQuestion('¿Qué rutina me recomiendas?')}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
          >
            🧴 Rutina personalizada
          </button>
          <button
            onClick={() => handleSuggestedQuestion('Analiza mi tipo de piel')}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors"
          >
            🔍 Análisis de piel
          </button>
          <button
            onClick={() => handleSuggestedQuestion('Recomiéndame productos')}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition-colors"
          >
            ⭐ Productos recomendados
          </button>
        </div>
      </div>

      {/* Footer stats */}
      <div className="px-4 pb-4">
        <div className="flex justify-center gap-6 text-xs text-gray-500">
          <span>✨ Respuestas personalizadas</span>
          <span>🧠 IA especializada en skincare</span>
          <span>⚡ Respuestas en tiempo real</span>
        </div>
      </div>
    </div>
  );
}