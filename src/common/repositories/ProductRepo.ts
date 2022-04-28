import CarAppearanceModel from '../models/CarAppearanceModel';
import CarModel from '../models/CarModel';
import { CarCreation } from '../types/common';

class ProductRepository {
  async createNewOto(attributes: CarCreation) {
    return CarModel.create(attributes);
  }

  getAllCars = async () => {
    return CarModel.findAll({
      include: {
        model: CarAppearanceModel,
        as: 'carAppearance',
      },
    });
  };
}

export default new ProductRepository();
