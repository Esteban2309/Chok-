import { useState, useEffect, useMemo } from 'react';

// --- Interfaces Mejoradas ---
interface RoutineStep {
  id: number;
  description: string;
  product?: string;
  timeOfDay?: 'morning' | 'evening' | 'both';
  category?: 'cleansing' | 'treatment' | 'moisturizing' | 'protection';
  importance?: 'essential' | 'important' | 'optional';
  duration?: string;
  frequency?: string;
  tips?: string[];
  ingredients?: string[];
  order?: number;
}

interface Routine {
  id: string;
  steps: RoutineStep[];
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  title?: string;
  notes?: string;
}

interface DiagnosisSummary {
  skinTypeLabel?: string;
  concernsLabels?: string[];
  skinGoalsLabels?: string[];
  budgetLabel?: string;
  sensitivity?: string;
  ageRange?: string;
  climate?: string;
}

interface RoutineDisplayProps {
  routine: Routine;
  onUpdateDiagnosis: () => void;
  diagnosisSummary?: DiagnosisSummary;
  onStepComplete?: (stepId: number) => void;
  onProductSelect?: (productName: string) => void;
  onSaveRoutine?: () => void;
  onShareRoutine?: () => void;
}

// --- Iconos SVG Completos ---
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM13.25 5.576a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm-6.5 0a.75.75 0 010 1.06L5.689 7.7a.75.75 0 11-1.06-1.061l1.06-1.06a.75.75 0 011.061 0zM17 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-11.5.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM10 17a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zm3.25-2.25a.75.75 0 010-1.061l1.06-1.06a.75.75 0 011.061 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm-7.561-1.06a.75.75 0 01-1.06 0l-1.06-1.061a.75.75 0 111.06-1.06l1.06 1.06a.75.75 0 010 1.06zM10 5a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
  </svg>
);

const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
  </svg>  
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const LightBulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 2.33.793 4.477 2.125 6.186.4.514.969 1.064 1.687 1.564.724.495 1.641.749 2.688.813v-2.313c-.458-.139-.897-.35-1.296-.636-.463-.333-.894-.734-1.264-1.186C5.117 14.937 4.5 13.407 4.5 12c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 1.407-.617 2.937-1.69 4.243-.37.452-.801.853-1.264 1.186-.399.286-.838.497-1.296.636v2.313c1.047-.064 1.964-.318 2.688-.813.718-.5 1.287-1.05 1.687-1.564 1.332-1.709 2.125-3.856 2.125-6.186C21.75 6.615 17.385 2.25 12 2.25zm-1.5 13.5v3h3v-3h-3z"/>
  </svg>
);

const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h9a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25H10.5v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v-.744zm13.5 0v-.744a45.622 45.622 0 012.006.343 5.265 5.265 0 01-2.863 3.207A6.72 6.72 0 0018.666 5.25z" clipRule="evenodd"/>
  </svg>
);

// --- Componente Principal Mejorado ---
export default function RoutineDisplay({ 
  routine = {
    id: 'sample-routine',
    title: 'Mi Rutina de Cuidado Facial',
    steps: [
      { id: 1, description: 'Limpieza facial con gel suave', product: 'Limpiador Hidratante CeraVe' },
      { id: 2, description: 'Aplicar tónico equilibrante', product: 'Tónico Facial The Ordinary' },
      { id: 3, description: 'Sérum con Vitamina C', product: 'Sérum Vitamina C SkinCeuticals' },
      { id: 4, description: 'Hidratante facial', product: 'Crema Hidratante Neutrogena' },
      { id: 5, description: 'Protector solar SPF 30+', product: 'Protector Solar La Roche-Posay' }
    ],
    estimatedTime: '8-12 min',
    difficulty: 'beginner'
  }, 
  onUpdateDiagnosis = () => console.log('Update diagnosis'),
  diagnosisSummary = {
    skinTypeLabel: 'Piel mixta',
    concernsLabels: ['Poros dilatados', 'Opacidad'],
    skinGoalsLabels: ['Hidratación', 'Luminosidad'],
    budgetLabel: 'Medio',
    sensitivity: 'Baja',
    ageRange: '25-35',
    climate: 'Templado'
  },
  onStepComplete = (stepId: number) => console.log('Step completed:', stepId),
  onProductSelect = (productName: string) => console.log('Product selected:', productName),
  onSaveRoutine = () => console.log('Routine saved'),
  onShareRoutine = () => console.log('Routine shared')
}: RoutineDisplayProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [expandedTips, setExpandedTips] = useState<Set<number>>(new Set());
  const [showProgress, setShowProgress] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [savedRoutine, setSavedRoutine] = useState(false);

  // Simular datos mejorados para los pasos existentes
  const enhancedSteps = useMemo(() =>
    routine.steps.map((step, index) => ({
      ...step,
      timeOfDay: (index % 3 === 0 ? 'morning' : index % 3 === 1 ? 'evening' : 'both') as 'morning' | 'evening' | 'both',
      category: (['cleansing', 'treatment', 'moisturizing', 'protection'][index % 4]) as 'cleansing' | 'treatment' | 'moisturizing' | 'protection',
      importance: (index < 2 ? 'essential' : index < 4 ? 'important' : 'optional') as 'essential' | 'important' | 'optional',
      duration: (['2-3 minutos', '1-2 minutos', '30 segundos', '1 minuto'][index % 4]) as string,
      frequency: (index < 4 ? 'Diariamente' : '2-3 veces por semana') as string,
      tips: [
        'Usa movimientos circulares suaves para activar la circulación',
        'Aplica con la piel ligeramente húmeda para mejor absorción',
        'Espera 30 segundos antes del siguiente paso para mejor penetración',
        'Usa la cantidad equivalente a un guisante para todo el rostro'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      ingredients: [
        'Ácido Hialurónico', 'Vitamina C', 'Ceramidas', 'Niacinamida',
        'Retinol', 'Péptidos', 'Antioxidantes', 'Ácido Salicílico'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      order: index + 1
    })).sort((a, b) => a.order - b.order), [routine.steps]
  );

  // Filtrar pasos por momento del día
  const filteredSteps = useMemo(() => {
    if (selectedTimeFilter === 'all') return enhancedSteps;
    return enhancedSteps.filter(step => 
      step.timeOfDay === selectedTimeFilter || step.timeOfDay === 'both'
    );
  }, [enhancedSteps, selectedTimeFilter]);

  // Calcular estadísticas
  const progress = enhancedSteps.length > 0 ? (completedSteps.size / enhancedSteps.length) * 100 : 0;
  const completedToday = completedSteps.size;
  const totalSteps = enhancedSteps.length;
  const estimatedTime = routine.estimatedTime || `${totalSteps * 2}-${totalSteps * 3} min`;

  // Manejar completar paso
  const handleStepComplete = (stepId: number) => {
    const newCompleted = new Set(completedSteps);
    if (completedSteps.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
    onStepComplete?.(stepId);

    // Mostrar celebración si se completa todo
    if (newCompleted.size === totalSteps && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Toggle tips expandidos
  const toggleTips = (stepId: number) => {
    const newExpanded = new Set(expandedTips);
    if (expandedTips.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedTips(newExpanded);
  };

  // Manejar guardar rutina
  const handleSaveRoutine = () => {
    setSavedRoutine(true);
    onSaveRoutine?.();
    setTimeout(() => setSavedRoutine(false), 2000);
  };

  // Obtener icono por categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleansing': return '🧼';
      case 'treatment': return '✨';
      case 'moisturizing': return '💧';
      case 'protection': return '🛡️';
      default: return '🌟';
    }
  };

  // Obtener color por importancia
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential': return 'from-red-500 to-pink-500';
      case 'important': return 'from-orange-500 to-yellow-500';
      case 'optional': return 'from-blue-500 to-indigo-500';
      default: return 'from-pink-500 to-rose-500';
    }
  };

  // Componente de paso mejorado
  const EnhancedStepCard = ({ step, index }: { 
    step: RoutineStep & { 
      timeOfDay: 'morning' | 'evening' | 'both', 
      category: string, 
      importance: 'essential' | 'important' | 'optional', 
      duration: string, 
      frequency: string, 
      tips: string[], 
      ingredients: string[],
      order: number
    }, 
    index: number 
  }) => {
    const isCompleted = completedSteps.has(step.id);
    const isExpanded = expandedTips.has(step.id);

    return (
      <div className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1 ${
        isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 scale-[0.98]' : 'bg-white border border-gray-200'
      }`}>
        {/* Barra de color por importancia */}
        <div className={`h-1.5 bg-gradient-to-r ${getImportanceColor(step.importance)}`} />
        
        {/* Animación de celebración para pasos completados */}
        {isCompleted && (
          <div className="absolute top-4 right-4 animate-bounce">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🎉</span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {/* Header del paso */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4 flex-grow">
              <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-500 text-white scale-110' 
                  : `bg-gradient-to-r ${getImportanceColor(step.importance)} text-white hover:scale-105`
              }`}>
                {isCompleted ? <CheckCircleIcon className="w-7 h-7" /> : step.order}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl animate-pulse">{getCategoryIcon(step.category)}</span>
                  <h4 className={`text-lg font-semibold transition-colors duration-300 ${
                    isCompleted ? 'text-green-700 line-through decoration-2' : 'text-gray-800'
                  }`}>
                    {step.description}
                  </h4>
                  
                  {/* Badges de momento del día */}
                  <div className="flex gap-2 flex-wrap">
                    {(step.timeOfDay === 'morning' || step.timeOfDay === 'both') && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs rounded-full font-medium">
                        <SunIcon className="w-3 h-3" />
                        Mañana
                      </span>
                    )}
                    {(step.timeOfDay === 'evening' || step.timeOfDay === 'both') && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-xs rounded-full font-medium">
                        <MoonIcon className="w-3 h-3" />
                        Noche
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Información adicional */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{step.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                    <span className="w-4 h-4 text-center">📅</span>
                    <span className="font-medium">{step.frequency}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    step.importance === 'essential' ? 'bg-red-100 text-red-800' :
                    step.importance === 'important' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {step.importance === 'essential' ? '🔥 Esencial' : 
                     step.importance === 'important' ? '⚡ Importante' : '💎 Opcional'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botón de completar */}
            <button
              onClick={() => handleStepComplete(step.id)}
              className={`flex-shrink-0 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isCompleted
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                  : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500 hover:shadow-md'
              }`}
            >
              <CheckCircleIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Producto recomendado */}
          {step.product && (
            <div className="mb-4 p-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl border border-pink-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">💜</span>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Producto recomendado:
                  </p>
                  <button
                    onClick={() => onProductSelect?.(step.product!)}
                    className="text-pink-600 font-semibold hover:text-pink-800 hover:underline transition-colors text-left"
                  >
                    {step.product}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ingredientes clave */}
          {step.ingredients.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs">🧪</span>
                Ingredientes clave:
              </p>
              <div className="flex flex-wrap gap-2">
                {step.ingredients.map((ingredient, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium hover:shadow-sm transition-shadow">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tips expandibles */}
          {step.tips.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => toggleTips(step.id)}
                className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors group"
              >
                <LightBulbIcon className="w-5 h-5 group-hover:animate-pulse" />
                Tips de aplicación ({step.tips.length})
                <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {isExpanded && (
                <div className="mt-4 space-y-3">
                  {step.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Celebración por completar toda la rutina */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 mx-4 max-w-md text-center transform animate-bounce">
            <div className="text-6xl mb-4 animate-pulse">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Rutina Completada!</h3>
            <p className="text-gray-600 mb-4">¡Excelente trabajo cuidando tu piel hoy!</p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <TrophyIcon className="w-6 h-6" />
              <span className="font-semibold">¡Logro desbloqueado!</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header principal con animaciones */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mb-6 animate-bounce">
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {routine.title || 'Tu Rutina Personalizada'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Una rutina diseñada especialmente para ti. ¡Sigue cada paso y ve los resultados!
            </p>

            {/* Estadísticas en tiempo real */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{completedToday}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completados hoy</p>
                    <p className="font-bold text-gray-800">{completedToday}/{totalSteps} pasos</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tiempo estimado</p>
                    <p className="font-bold text-gray-800">{estimatedTime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{routine.difficulty?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dificultad</p>
                    <p className="font-bold text-gray-800 capitalize">{routine.difficulty || 'Personalizada'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso interactiva */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Progreso de hoy</h3>
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="text-purple-600 hover:text-purple-800 transition-colors"
            >
              {showProgress ? 'Ocultar' : 'Ver detalles'}
            </button>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-2 font-medium">
              {Math.round(progress)}% completado
            </p>
          </div>

          {showProgress && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['essential', 'important', 'optional'].map(importance => {
                const steps = enhancedSteps.filter(s => s.importance === importance);
                const completed = steps.filter(s => completedSteps.has(s.id)).length;
                return (
                  <div key={importance} className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      importance === 'essential' ? 'bg-red-500' :
                      importance === 'important' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {completed}
                    </div>
                    <p className="text-xs text-gray-600 capitalize">{importance}</p>
                    <p className="text-xs text-gray-500">{completed}/{steps.length}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Resumen del diagnóstico mejorado */}
        {diagnosisSummary && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ClipboardCheckIcon className="w-7 h-7 text-pink-500 mr-3" />
              Tu Perfil de Piel
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagnosisSummary.skinTypeLabel && (
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
                  <h4 className="font-semibold text-pink-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-pink-200 rounded-full flex items-center justify-center text-xs mr-2">🧴</span>
                    Tipo de Piel
                  </h4>
                  <p className="text-gray-700 font-medium">{diagnosisSummary.skinTypeLabel}</p>
                </div>
              )}
              
              {diagnosisSummary.concernsLabels && diagnosisSummary.concernsLabels.length > 0 && (
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-xs mr-2">⚠️</span>
                    Preocupaciones
                  </h4>
                  <div className="space-y-1">
                    {diagnosisSummary.concernsLabels.map((concern, idx) => (
                      <span key={idx} className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1">
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {diagnosisSummary.skinGoalsLabels && diagnosisSummary.skinGoalsLabels.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs mr-2">🎯</span>
                    Objetivos
                  </h4>
                  <div className="space-y-1">
                    {diagnosisSummary.skinGoalsLabels.map((goal, idx) => (
                      <span key={idx} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {diagnosisSummary.budgetLabel && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs mr-2">💰</span>
                    Presupuesto
                  </h4>
                  <p className="text-gray-700 font-medium">{diagnosisSummary.budgetLabel}</p>
                </div>
              )}
              
              {diagnosisSummary.sensitivity && (
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center text-xs mr-2">🌸</span>
                    Sensibilidad
                  </h4>
                  <p className="text-gray-700 font-medium">{diagnosisSummary.sensitivity}</p>
                </div>
              )}
              
              {diagnosisSummary.ageRange && (
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs mr-2">👤</span>
                    Edad
                  </h4>
                  <p className="text-gray-700 font-medium">{diagnosisSummary.ageRange} años</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filtros de tiempo del día */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrar por momento del día</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'Todos los pasos', icon: '🌟' },
              { key: 'morning', label: 'Rutina Mañana', icon: '☀️' },
              { key: 'evening', label: 'Rutina Noche', icon: '🌙' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedTimeFilter(filter.key as 'all' | 'morning' | 'evening')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedTimeFilter === filter.key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }`}
              >
                <span className="text-lg">{filter.icon}</span>
                {filter.label}
                {selectedTimeFilter === filter.key && (
                  <CheckCircleIcon className="w-5 h-5 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de pasos mejorada */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Pasos de tu Rutina
              {selectedTimeFilter !== 'all' && (
                <span className="ml-2 text-lg text-purple-600">
                  ({selectedTimeFilter === 'morning' ? '☀️ Mañana' : '🌙 Noche'})
                </span>
              )}
            </h3>
            <p className="text-gray-600">
              {filteredSteps.length} paso{filteredSteps.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-6">
            {filteredSteps.map((step, index) => (
              <EnhancedStepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Notas adicionales de la rutina */}
        {routine.notes && (
          <div className="mb-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
              <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-sm mr-2">📝</span>
              Notas Importantes
            </h3>
            <p className="text-gray-700 leading-relaxed">{routine.notes}</p>
          </div>
        )}

        {/* Sección de acciones */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleSaveRoutine}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                savedRoutine
                  ? 'bg-green-500 text-white scale-105'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-lg'
              }`}
            >
              <BookmarkIcon className="w-5 h-5" />
              {savedRoutine ? '¡Rutina Guardada!' : 'Guardar Rutina'}
            </button>

            <button
              onClick={onShareRoutine}
              className="flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <ShareIcon className="w-5 h-5" />
              Compartir
            </button>

            <button
              onClick={onUpdateDiagnosis}
              className="flex items-center gap-3 px-8 py-4 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <SparklesIcon className="w-5 h-5" />
              Ajustar Diagnóstico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}