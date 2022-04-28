import { Request, Response } from 'express';

import { logger } from '../../../common/helpers/logger';
import InternalServerError from '../../../common/errors/types/InternalServerError';
import { CreateNewOtoBody } from '../../../common/types/product';
import {
  assignPropToObj,
  getRandomDiscountPercent,
  mapBrandToBrandId,
} from '../../../common/helpers';
import UploadImgFromUrlService from '../services/UploadImgsFromUrlService';
import { stringifyArray } from '../../../common/helpers/string';
import ProductRepo from '../../../common/repositories/ProductRepo';
import CarAppearanceRepo from '../../../common/repositories/CarAppearanceRepo';

class ProductController extends UploadImgFromUrlService {
  createNewOto = async (
    req: Request<unknown, unknown, Array<CreateNewOtoBody>>,
    res: Response
  ) => {
    const newCreationCars = req.body;
    try {
      const createOtoPromises = newCreationCars.map(async (oto) => {
        const otoBaseInfos = oto.baseInfo;
        const productImgs = oto.productImgs;
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newOtoImgs = {} as any;
        const newOto = { ...otoBaseInfos, ...otoBaseInfos.description };
        assignPropToObj(
          newOto,
          [
            'brandId',
            'discountPercent',
            'introReview',
            'exteriorReview',
            'interiorReview',
            'amenityReview',
            'safetyReview',
          ],
          [
            mapBrandToBrandId(newOto.brand),
            getRandomDiscountPercent(),
            stringifyArray(newOto.introReview),
            stringifyArray(newOto.exteriorReview),
            stringifyArray(newOto.interiorReview),
            stringifyArray(newOto.amenityReview),
            stringifyArray(newOto.safetyReview),
          ]
        );

        const [
          newImgs,
          newIntroImgs,
          newExteriorReviewImgs,
          newInteriorReviewImgs,
        ]: Array<Array<string> | string> = await Promise.all([
          this.uploadImgsToFirebase(productImgs.imgs),
          this.uploadImgsToFirebase(productImgs.introImgs),
          this.uploadImgsToFirebase(productImgs.exteriorReviewImgs),
          this.uploadImgsToFirebase(productImgs.interiorReviewImgs),
        ]);

        assignPropToObj(
          newOtoImgs,
          [
            'imgs',
            'introImgs',
            'exteriorReviewImgs',
            'interiorReviewImgs',
            'newImgs',
            'newIntroImgs',
            'newExteriorReviewImgs',
            'newInteriorReviewImgs',
          ],
          [
            stringifyArray(productImgs.imgs),
            stringifyArray(productImgs.introImgs),
            stringifyArray(productImgs.exteriorReviewImgs),
            stringifyArray(productImgs.interiorReviewImgs),
            newImgs,
            newIntroImgs,
            newExteriorReviewImgs,
            newInteriorReviewImgs,
          ]
        );
        const newCreatedOto = await ProductRepo.createNewOto(newOto as any);
        newOtoImgs.car_id = newCreatedOto.id;
        return CarAppearanceRepo.createNewImgsOfOto(newOtoImgs);
      });
      await Promise.all(createOtoPromises);
      res.json({ status: 'success' });
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at createNewOto()' });
      throw new InternalServerError();
    }
  };

  getAllCars = async (_req: Request, res: Response) => {
    try {
      const result = await ProductRepo.getAllCars();
      res.json({ status: 'success', result });
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at getAllCars()' });
      throw new InternalServerError();
    }
  };
}

export default new ProductController();
