// RoutineDisplay.tsx
'use client';

// --- Interfaces (Deben coincidir EXACTAMENTE con Home.tsx) ---
interface RoutineStep {
  id: number;
  description: string;
  product?: string; // Este es el campo que Home.tsx usa para el producto
}

interface Routine {
  id: string;
  steps: RoutineStep[];
  // 'title' y 'notes' no están en la definición de Home.tsx, por lo que no se usarán directamente desde routine.prop
}

// Para el resumen del diagnóstico (sigue siendo opcional)
interface DiagnosisSummary {
  skinTypeLabel?: string;
  concernsLabels?: string[];
  skinGoalsLabels?: string[];
  budgetLabel?: string;
}

interface RoutineDisplayProps {
  routine: Routine; // Esta es la rutina que Home.tsx pasa
  onUpdateDiagnosis: () => void;
  diagnosisSummary?: DiagnosisSummary; // Esta prop es opcional y no se pasa desde Home.tsx
}

// --- Iconos SVG (Se mantienen igual) ---
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM13.25 5.576a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm-6.5 0a.75.75 0 010 1.06L5.689 7.7a.75.75 0 11-1.06-1.061l1.06-1.06a.75.75 0 011.061 0zM17 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-11.5.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM10 17a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zm3.25-2.25a.75.75 0 010-1.061l1.06-1.06a.75.75 0 011.061 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm-7.561-1.06a.75.75 0 01-1.06 0l-1.06-1.061a.75.75 0 111.06-1.06l1.06 1.06a.75.75 0 010 1.06zM10 5a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
  </svg>
);

const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

// --- Componente RoutineDisplay Ajustado ---
export default function RoutineDisplay({ routine, onUpdateDiagnosis, diagnosisSummary }: RoutineDisplayProps) {

  const StepCard = ({ step }: { step: RoutineStep }) => (
    <div className="bg-pink-50 p-5 rounded-xl shadow-md transition-all hover:shadow-lg">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {step.id} {/* Usamos el id del paso directamente */}
        </div>
        <div className="flex-grow">
          {/* La 'description' ahora contiene la acción y posible momento del día */}
          <h4 className="text-lg font-semibold text-pink-700">{step.description}</h4>
          {step.product && ( // Usamos step.product como viene de Home.tsx
            <p className="mt-1 text-md text-gray-700 font-medium">
              Sugerencia: <span className="text-pink-600">{step.product}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-xl my-8">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <SparklesIcon className="w-16 h-16 text-pink-500 mx-auto mb-3" />
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Tu Rutina Personalizada {/* Título genérico ya que routine.title no está en el tipo de Home.tsx */}
        </h2>
        <p className="text-md text-gray-600 mt-2">
          ¡Aquí tienes los pasos recomendados para cuidar tu piel!
        </p>
      </div>

      {/* Resumen del Diagnóstico (Opcional y no se pasará desde Home.tsx en este caso) */}
      {diagnosisSummary && (
        <div className="mb-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <ClipboardCheckIcon className="w-6 h-6 text-pink-500 mr-2" />
            Basado en tu Diagnóstico:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            {diagnosisSummary.skinTypeLabel && (
              <p><span className="font-medium text-gray-800">Tipo de Piel:</span> {diagnosisSummary.skinTypeLabel}</p>
            )}
            {diagnosisSummary.concernsLabels && diagnosisSummary.concernsLabels.length > 0 && (
              <p><span className="font-medium text-gray-800">Preocupaciones:</span> {diagnosisSummary.concernsLabels.join(', ')}</p>
            )}
            {diagnosisSummary.skinGoalsLabels && diagnosisSummary.skinGoalsLabels.length > 0 && (
              <p><span className="font-medium text-gray-800">Objetivos:</span> {diagnosisSummary.skinGoalsLabels.join(', ')}</p>
            )}
            {diagnosisSummary.budgetLabel && (
              <p><span className="font-medium text-gray-800">Presupuesto:</span> {diagnosisSummary.budgetLabel}</p>
            )}
          </div>
        </div>
      )}

      {/* Pasos de la Rutina */}
      {/* 'routine.notes' no está en el tipo de Home.tsx */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-5">
          Pasos de tu Rutina:
        </h3>
        <div className="space-y-4">
          {routine.steps.map((step) => ( // No se usa 'index' si step.id es único y fiable
            <StepCard key={`step-${step.id}`} step={step} />
          ))}
        </div>
      </div>


      {/* Botón para Actualizar Diagnóstico */}
      <div className="mt-12 text-center">
        <button
          onClick={onUpdateDiagnosis}
          className="px-8 py-3 border-2 border-pink-500 text-pink-600 font-semibold rounded-xl
                     hover:bg-pink-500 hover:text-white transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Ajustar mi Diagnóstico
        </button>
      </div>
    </div>
  );
}