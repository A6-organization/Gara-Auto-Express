import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/routers/auth';
import adminRoutes from './modules/admin/routes/admin';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true, limit: '5m' }));

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
