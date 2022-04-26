import express from 'express';
import { validate } from 'express-validation';
import wrapper from '../../../common/helpers/wrapperController';
import AdminController from '../controller/AdminController';

const router = express.Router();

router.post('/oto/create-oto', wrapper(AdminController.createNewOto));
router.get('/oto/get-all', wrapper(AdminController.getAllOtos));

export default router;
