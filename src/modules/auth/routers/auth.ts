import express from 'express';
import wrapper from '../../../common/helpers/wrapperController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/api-check', wrapper(AuthController.apiCheck));

export default router;
