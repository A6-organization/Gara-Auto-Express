import sendGridMail, { MailDataRequired, MailService } from '@sendgrid/mail';
import axios from 'axios';
import dayjs from 'dayjs';
import env from '../../config/env';
import { logger } from '../helpers/logger';

class SendGridMail {
  protected adminEmail: string;
  protected adminName: string;
  protected apiUrl: string;
  protected apiKey: string;
  protected sgMail: MailService = sendGridMail;

  constructor() {
    this.adminEmail = env.sendGridFromEmail;
    this.adminName = env.sendGridFromEmailName;
    this.apiUrl = env.sendGridApiUrl;
    this.apiKey = env.sendGridApiKey;
    this.sgMail.setApiKey(env.sendGridApiKey);
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
      logger.error(error, {
        reason: 'EXCEPTION at sendGridSendTemplatedEmail()',
      });
      throw new Error(`Send grid email fail error: ${error}`);
    }
  }

  async sendGridSendEmailWithEmbed(
    link: string,
    userEmail: string,
    subject: string,
    templateId: string
  ) {
    try {
      const email: MailDataRequired = {
        from: this.adminEmail,
        to: userEmail,
        personalizations: [
          {
            to: userEmail,
            subject,
            sendAt: dayjs().valueOf(),
            dynamicTemplateData: {
              link,
            },
          },
        ],
        templateId,
      };

      return await this.sgMail.send(email);
    } catch (error) {
      logger.error(error, {
        reason: 'EXCEPTION at sendGridSendEmailWithEmbed()',
      });
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
      logger.error(error, { reason: 'EXCEPTION at sendSignUpEmail()' });
      throw new Error(`Send grid email fail on Sign Up with error: ${error} `);
    }
  }

  async sendReminderEmail(email: string) {
    const name = email.split('@')[0];
    try {
      await this.sendGridSendTemplatedEmail(
        email,
        name,
        env.sendGridSignUpTemplateId,
        'RE-ACTIVE ACCOUNT WITH GARA-AUTO'
      );

      logger.info(`Send reminder mail success to email: ${email}`);
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at sendReminderEmail()' });
      throw new Error(`Send reminder mail fail with error: ${error} `);
    }
  }
}

export default new SendGridMail();
