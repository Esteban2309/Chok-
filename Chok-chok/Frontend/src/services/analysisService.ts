// Simulación de servicio de análisis facial
import { AnalysisResults } from '../types/analysis';

export async function simulateAnalysis(image: string): Promise<AnalysisResults> {
  // Aquí podrías llamar al backend real
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    overallScore: Math.floor(Math.random() * 20) + 75,
    skinType: ['Mixta', 'Grasa', 'Seca', 'Normal'][Math.floor(Math.random() * 4)],
    concerns: {
      acne: { severity: 2, areas: ['Zona T'], count: 5 },
      wrinkles: { severity: 1, areas: ['Frente'], depth: 'Leve' },
      pigmentation: { severity: 1, type: 'Melasma leve', coverage: '10%' },
      pores: { size: 'Medianos', visibility: 'Moderada', distribution: 'Zona T' },
      hydration: { level: 80, zones: { tZone: 'Normal', cheeks: 'Seca', eye: 'Bien' } },
      oiliness: { level: 40, distribution: 'Zona T' }
    },
    recommendations: [],
    routine: { morning: [], evening: [] }
  };
}
