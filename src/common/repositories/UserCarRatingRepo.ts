import UserCarRatingModel from '../models/UserCarRatingModel';
import { UserCarRatingCreation } from '../types/common';

class UserCarRatingRepo {
  async carRating(datas: UserCarRatingCreation) {
    return UserCarRatingModel.create(datas);
  }
}

export default new UserCarRatingRepo();
