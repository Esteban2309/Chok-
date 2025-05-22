'use client';

// Componente Placeholder para el Asistente Virtual con IA (Fase 3)
export default function VirtualAssistant() {
  // Aquí iría la lógica para la interfaz del chatbot,
  // manejar preguntas del usuario y mostrar respuestas generadas por IA.

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Asistente Virtual (IA)</h2>
      <p className="text-gray-600 mb-6">
        Haz tus preguntas sobre skincare, productos o la app a nuestro chatbot inteligente.
        (Funcionalidad en desarrollo - Fase 3)
      </p>
      {/* Aquí iría la interfaz del chatbot */}
      <div className="mt-4 p-4 border border-dashed rounded-md text-gray-500 h-64 overflow-y-auto">
        [Interfaz del Chatbot]
        {/* Ejemplo de mensaje: */}
        {/* <div className="text-left mb-2">Usuario: ¿Qué productos son buenos para piel grasa?</div> */}
        {/* <div className="text-right text-blue-600 mb-2">Asistente: Para piel grasa, te recomiendo...</div> */}
      </div>
      {/* Área de input para escribir mensajes */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled // Deshabilitado en el placeholder
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled // Deshabilitado en el placeholder
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
