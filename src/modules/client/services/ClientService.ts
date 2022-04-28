import { converIntToFloat, getRandomBetween } from '../../../common/helpers';
import UserCarRatingRepo from '../../../common/repositories/UserCarRatingRepo';
import { UserCarRatingCreation } from '../../../common/types/common';
class ClientService {
  async rateManyCars(ratingInfos: Array<UserCarRatingCreation>) {
    let carRatings = ratingInfos;
    if (carRatings.length === 0) {
      for (let i = 0; i < 200; i++) {
        const customCarRating = {} as UserCarRatingCreation;
        customCarRating.carId = getRandomBetween(1, 110);
        customCarRating.userId = getRandomBetween(30, 61);
        customCarRating.ratingPoint = converIntToFloat(
          getRandomBetween(7, 11),
          1
        ) as any;
        carRatings = [...carRatings, customCarRating];
      }
    }
    console.log('carRatings', carRatings);
    await Promise.all(
      carRatings.map((carRating) => {
        return this.rateCar(carRating);
      })
    );
    return 'query has been executed';
  }
  rateCar(carRating: UserCarRatingCreation) {
    return UserCarRatingRepo.carRating(carRating);
  }
}

export default ClientService;
