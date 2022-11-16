import express from 'express';
import { AuthControllers } from '../controllers';

const router = express.Router();

router.post('/signup', AuthControllers.register);

export default router;
