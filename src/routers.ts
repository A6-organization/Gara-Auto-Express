import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/routers/auth';
import adminRoute from './modules/admin/routes/admin';
import clientRoute from './modules/client/routes/client';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true, limit: '5m' }));

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoute);
router.use('/client', clientRoute);

export default router;
