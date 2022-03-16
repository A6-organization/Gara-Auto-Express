import express from 'express';
import { validate } from 'express-validation';
import wrapper from '../../../common/helpers/wrapperController';
import authenRegenerate from '../../../middlewares/authenRegenerate';
import authentication from '../../../middlewares/authentication';
import validateAdmin from '../../../middlewares/validateAdmin';
import AuthController from '../controllers/AuthController';
import authRequest from '../request/authRequest';

const router = express.Router();

router.get('/api-check', wrapper(AuthController.apiCheck));

router.post(
  '/user/sign-up',
  validate(authRequest.signUpBody),
  wrapper(AuthController.signUpAccount)
);

router.post(
  '/admin/sign-up',
  [authentication, validateAdmin],
  wrapper(AuthController.generateAdminAccount)
);

router.post(
  '/log-in',
  [validate(authRequest.signInBody)],
  wrapper(AuthController.login)
);

router.post(
  '/gen-new-token',
  [authenRegenerate],
  wrapper(AuthController.regenarateAccessToken)
);

export default router;
