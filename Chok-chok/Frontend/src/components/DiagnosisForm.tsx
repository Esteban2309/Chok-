'use client';

import { useState } from 'react'; // Hook para manejar el estado local

// Definir props para el componente DiagnosisForm
interface DiagnosisFormProps {
  onSubmit: (formData: any) => void; // Función a llamar al enviar el formulario
}

// Componente del Formulario de Diagnóstico
export default function DiagnosisForm({ onSubmit }: DiagnosisFormProps) {
  // Estado para los datos del formulario (simplificado)
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState('');
  const [budget, setBudget] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Recopilar datos del formulario
    const formData = {
      skinType,
      concerns,
      budget,
      // Aquí se añadirían más campos como zona geográfica, hábitos, etc.
    };
    console.log('Diagnosis form data:', formData);
    onSubmit(formData); // Llamar a la función onSubmit con los datos
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Diagnóstico de Piel</h2>
      <p className="text-center text-gray-600 mb-6">Completa este formulario para obtener tu rutina personalizada.</p>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* Campo Tipo de Piel */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skinType">
            Tipo de Piel
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="skinType"
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
            required // Campo requerido
          >
            <option value="">Selecciona...</option>
            <option value="normal">Normal</option>
            <option value="dry">Seca</option>
            <option value="oily">Grasa</option>
            <option value="combination">Mixta</option>
            <option value="sensitive">Sensible</option>
          </select>
        </div>

        {/* Campo Preocupaciones */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="concerns">
            Preocupaciones Principales
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="concerns"
            placeholder="Acné, manchas, arrugas, etc."
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            rows={4} // Número de filas visible
            required // Campo requerido
          />
        </div>

        {/* Campo Presupuesto */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
            Presupuesto Aproximado
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required // Campo requerido
          >
            <option value="">Selecciona...</option>
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </select>
        </div>

        {/* Botón de envío */}
        <div className="flex items-center justify-center">
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Obtener Rutina
          </button>
        </div>
      </form>
    </div>
  );
}
