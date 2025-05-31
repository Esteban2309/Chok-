'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AnalysisResults } from '../../types/analysis';

// Interfaces y tipos
interface DiagnosisFormProps {
  onSubmit: (formData: DiagnosisData) => void;
  className?: string;
  isLoading?: boolean;
  currencyCode?: string; // Ejemplo: "USD", "EUR", "MXN"
  currencySymbol?: string; // Ejemplo: "$", "€"
}

interface DiagnosisData {
  skinType: string;
  concerns: string[];
  skinConditions: string[];
  budget: string;
  age: string;
  currentRoutine: string;
  skinGoals: string[];
  allergies: string;
  lifestyle: {
    sunExposure: string;
    stressLevel: string;
    sleepHours: string;
    exerciseFrequency: string;
  };
  environment: {
    climate: string;
    pollution: string;
  };
  previousProducts: string;
  timeCommitment: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// Datos de opciones
const SKIN_TYPES = [
  { value: 'normal', label: 'Normal', description: 'Equilibrada, sin exceso de grasa ni sequedad' },
  { value: 'dry', label: 'Seca', description: 'Tirante, escamosa, puede picar' },
  { value: 'oily', label: 'Grasa', description: 'Brillosa, poros dilatados, propensa al acné' },
  { value: 'combination', label: 'Mixta', description: 'Grasa en zona T, normal/seca en mejillas' },
  { value: 'sensitive', label: 'Sensible', description: 'Se irrita fácilmente, reactiva a productos' }
];

const SKIN_CONCERNS = [
  { value: 'acne', label: 'Acné', icon: '🔴' },
  { value: 'blackheads', label: 'Puntos negros', icon: '⚫' },
  { value: 'wrinkles', label: 'Arrugas', icon: '📏' },
  { value: 'dark_spots', label: 'Manchas oscuras', icon: '🟤' },
  { value: 'large_pores', label: 'Poros dilatados', icon: '🕳️' },
  { value: 'dullness', label: 'Falta de luminosidad', icon: '💫' },
  { value: 'redness', label: 'Enrojecimiento', icon: '🔴' },
  { value: 'dehydration', label: 'Deshidratación', icon: '💧' }
];

const SKIN_CONDITIONS = [
  { value: 'rosacea', label: 'Rosácea' },
  { value: 'eczema', label: 'Eczema' },
  { value: 'psoriasis', label: 'Psoriasis' },
  { value: 'melasma', label: 'Melasma' },
  { value: 'none', label: 'Ninguna' }
];

const SKIN_GOALS = [
  { value: 'anti_aging', label: 'Anti-envejecimiento', icon: '⏰' },
  { value: 'hydration', label: 'Hidratación', icon: '💧' },
  { value: 'brightening', label: 'Luminosidad', icon: '✨' },
  { value: 'acne_control', label: 'Control del acné', icon: '🎯' },
  { value: 'even_tone', label: 'Tono uniforme', icon: '🎨' },
  { value: 'pore_minimizing', label: 'Minimizar poros', icon: '🔍' }
];

// Iconos SVG (sin cambios)
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LoadingIcon = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Componente principal
export default function DiagnosisForm({
  onSubmit,
  className = '',
  isLoading = false,
  currencyCode = 'MXN', // Valor por defecto para el código de divisa
  currencySymbol = '$' // Valor por defecto para el símbolo de divisa
}: DiagnosisFormProps) {
  // Estados del formulario
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DiagnosisData>({
    skinType: '',
    concerns: [],
    skinConditions: [],
    budget: '',
    age: '',
    currentRoutine: '',
    skinGoals: [],
    allergies: '',
    lifestyle: {
      sunExposure: '',
      stressLevel: '',
      sleepHours: '',
      exerciseFrequency: ''
    },
    environment: {
      climate: '',
      pollution: ''
    },
    previousProducts: '',
    timeCommitment: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  // const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set()); // No se usa, se puede eliminar si no hay planes para usarlo

  const totalSteps = 5;

  // Validación por pasos
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.skinType) newErrors.skinType = 'Selecciona tu tipo de piel';
        if (formData.concerns.length === 0) newErrors.concerns = 'Selecciona al menos una preocupación';
        break;
      case 2:
        if (!formData.age) newErrors.age = 'Selecciona tu rango de edad';
        if (formData.skinConditions.length === 0) newErrors.skinConditions = 'Selecciona una opción';
        break;
      case 3:
        if (!formData.lifestyle.sunExposure) newErrors.sunExposure = 'Selecciona tu exposición al sol';
        if (!formData.lifestyle.stressLevel) newErrors.stressLevel = 'Selecciona tu nivel de estrés';
        // Opcional: añadir validación para sleepHours y exerciseFrequency si se vuelven obligatorios
        break;
      case 4:
        if (formData.skinGoals.length === 0) newErrors.skinGoals = 'Selecciona al menos un objetivo';
        if (!formData.budget) newErrors.budget = 'Selecciona tu presupuesto';
        break;
      case 5:
        if (!formData.timeCommitment) newErrors.timeCommitment = 'Selecciona tu disponibilidad de tiempo';
        // Opcional: añadir validación para otros campos del paso 5 si se vuelven obligatorios
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Progreso del formulario
  const progress = useMemo(() => (currentStep / totalSteps) * 100, [currentStep]);

  // Manejar cambios en arrays
  const handleArrayChange = useCallback((field: keyof DiagnosisData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return { ...prev, [field]: newArray };
    });
  }, []);

  // Manejar cambios en objetos anidados
  const handleNestedChange = useCallback((parent: keyof DiagnosisData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as object),
        [field]: value
      }
    }));
  }, []);

  // Navegar entre pasos
  const nextStep = useCallback(() => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
      window.scrollTo(0, 0); // <--- SCROLL AL INICIO
    }
  }, [currentStep, validateStep, totalSteps]); // totalSteps añadido por completitud, aunque sea constante en este scope

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
      window.scrollTo(0, 0); // <--- SCROLL AL INICIO
    }
  }, [currentStep]);

  // Enviar formulario
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  }, [currentStep, formData, onSubmit, validateStep]);

  // Componente de progreso
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Paso {currentStep} de {totalSteps}</span>
        <span className="text-sm font-medium text-pink-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  // Componente de selección múltiple
  const MultiSelect = ({ options, selected, onChange, error }: {
    options: Array<{ value: string; label: string; icon?: string }>;
    selected: string[];
    onChange: (value: string) => void;
    error?: string;
  }) => (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selected.includes(option.value)
                ? 'border-pink-500 bg-pink-50 text-pink-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              {option.icon && (
                <span className="text-xl">{option.icon}</span>
              )}
              <span className="font-medium">{option.label}</span>
              {selected.includes(option.value) && (
                <CheckIcon className="w-5 h-5 text-pink-500 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );

  // Renderizar contenido por paso
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <UserIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu Tipo de Piel</h3>
              <p className="text-gray-600">Identifica tu tipo de piel y principales preocupaciones</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuál es tu tipo de piel?
              </label>
              <div className="space-y-3">
                {SKIN_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, skinType: type.value }))}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.skinType === type.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{type.label}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      {formData.skinType === type.value && (
                        <CheckIcon className="w-6 h-6 text-pink-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.skinType && <p className="mt-2 text-sm text-red-600">{errors.skinType}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuáles son tus principales preocupaciones? (Selecciona todas las que apliquen)
              </label>
              <MultiSelect
                options={SKIN_CONCERNS}
                selected={formData.concerns}
                onChange={(value) => handleArrayChange('concerns', value)}
                error={errors.concerns}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <HeartIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Información Personal</h3>
              <p className="text-gray-600">Ayúdanos a personalizar tu rutina según tu perfil</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuál es tu rango de edad?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '18-25', label: '18-25 años' },
                  { value: '26-35', label: '26-35 años' },
                  { value: '36-45', label: '36-45 años' },
                  { value: '46+', label: '46+ años' }
                ].map((age) => (
                  <button
                    key={age.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, age: age.value }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.age === age.value
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{age.label}</span>
                    {formData.age === age.value && (
                      <CheckIcon className="w-5 h-5 text-pink-500 float-right" />
                    )}
                  </button>
                ))}
              </div>
              {errors.age && <p className="mt-2 text-sm text-red-600">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Tienes alguna condición específica de la piel?
              </label>
              <MultiSelect
                options={SKIN_CONDITIONS}
                selected={formData.skinConditions}
                onChange={(value) => handleArrayChange('skinConditions', value)}
                error={errors.skinConditions}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Tienes alergias conocidas a productos de belleza?
              </label>
              <textarea
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="Describe cualquier alergia o sensibilidad conocida..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <SunIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu Estilo de Vida</h3>
              <p className="text-gray-600">Factores que pueden afectar tu piel</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuánta exposición al sol tienes diariamente?
              </label>
              <div className="space-y-3">
                {[
                  { value: 'minimal', label: 'Mínima', description: 'Casi siempre en interiores' },
                  { value: 'moderate', label: 'Moderada', description: 'Algunas horas al día' },
                  { value: 'high', label: 'Alta', description: 'Muchas horas al aire libre' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleNestedChange('lifestyle', 'sunExposure', option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.lifestyle.sunExposure === option.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{option.label}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      {formData.lifestyle.sunExposure === option.value && (
                        <CheckIcon className="w-6 h-6 text-pink-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.sunExposure && <p className="mt-2 text-sm text-red-600">{errors.sunExposure}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuál es tu nivel de estrés habitual?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: '😌 Bajo' },
                  { value: 'medium', label: '😐 Medio' },
                  { value: 'high', label: '😰 Alto' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleNestedChange('lifestyle', 'stressLevel', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.lifestyle.stressLevel === option.value
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              {errors.stressLevel && <p className="mt-2 text-sm text-red-600">{errors.stressLevel}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Horas de sueño
                </label>
                <select
                  value={formData.lifestyle.sleepHours}
                  onChange={(e) => handleNestedChange('lifestyle', 'sleepHours', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona...</option>
                  <option value="less-than-6">Menos de 6 horas</option>
                  <option value="6-7">6-7 horas</option>
                  <option value="7-8">7-8 horas</option>
                  <option value="more-than-8">Más de 8 horas</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Ejercicio semanal
                </label>
                <select
                  value={formData.lifestyle.exerciseFrequency}
                  onChange={(e) => handleNestedChange('lifestyle', 'exerciseFrequency', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona...</option>
                  <option value="never">Nunca</option>
                  <option value="1-2">1-2 veces</option>
                  <option value="3-4">3-4 veces</option>
                  <option value="5-plus">5+ veces</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        const budgetOptions = [
          {
            value: 'low',
            label: 'Económico',
            description: `Hasta ${currencySymbol}500 ${currencyCode}`,
            range: `${currencySymbol}100 - ${currencySymbol}500`
          },
          {
            value: 'medium',
            label: 'Medio',
            description: `${currencySymbol}500 - ${currencySymbol}1,500 ${currencyCode}`,
            range: `${currencySymbol}500 - ${currencySymbol}1,500`
          },
          {
            value: 'high',
            label: 'Premium',
            description: `${currencySymbol}1,500 - ${currencySymbol}3,000 ${currencyCode}`,
            range: `${currencySymbol}1,500 - ${currencySymbol}3,000`
          },
          {
            value: 'luxury',
            label: 'Lujo',
            description: `Más de ${currencySymbol}3,000 ${currencyCode}`,
            range: `${currencySymbol}3,000+`
          }
        ];
        return (
          <div className="space-y-8">
            <div className="text-center">
              <HeartIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tus Objetivos</h3>
              <p className="text-gray-600">¿Qué quieres lograr con tu rutina de cuidado?</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuáles son tus objetivos principales? (Selecciona todos los que apliquen)
              </label>
              <MultiSelect
                options={SKIN_GOALS}
                selected={formData.skinGoals}
                onChange={(value) => handleArrayChange('skinGoals', value)}
                error={errors.skinGoals}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuál es tu presupuesto mensual aproximado?
              </label>
              <div className="space-y-3">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, budget: budget.value }))}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.budget === budget.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{budget.label}</h4>
                        <p className="text-sm text-gray-600">{budget.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-pink-600">{budget.range}</span>
                        {formData.budget === budget.value && (
                          <CheckIcon className="w-6 h-6 text-pink-500 ml-2 inline-block" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.budget && <p className="mt-2 text-sm text-red-600">{errors.budget}</p>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <ClockIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Últimos Detalles</h3>
              <p className="text-gray-600">Información final para personalizar tu rutina</p>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuánto tiempo puedes dedicar a tu rutina diaria?
              </label>
              <div className="space-y-3">
                {[
                  { value: 'minimal', label: '⚡ Rápida', description: '5-10 minutos (mañana y noche)' },
                  { value: 'moderate', label: '⏰ Estándar', description: '10-20 minutos (mañana y noche)' },
                  { value: 'extensive', label: '💆‍♀️ Completa', description: '20+ minutos (me encanta el self-care)' }
                ].map((time) => (
                  <button
                    key={time.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, timeCommitment: time.value }))}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.timeCommitment === time.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{time.label}</h4>
                        <p className="text-sm text-gray-600">{time.description}</p>
                      </div>
                      {formData.timeCommitment === time.value && (
                        <CheckIcon className="w-6 h-6 text-pink-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.timeCommitment && <p className="mt-2 text-sm text-red-600">{errors.timeCommitment}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Cuál es tu rutina actual de cuidado de la piel?
              </label>
              <textarea
                value={formData.currentRoutine}
                onChange={(e) => setFormData(prev => ({ ...prev, currentRoutine: e.target.value }))}
                placeholder="Describe los productos que usas actualmente (limpiador, hidratante, serum, etc.)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                ¿Has tenido malas experiencias con productos anteriores?
              </label>
              <textarea
                value={formData.previousProducts}
                onChange={(e) => setFormData(prev => ({ ...prev, previousProducts: e.target.value }))}
                placeholder="Menciona productos que no funcionaron o causaron reacciones..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Clima donde vives
                </label>
                <select
                  value={formData.environment.climate}
                  onChange={(e) => handleNestedChange('environment', 'climate', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona...</option>
                  <option value="humid">Húmedo</option>
                  <option value="dry">Seco</option>
                  <option value="tropical">Tropical</option>
                  <option value="cold">Frío</option>
                  <option value="temperate">Templado</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Nivel de contaminación
                </label>
                <select
                  value={formData.environment.pollution}
                  onChange={(e) => handleNestedChange('environment', 'pollution', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona...</option>
                  <option value="low">Bajo</option>
                  <option value="medium">Medio</option>
                  <option value="high">Alto</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white ${className}`}>
      <ProgressBar />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStepContent()}
        
        {/* Botones de navegación */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Anterior
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i + 1 === currentStep
                    ? 'bg-pink-500'
                    : i + 1 < currentStep
                    ? 'bg-pink-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {currentStep === totalSteps ? (
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingIcon className="w-5 h-5" />
                  Generando diagnóstico...
                </>
              ) : (
                '✨ Crear mi rutina personalizada'
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
            >
              Siguiente
            </button>
          )}
        </div>
      </form>

      {/* Resumen de progreso */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Progreso completado</span>
          {/* ... (resto del código sin cambios) ... */}
          <span className="font-medium text-pink-600">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}