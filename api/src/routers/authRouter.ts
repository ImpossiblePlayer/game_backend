import express from 'express';
import { AuthControllers } from '../controllers';

const router = express.Router();

router.post('/signup', AuthControllers.Register);

export default router;
