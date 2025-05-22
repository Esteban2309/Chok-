'use client';

import { useState, useEffect } from 'react';
import Auth from '@/components/Auth';
import DiagnosisForm from '@/components/DiagnosisForm';
import RoutineDisplay from '@/components/RoutineDisplay';
import ProductList from '@/components/ProductList';
import ProductDetail from '@/components/ProductDetail';
import AIAnalysis from '@/components/AIAnalysis';
import VirtualAssistant from '@/components/VirtualAssistant';
import SocialSharing from '@/components/SocialSharing';
import Navigation from '@/components/Navigation';

// Definir tipos para la rutina y productos
interface RoutineStep {
  id: number;
  description: string;
  product?: string;
}

interface Routine {
  id: string;
  steps: RoutineStep[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  // Estados principales
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsDiagnosis, setNeedsDiagnosis] = useState(false);
  const [userRoutine, setUserRoutine] = useState<Routine | null>(null);
  const [currentSection, setCurrentSection] = useState<'routine' | 'shop' | 'ai' | 'assistant' | 'social'>('routine');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Efecto para añadir una animación de entrada suave
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Función para manejar el inicio de sesión exitoso (CU02)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Simular la carga de la rutina del usuario existente
    const dummyRoutine: Routine = {
      id: 'user-routine-123',
      steps: [
        { id: 1, description: 'Limpieza facial (Mañana y Noche)', product: 'Limpiador Suave Recomendado' },
        { id: 2, description: 'Tónico Hidratante (Mañana y Noche)', product: 'Tónico Equilibrante' },
        { id: 3, description: 'Sérum Específico (Noche)', product: 'Sérum con Retinol' },
        { id: 4, description: 'Crema Hidratante (Mañana y Noche)', product: 'Crema Nutritiva' },
        { id: 5, description: 'Protector Solar (Mañana)', product: 'Protector Solar SPF 50' },
      ],
    };
    setUserRoutine(dummyRoutine);
    setNeedsDiagnosis(false);
    setCurrentSection('routine');
  };

  // Función para manejar el registro exitoso (CU01)
  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setNeedsDiagnosis(true);
    setCurrentSection('routine');
  };

  // Función para manejar el envío del formulario de diagnóstico (CU01 y CU03)
  const handleDiagnosisSubmit = (formData: any) => {
    console.log('Diagnosis form submitted:', formData);
    // Simular la generación de una rutina basada en el diagnóstico
    const generatedRoutine: Routine = {
      id: `routine-${Date.now()}`,
      steps: [
        { id: 1, description: 'Paso 1: Limpiar según tu tipo de piel' },
        { id: 2, description: 'Paso 2: Aplicar tratamiento para tus preocupaciones' },
        { id: 3, description: 'Paso 3: Hidratar adecuadamente' },
        { id: 4, description: 'Paso 4: Proteger del sol' },
      ],
    };
    setUserRoutine(generatedRoutine);
    setNeedsDiagnosis(false);
    setCurrentSection('routine');
  };

  // Función para manejar la actualización del diagnóstico (CU03)
  const handleDiagnosisUpdate = () => {
    // Redirigir al formulario de diagnóstico
    setNeedsDiagnosis(true);
  };

  // Función para navegar a una sección específica
  const navigateTo = (section: 'routine' | 'shop' | 'ai' | 'assistant' | 'social') => {
    setCurrentSection(section);
    setSelectedProduct(null);
  };

  // Función para seleccionar un producto en la tienda (CU04)
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  // Función para volver a la lista de productos (CU04)
  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start py-8 px-4 transition-opacity duration-700 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Decoración de fondo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-primary-100 filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-secondary-100 filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-accent-100 filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Logotipo y título de la aplicación */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-2">Chok-Chok</h1>
        <h2 className="text-lg text-primary-700 dark:text-primary-400 font-medium">촉촉 - Tu piel hidratada y radiante</h2>
      </div>

      {/* Contenedor principal */}
      <div className={`w-full max-w-3xl transition-all duration-500 transform ${isPageLoaded ? 'translate-y-0' : 'translate-y-4'}`}>
        
        {/* Mostrar autenticación si no está autenticado */}
        {!isAuthenticated && (
          <div className="animate-entrance justify-items-center">
            <Auth onLoginSuccess={handleLoginSuccess} onRegisterSuccess={handleRegisterSuccess} />
          </div>
        )}

        {/* Mostrar navegación y contenido si está autenticado */}
        {isAuthenticated && (
          <div className="chok-card p-6 md:p-8">
            {/* Navegación */}
            <Navigation currentSection={currentSection} navigateTo={navigateTo} />

            {/* Contenido de la sección actual */}
            <div className="mt-8 animate-entrance">
              {/* Sección de Rutina */}
              {currentSection === 'routine' && (
                needsDiagnosis ? (
                  <DiagnosisForm onSubmit={handleDiagnosisSubmit} />
                ) : (
                  userRoutine ? (
                    <RoutineDisplay routine={userRoutine} onUpdateDiagnosis={handleDiagnosisUpdate} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 border-4 border-t-primary-500 border-primary-200 rounded-full animate-spin"></div>
                      <p className="mt-6 text-gray-600 dark:text-gray-400">Cargando tu rutina personalizada...</p>
                    </div>
                  )
                )
              )}

              {/* Sección de Tienda */}
              {currentSection === 'shop' && (
                selectedProduct ? (
                  <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
                ) : (
                  <ProductList onProductSelect={handleProductSelect} />
                )
              )}

              {/* Sección de Análisis IA */}
              {currentSection === 'ai' && <AIAnalysis />}

              {/* Sección de Asistente Virtual */}
              {currentSection === 'assistant' && <VirtualAssistant />}

              {/* Sección Social */}
              {currentSection === 'social' && <SocialSharing />}
            </div>
          </div>
        )}

        {/* Footer con información de marca */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Chok-Chok (촉촉) | Tu compañero de skincare</p>
        </div>
      </div>
    </div>
  );
}