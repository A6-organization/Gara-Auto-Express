import express from 'express';
import wrapper from '../../../common/helpers/wrapperController';
import ClientController from '../controller/ClientController';

const router = express.Router();

router.post('/car/rating', wrapper(ClientController.ratingCar));

export default router;
