import express from 'express';
import wrapper from '../../../common/helpers/wrapperController';
import validateAdmin from '../../../middlewares/validateAdmin';
import validateExpiryToken from '../../../middlewares/validateExpiryToken';
import AdminController from '../controller/AdminController';

const router = express.Router();

router.get('/oto/get-all', wrapper(AdminController.getAllCars));
router.put('/brand/update-brand', wrapper(AdminController.updateBrand));

router.post(
  '/car/create-car',
  [validateExpiryToken, validateAdmin],
  wrapper(AdminController.createNewOto)
);
router.get('/car/get-all', wrapper(AdminController.getAllCars));

export default router;
