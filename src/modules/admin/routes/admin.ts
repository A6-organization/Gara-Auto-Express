import express from 'express';
import wrapper from '../../../common/helpers/wrapperController';
import validateAdmin from '../../../middlewares/validateAdmin';
import validateExpiryToken from '../../../middlewares/validateExpiryToken';
import AdminController from '../controller/AdminController';

const router = express.Router();

router.post(
  '/oto/create-oto',
  [validateExpiryToken, validateAdmin],
  wrapper(AdminController.createNewOto)
);

router.get('/oto/get-all', wrapper(AdminController.getAllCars));

export default router;
