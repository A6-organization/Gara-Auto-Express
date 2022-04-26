import CarAppearanceModel from '../models/CarAppearanceModel';
import { CarAppearanceCreation } from '../types/common';

class CarAppearanceRepository {
  async createNewImgsOfOto(datas: CarAppearanceCreation) {
    return CarAppearanceModel.create(datas);
  }
}

export default new CarAppearanceRepository();
