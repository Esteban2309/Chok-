'use client';

// Componente Placeholder para el Análisis de Rostro con IA (Fase 2)
export default function AIAnalysis() {
  // Aquí iría la lógica para cargar imágenes, interactuar con la API de IA,
  // mostrar resultados del análisis (poros, grasa, manchas, etc.)

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Análisis de Rostro con IA</h2>
      <p className="text-gray-600 mb-6">
        Esta sección permitirá cargar una foto de tu rostro para un análisis más preciso de tu piel.
        (Funcionalidad en desarrollo - Fase 2)
      </p>
      {/* Aquí iría el input para subir la imagen y mostrar los resultados */}
      <div className="mt-4 p-4 border border-dashed rounded-md text-gray-500">
        [Área para subir imagen y mostrar resultados del análisis IA]
      </div>
    </div>
  );
}
