import { Router } from 'express';
import analysisController from '../controllers/analysisController';

const router = Router();

// POST /api/analysis
router.post('/', analysisController.analyzeImage);

export default router;
