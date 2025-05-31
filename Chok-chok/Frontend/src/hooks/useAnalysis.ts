// Hook personalizado para análisis facial
import { useState, useCallback } from 'react';
import { AnalysisResults } from '../types/analysis';
import { simulateAnalysis } from '../services/analysisService';

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const performAnalysis = useCallback(async (image: string) => {
    setIsAnalyzing(true);
    const result = await simulateAnalysis(image);
    setAnalysisResults(result);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  }, []);

  return {
    isAnalyzing,
    analysisResults,
    analysisComplete,
    performAnalysis,
    setAnalysisResults,
    setAnalysisComplete
  };
}
