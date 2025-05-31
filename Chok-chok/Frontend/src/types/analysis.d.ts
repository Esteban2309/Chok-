// Tipos para análisis facial
export interface AnalysisResults {
  overallScore: number;
  skinType: string;
  concerns: any;
  recommendations: any[];
  routine: {
    morning: string[];
    evening: string[];
  };
}
