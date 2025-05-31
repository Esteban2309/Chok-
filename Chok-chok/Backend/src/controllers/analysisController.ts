import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { simulateAnalysis } from '../services/analysisService';

const analysisSchema = z.object({
  image: z.string().min(10, 'Imagen requerida (base64)'),
});

const analyzeImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = analysisSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    // Simulación de análisis (lógica real en el futuro)
    const result = await simulateAnalysis(parsed.data.image);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default { analyzeImage };
