import { Request, Response } from 'express';

import { logger } from '../../../common/helpers/logger';
import InternalServerError from '../../../common/errors/types/InternalServerError';
import { CreateNewOtoBody } from '../../../common/types/product';
import { stringifyArray } from '../../../common/helpers/string';
import ProductRepo from '../../../common/repositories/ProductRepo';
import AdminServices from '../services/AdminService';
class ProductController extends AdminServices {
  createNewOto = async (
    req: Request<unknown, unknown, Array<CreateNewOtoBody>>,
    res: Response
  ) => {
    const newCars = req.body;
    try {
      await this.createCars(newCars);
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

  updateBrand = async (req: Request, res: Response) => {
    const brand = req.body;
    await this.updateSingleBrand(
      { descriptions: stringifyArray(brand.descriptions) },
      brand.name,
      brand.imgs
    );
    res.json({ status: 'success' });
  };
}

export default new ProductController();
