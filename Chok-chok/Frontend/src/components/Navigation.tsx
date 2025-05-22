'use client';

// Definir props para el componente Navigation
interface NavigationProps {
  currentSection: 'routine' | 'shop' | 'ai' | 'assistant' | 'social'; // Sección actual
  navigateTo: (section: 'routine' | 'shop' | 'ai' | 'assistant' | 'social') => void; // Función para navegar
}

// Componente de Navegación
export default function Navigation({ currentSection, navigateTo }: NavigationProps) {
  // Función para obtener clases de estilo condicionales
  const getButtonClasses = (section: string) => {
    return `px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors ${
      currentSection === section
        ? 'bg-pink-500 text-white' // Estilo para la sección activa
        : 'text-gray-700 hover:bg-gray-200' // Estilo para secciones inactivas
    }`;
  };

  return (
    <nav className="flex justify-center space-x-2 md:space-x-4 overflow-x-auto pb-2">
      {/* Botón para Rutina */}
      <button
        className={getButtonClasses('routine')}
        onClick={() => navigateTo('routine')}
      >
        Rutina
      </button>
      {/* Botón para Tienda */}
      <button
        className={getButtonClasses('shop')}
        onClick={() => navigateTo('shop')}
      >
        Tienda
      </button>
      {/* Botón para Análisis IA */}
      <button
        className={getButtonClasses('ai')}
        onClick={() => navigateTo('ai')}
      >
        Análisis IA (Fase 2)
      </button>
      {/* Botón para Asistente Virtual */}
      <button
        className={getButtonClasses('assistant')}
        onClick={() => navigateTo('assistant')}
      >
        Asistente Virtual (Fase 3)
      </button>
      {/* Botón para Comunidad/Ranking */}
      <button
        className={getButtonClasses('social')}
        onClick={() => navigateTo('social')}
      >
        Comunidad (Fase 3)
      </button>
    </nav>
  );
}
