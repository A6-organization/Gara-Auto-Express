import BrandModel from '../models/BrandModel';
import { BrandModifying } from '../types/common';

class BrandRepository {
  async updateBrandInfo(datas: BrandModifying, brandName: string) {
    return BrandModel.update(datas, {
      where: {
        name: brandName,
      },
    });
  }
}

export default new BrandRepository();
