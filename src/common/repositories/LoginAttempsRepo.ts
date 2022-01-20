import dayjs from 'dayjs';
import LoginAttempsModel from '../models/LoginAttempsModel';

class LoginAttempsRepo {
  async createNewRecord(user_id: number) {
    await LoginAttempsModel.create({
      user_id,
      attemps: 7,
      start_time: new Date(),
      end_time: dayjs(new Date()).add(2, 'h').toDate(),
    });
  }

  async updateRecord(
    user_id: number,
    attemps: number,
    start_time: Date,
    end_time: Date
  ) {
    await LoginAttempsModel.update(
      {
        attemps,
        start_time,
        end_time,
      },
      {
        where: {
          user_id,
        },
      }
    );
  }

  async getRecordByUserID(user_id: number) {
    return await LoginAttempsModel.findOne({
      where: {
        user_id,
      },
    });
  }
}

export default new LoginAttempsRepo();
