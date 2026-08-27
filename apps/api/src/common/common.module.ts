import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RecaptchaService } from './recaptcha/recaptcha.service';
import { EmailService } from './email/email.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { CrmWebhookService } from './crm-webhook/crm-webhook.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { PermissionsGuard } from './guards/permissions.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    RecaptchaService,
    EmailService,
    WhatsappService,
    CrmWebhookService,
    CloudinaryService,
    PermissionsGuard,
  ],
  exports: [
    JwtModule,
    RecaptchaService,
    EmailService,
    WhatsappService,
    CrmWebhookService,
    CloudinaryService,
    PermissionsGuard,
  ],
})
export class CommonModule {}
