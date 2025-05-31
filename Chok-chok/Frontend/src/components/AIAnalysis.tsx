'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useAnalysis } from '../hooks/useAnalysis';
import { isValidImage } from '../utils/imageUtils';

// Iconos SVG personalizados
const Upload = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const Camera = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Droplets = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 14.25C7.5 17.5 10 19.75 12 19.75s4.5-2.25 4.5-5.5c0-2.25-3-6.25-4.5-8.25-1.5 2-4.5 6-4.5 8.25z" />
  </svg>
);

const Sun = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l1.5 1.5L5 6 3.5 4.5 5 3zM19 3l1.5 1.5L19 6l-1.5-1.5L19 3zM12 0l2 2-2 2-2-2 2-2zM12 18l2 2-2 2-2-2 2-2zM5 21l1.5-1.5L5 18l-1.5 1.5L5 21zM19 21l1.5-1.5L19 18l-1.5 1.5L19 21z" />
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Share2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Tipos de datos
interface ConcernDetail {
  severity?: number;
  areas?: string[];
  count?: number;
  depth?: string;
  type?: string;
  coverage?: string;
  size?: string;
  visibility?: string;
  distribution?: string;
  level?: number;
  zones?: {
    tZone: string;
    cheeks: string;
    eye: string;
  };
}

interface Recommendation {
  category: string;
  product: string;
  frequency: string;
  priority: 'Crítica' | 'Alta' | 'Media';
}

interface AnalysisResults {
  overallScore: number;
  skinType: string;
  concerns: {
    acne: ConcernDetail;
    wrinkles: ConcernDetail;
    pigmentation: ConcernDetail;
    pores: ConcernDetail;
    hydration: ConcernDetail;
    oiliness: ConcernDetail;
  };
  recommendations: Recommendation[];
  routine: {
    morning: string[];
    evening: string[];
  };
}

type ActiveTab = 'overview' | 'concerns' | 'recommendations' | 'routine';
type Priority = 'Crítica' | 'Alta' | 'Media';

const AIAnalysis: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  const {
    isAnalyzing,
    analysisResults,
    analysisComplete,
    performAnalysis,
    setAnalysisResults,
    setAnalysisComplete
  } = useAnalysis();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && isValidImage(file)) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
          setAnalysisComplete(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async (): Promise<void> => {
    setCameraError(null);
    setCameraActive(true);
    try {
      // Solicita la cámara con la menor latencia posible y resolución baja
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'user' },
          width: { ideal: 480, max: 640 },
          height: { ideal: 360, max: 480 },
          frameRate: { ideal: 30, max: 60 }
        },
        audio: false
      });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Usa requestAnimationFrame para asegurar el render inmediato
        requestAnimationFrame(() => {
          videoRef.current && videoRef.current.play();
        });
      }
    } catch (err) {
      setCameraError('No se pudo acceder a la cámara. Verifica los permisos.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = (): void => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    setUploadedImage(imageData);
    stopCamera();
    setAnalysisComplete(false);
  };

  const getSeverityColor = (severity: number): string => {
    switch(severity) {
      case 1: return 'text-green-600 bg-green-100';
      case 2: return 'text-yellow-600 bg-yellow-100';
      case 3: return 'text-orange-600 bg-orange-100';
      case 4: return 'text-red-600 bg-red-100';
      case 5: return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: Priority): string => {
    switch(priority) {
      case 'Crítica': return 'bg-red-100 text-red-800 border-red-200';
      case 'Alta': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Media': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-teal-600 p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Análisis Facial con IA</h2>
        </div>
        <p className="text-slate-100 text-lg">
          Tecnología avanzada para un análisis profundo de tu piel y recomendaciones personalizadas
        </p>
      </div>

      <div className="p-8">
        {!uploadedImage ? (
          // Sección de carga de imagen
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Comienza tu análisis
              </h3>
              <p className="text-gray-600 mb-8">
                Sube una foto clara de tu rostro o toma una nueva con la cámara
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Upload de archivo */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer bg-white p-8 rounded-xl border-2 border-dashed border-teal-300 hover:border-teal-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                    <Upload className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Subir Imagen
                  </h4>
                  <p className="text-gray-600 text-sm">
                    JPG, PNG hasta 10MB
                  </p>
                </div>
              </div>

              {/* Cámara */}
              <div 
                onClick={startCamera}
                className="group cursor-pointer bg-white p-8 rounded-xl border-2 border-dashed border-cyan-300 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-200 transition-colors">
                    <Camera className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Usar Cámara
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Toma una foto instantánea
                  </p>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Cámara activa */}
            {cameraActive && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
                  {cameraError ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <span className="text-red-600 mb-2">{cameraError}</span>
                      <button
                        onClick={stopCamera}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cerrar
                      </button>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg mb-4"
                        style={{ background: "#222", minHeight: 240 }}
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={capturePhoto}
                          className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                        >
                          Capturar
                        </button>
                        <button
                          onClick={stopCamera}
                          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {/* Consejos */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Consejos para una mejor foto
              </h4>
              <ul className="text-slate-700 text-sm space-y-2">
                <li>• Buena iluminación natural o luz blanca uniforme</li>
                <li>• Rostro limpio sin maquillaje</li>
                <li>• Mirada hacia el frente, expresión neutra</li>
                <li>• Cabello recogido para mostrar toda la cara</li>
              </ul>
            </div>
          </div>
        ) : (
          // Sección de análisis y resultados
          <div className="space-y-8">
            {/* Imagen subida */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <img
                    src={uploadedImage}
                    alt="Rostro para análisis"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setAnalysisComplete(false);
                        setAnalysisResults(null);
                      }}
                      className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      Nueva Foto
                    </button>
                    {!analysisComplete && !isAnalyzing && (
                      <button
                        onClick={() => performAnalysis(uploadedImage!)}
                        className="flex-1 bg-gradient-to-r from-slate-600 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-slate-700 hover:to-teal-700 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Analizar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                {isAnalyzing && (
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div className="animate-spin w-16 h-16 border-4 border-slate-200 border-t-teal-600 rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Analizando tu piel...
                    </h3>
                    <p className="text-gray-600">
                      Nuestro algoritmo de IA está procesando tu imagen para detectar:
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>• Tipo de piel</div>
                      <div>• Nivel de hidratación</div>
                      <div>• Imperfecciones</div>
                      <div>• Líneas de expresión</div>
                      <div>• Pigmentación</div>
                      <div>• Tamaño de poros</div>
                    </div>
                  </div>
                )}

                {analysisComplete && analysisResults && (
                  <div className="space-y-6">
                    {/* Score general */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Puntuación General
                        </h3>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-500 hover:text-teal-600 transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-teal-600 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke={analysisResults.overallScore >= 85 ? "#10b981" : analysisResults.overallScore >= 70 ? "#f59e0b" : "#ef4444"}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${(analysisResults.overallScore / 100) * 251.2} 251.2`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">
                              {analysisResults.overallScore}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            Estado: {analysisResults.overallScore >= 85 ? 'Excelente' : analysisResults.overallScore >= 70 ? 'Bueno' : 'Necesita atención'}
                          </p>
                          <p className="text-gray-600">
                            Tipo de piel: <span className="font-semibold">{analysisResults.skinType}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tabs de navegación */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="flex border-b border-gray-200">
                        {[
                          { id: 'overview' as ActiveTab, label: 'Resumen', icon: BarChart3 },
                          { id: 'concerns' as ActiveTab, label: 'Análisis Detallado', icon: AlertCircle },
                          { id: 'recommendations' as ActiveTab, label: 'Recomendaciones', icon: CheckCircle },
                          { id: 'routine' as ActiveTab, label: 'Rutina Sugerida', icon: RefreshCw }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-colors ${
                              activeTab === tab.id
                                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                                : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                            }`}
                          >
                            <tab.icon className="w-4 h-4" />
                            <span className="font-medium">{tab.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="p-6">
                        {activeTab === 'overview' && (
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Droplets className="w-5 h-5 text-emerald-600" />
                                <h4 className="font-semibold text-emerald-800">Hidratación</h4>
                              </div>
                              <p className="text-2xl font-bold text-emerald-600">
                                {analysisResults.concerns.hydration.level}%
                              </p>
                              <p className="text-sm text-emerald-600 mt-1">
                                {(analysisResults.concerns.hydration.level || 0) >= 80 ? 'Excelente' : 
                                 (analysisResults.concerns.hydration.level || 0) >= 60 ? 'Buena' : 'Necesita mejora'}
                              </p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-5 h-5 text-amber-600" />
                                <h4 className="font-semibold text-amber-800">Grasa</h4>
                              </div>
                              <p className="text-2xl font-bold text-amber-600">
                                {analysisResults.concerns.oiliness.level}%
                              </p>
                              <p className="text-sm text-amber-600 mt-1">
                                {analysisResults.concerns.oiliness.distribution}
                              </p>
                            </div>
                            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-teal-600" />
                                <h4 className="font-semibold text-teal-800">Imperfecciones</h4>
                              </div>
                              <p className="text-2xl font-bold text-teal-600">
                                {analysisResults.concerns.acne.count}
                              </p>
                              <p className="text-sm text-teal-600 mt-1">
                                Detectadas
                              </p>
                            </div>
                          </div>
                        )}

                        {activeTab === 'concerns' && (
                          <div className="space-y-6">
                            {Object.entries(analysisResults.concerns as Record<string, any>).map(([key, concern]) => (
                              <div key={key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-semibold text-slate-800 capitalize">{key}</span>
                                  {concern.severity && (
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(concern.severity)}`}>
                                      Nivel {concern.severity}/5
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-700 text-sm">
                                  {Object.entries(concern).map(([detailKey, detailValue]) => (
                                    detailKey !== 'severity' && (
                                      <div key={detailKey} className="mb-1">
                                        <span className="font-medium capitalize">{detailKey}:</span> {Array.isArray(detailValue) ? (detailValue as string[]).join(', ') : String(detailValue)}
                                      </div>
                                    )
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'recommendations' && (
                          <div className="space-y-4">
                            {analysisResults.recommendations.map((rec, index) => (
                              <div key={index} className={`p-4 rounded-lg border-2 ${getPriorityColor(rec.priority)}`}>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold">{rec.category}</h4>
                                  <span className="text-xs font-medium px-2 py-1 rounded-full">
                                    {rec.priority}
                                  </span>
                                </div>
                                <p className="font-medium mb-1">{rec.product}</p>
                                <p className="text-sm opacity-75">Uso: {rec.frequency}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'routine' && (
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                              <h4 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                                <Sun className="w-5 h-5" />
                                Rutina Matutina
                              </h4>
                              <ol className="space-y-2">
                                {analysisResults.routine.morning.map((step, index) => (
                                  <li key={index} className="flex items-center gap-3 text-amber-700">
                                    <span className="bg-amber-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                      {index + 1}
                                    </span>
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div className="bg-gradient-to-br from-slate-50 to-teal-50 p-6 rounded-lg border border-slate-200">
                              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Rutina Nocturna
                              </h4>
                              <ol className="space-y-2">
                                {analysisResults.routine.evening.map((step, index) => (
                                  <li key={index} className="flex items-center gap-3 text-slate-700">
                                    <span className="bg-slate-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                      {index + 1}
                                    </span>
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;