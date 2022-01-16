import axios from 'axios';
import env from '../../config/env';
import { logger } from '../helpers/logger';

class SendGridMail {
  protected adminEmail: string;
  protected adminName: string;
  protected apiUrl: string;
  protected apiKey: string;

  constructor() {
    this.adminEmail = env.sendGridFromEmail;
    this.adminName = env.sendGridFromEmailName;
    this.apiUrl = env.sendGridApiUrl;
    this.apiKey = env.sendGridApiKey;
  }

  async sendGridSendTemplatedEmail(
    toEmail: string,
    name: string,
    templateID: string,
    subject: string
  ) {
    try {
      const body = {
        personalizations: [
          {
            to: [
              {
                email: `${toEmail}`,
                name: `${name}`,
              },
            ],
            dynamic_template_data: {
              name: `${name}`,
            },
            subject: `${subject}`,
          },
        ],
        from: {
          email: `${this.adminEmail}`,
          name: `${this.adminName}`,
        },
        reply_to: {
          email: `${this.adminEmail}`,
          name: `${this.adminName}`,
        },
        template_id: templateID,
      };

      await axios.post(this.apiUrl, body, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          contentType: 'application/json',
        },
      });

      logger.info(
        `Send grid mail to Email: ${toEmail} with subject: ${subject} success`
      );
    } catch (error) {
      logger.error(error);
      throw new Error(`Send grid email fail error: ${error}`);
    }
  }

  async sendSignUpEmail(email: string, name: string) {
    try {
      await this.sendGridSendTemplatedEmail(
        email,
        name,
        env.sendGridSignUpTemplateId,
        'VERIFIED USER OF GARA-AUTO'
      );

      logger.info(
        `Send grid mail to verify account success to email: ${email}`
      );
    } catch (error) {
      logger.error(error);
      throw new Error(`Send grid email fail on Sign Up with error: ${error} `);
    }
  }
}

export default new SendGridMail();
