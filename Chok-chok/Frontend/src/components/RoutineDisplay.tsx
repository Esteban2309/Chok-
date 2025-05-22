'use client';

// Definir tipos para la rutina (debe coincidir con el tipo en page.tsx)
interface RoutineStep {
  id: number;
  description: string;
  product?: string;
}

interface Routine {
  id: string;
  steps: RoutineStep[];
}

// Definir props para el componente RoutineDisplay
interface RoutineDisplayProps {
  routine: Routine; // La rutina a mostrar
  onUpdateDiagnosis: () => void; // Función para ir a actualizar diagnóstico
}

// Componente para mostrar la rutina personalizada
export default function RoutineDisplay({ routine, onUpdateDiagnosis }: RoutineDisplayProps) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Título de la rutina */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tu Rutina Personalizada</h2>

      {/* Lista de pasos de la rutina */}
      <ul className="list-disc list-inside space-y-4">
        {routine.steps.map(step => (
          <li key={step.id} className="text-gray-700">
            <span className="font-semibold">Paso {step.id}:</span> {step.description}
            {step.product && (
              <span className="ml-2 text-sm text-gray-500">({step.product})</span>
            )}
          </li>
        ))}
      </ul>

      {/* Opción para actualizar el diagnóstico */}
      <div className="mt-6 text-center">
        <button
          className="text-pink-500 hover:text-pink-800 text-sm"
          onClick={onUpdateDiagnosis}
        >
          Actualizar mi diagnóstico
        </button>
      </div>
    </div>
  );
}
