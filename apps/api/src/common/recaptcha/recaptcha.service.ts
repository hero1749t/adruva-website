import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RecaptchaService {
  private readonly logger = new Logger(RecaptchaService.name);

  async verify(token?: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret || secret === 'dummy_recaptcha_secret_key') {
      this.logger.warn(
        'reCAPTCHA secret key is not set or dummy. Bypassing verification.',
      );
      return true;
    }

    if (!token) {
      this.logger.error('reCAPTCHA verification failed: token is missing');
      return false;
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        { method: 'POST' },
      );

      const data = (await response.json()) as {
        success: boolean;
        score?: number;
        'error-codes'?: string[];
      };

      if (!data.success) {
        this.logger.error(
          `reCAPTCHA verification failed: ${JSON.stringify(data['error-codes'])}`,
        );
        return false;
      }

      return data.score !== undefined && data.score >= 0.5;
    } catch (error) {
      this.logger.error(
        `reCAPTCHA verification request error: ${(error as Error).message}`,
      );
      return false;
    }
  }
}
