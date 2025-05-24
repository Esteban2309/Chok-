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

// Types
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
  // Main states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [needsDiagnosis, setNeedsDiagnosis] = useState(false);
  const [userRoutine, setUserRoutine] = useState<Routine | null>(null);
  const [currentSection, setCurrentSection] = useState<'home' | 'analysis' | 'routine' | 'shop' | 'ai' | 'assistant' | 'social'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Featured products for landing page
  const featuredProducts = [
    {
      id: '1',
      name: 'Vitamin C Serum',
      description: 'Brightening serum with 20% Vitamin C',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Hyaluronic Acid Moisturizer',
      description: 'Deep hydration for all skin types',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Gentle Foam Cleanser',
      description: 'pH-balanced cleanser for sensitive skin',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop'
    }
  ];

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Authentication handlers
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
    const dummyRoutine: Routine = {
      id: 'user-routine-123',
      steps: [
        { id: 1, description: 'Morning Cleanser', product: 'Gentle Foam Cleanser' },
        { id: 2, description: 'Vitamin C Serum', product: 'Brightening Serum' },
        { id: 3, description: 'Moisturizer', product: 'Hydrating Cream' },
        { id: 4, description: 'Sunscreen SPF 50', product: 'UV Protection' },
      ],
    };
    setUserRoutine(dummyRoutine);
    setCurrentSection('routine');
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
    setNeedsDiagnosis(true);
    setCurrentSection('analysis');
  };

  const handleDiagnosisSubmit = (formData: any) => {
    console.log('Diagnosis submitted:', formData);
    const generatedRoutine: Routine = {
      id: `routine-${Date.now()}`,
      steps: [
        { id: 1, description: 'Cleanse with gentle foam cleanser' },
        { id: 2, description: 'Apply targeted treatment serum' },
        { id: 3, description: 'Moisturize according to skin type' },
        { id: 4, description: 'Protect with broad-spectrum SPF' },
      ],
    };
    setUserRoutine(generatedRoutine);
    setNeedsDiagnosis(false);
    setCurrentSection('routine');
  };

  const navigateTo = (section: 'home' | 'analysis' | 'routine' | 'shop' | 'ai' | 'assistant' | 'social') => {
    if (section !== 'home' && section !== 'analysis' && !isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setCurrentSection(section);
    setSelectedProduct(null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const startSkinAnalysis = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setCurrentSection('analysis');
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-r from-primary-200 to-primary-300 opacity-30 filter blur-3xl animate-float"></div>
          <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-gradient-to-r from-secondary-200 to-secondary-300 opacity-30 filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-accent-200 to-accent-300 opacity-30 filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        navigateTo={navigateTo} 
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setShowAuth(true)}
      />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Home/Landing Page */}
        {currentSection === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-gradient bg-clip-text text-transparent">
                  Chok-Chok
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                  촉촉 - Your AI-Powered Skincare Companion
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                  Discover your perfect skincare routine with our advanced AI analysis. 
                  Get personalized recommendations based on your unique skin needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startSkinAnalysis}
                    className="px-8 py-4 gradient-primary text-white rounded-full font-semibold text-lg hover-lift animate-pulse-glow"
                  >
                    Start Skin Analysis
                  </button>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-8 py-4 glass-card text-primary-600 rounded-full font-semibold text-lg hover-lift"
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose Chok-Chok?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="glass-card p-8 text-center hover-lift">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced algorithms analyze your skin type, concerns, and lifestyle to create personalized routines.
                  </p>
                </div>

                <div className="glass-card p-8 text-center hover-lift">
                  <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Personalized Care</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Every recommendation is tailored to your unique skin profile and personal preferences.
                  </p>
                </div>

                <div className="glass-card p-8 text-center hover-lift">
                  <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Expert Products</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Curated selection of K-beauty and international skincare products proven effective.
                  </p>
                </div>
              </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Featured Products
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="glass-card p-6 hover-lift">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                      <button
                        onClick={() => navigateTo('shop')}
                        className="px-4 py-2 gradient-primary text-white rounded-lg font-medium hover-lift"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-20">
              <div className="max-w-3xl mx-auto glass-card p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Skincare?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Join thousands of users who have discovered their perfect skincare routine with Chok-Chok.
                </p>
                <button
                  onClick={startSkinAnalysis}
                  className="px-10 py-4 gradient-primary text-white rounded-full font-semibold text-xl hover-lift animate-pulse-glow"
                >
                  Get Started Free
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Skin Analysis Section */}
        {currentSection === 'analysis' && (
          <div className="max-w-4xl mx-auto">
            {needsDiagnosis ? (
              <DiagnosisForm onSubmit={handleDiagnosisSubmit} />
            ) : (
              <AIAnalysis />
            )}
          </div>
        )}

        {/* Other sections */}
        {currentSection === 'routine' && userRoutine && (
          <div className="max-w-4xl mx-auto">
            <RoutineDisplay routine={userRoutine} onUpdateDiagnosis={() => setCurrentSection('analysis')} />
          </div>
        )}

        {currentSection === 'shop' && (
          <div className="max-w-6xl mx-auto">
            {selectedProduct ? (
              <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
            ) : (
              <ProductList onProductSelect={handleProductSelect} />
            )}
          </div>
        )}

        {currentSection === 'ai' && (
          <div className="max-w-4xl mx-auto">
            <AIAnalysis />
          </div>
        )}

        {currentSection === 'assistant' && (
          <div className="max-w-4xl mx-auto">
            <VirtualAssistant />
          </div>
        )}

        {currentSection === 'social' && (
          <div className="max-w-4xl mx-auto">
            <SocialSharing />
          </div>
        )}

        {/* Authentication Modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="glass-card p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Welcome to Chok-Chok</h2>
                <button
                  onClick={() => setShowAuth(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Auth 
                onLoginSuccess={handleLoginSuccess} 
                onRegisterSuccess={handleRegisterSuccess} 
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Chok-Chok (촉촉) | Your AI-Powered Skincare Companion</p>
          <p className="mt-2 text-sm">Discover your perfect routine with personalized skincare analysis</p>
        </div>
      </footer>
    </div>
  );
}