import InternalServerError from '../../../common/errors/types/InternalServerError';
import {
  assignPropToObj,
  getRandomDiscountPercent,
  mapBrandToBrandId,
} from '../../../common/helpers';
import { logger } from '../../../common/helpers/logger';
import { stringifyArray } from '../../../common/helpers/string';
import BrandRepo from '../../../common/repositories/BrandRepo';
import CarAppearanceRepo from '../../../common/repositories/CarAppearanceRepo';
import ProductRepo from '../../../common/repositories/ProductRepo';
import { BrandModifying } from '../../../common/types/common';
import { CreateNewOtoBody } from '../../../common/types/product';
import UploadImgsFromUrlsService from './UploadImgsFromUrlsService';

class AdminServices extends UploadImgsFromUrlsService {
  async createCars(cars: Array<CreateNewOtoBody>) {
    try {
      const createOtoPromises = cars.map(async (oto) => {
        const otoBaseInfos = oto.baseInfo;
        const productImgs = oto.productImgs;

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
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at apiCheck()' });
      throw new InternalServerError();
    }
  }

  async updateSingleBrand(
    brand: BrandModifying,
    brandName: string,
    imgUrls: Array<string>
  ) {
    const modifyingImgUrls = imgUrls.map((url) => 'https://tinbanxe.vn' + url);
    await this.uploadImgsToFirebase(modifyingImgUrls);
    return await BrandRepo.updateBrandInfo(brand, brandName);
  }
}

export default AdminServices;
