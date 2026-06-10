import { Global, Module } from '@nestjs/common';
import { RecaptchaService } from './recaptcha/recaptcha.service';
import { EmailService } from './email/email.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { CrmWebhookService } from './crm-webhook/crm-webhook.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Global()
@Module({
  providers: [
    RecaptchaService,
    EmailService,
    WhatsappService,
    CrmWebhookService,
    CloudinaryService,
  ],
  exports: [
    RecaptchaService,
    EmailService,
    WhatsappService,
    CrmWebhookService,
    CloudinaryService,
  ],
})
export class CommonModule {}
