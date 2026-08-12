import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmailService } from './common/email/email.service';
import { WhatsappService } from './common/whatsapp/whatsapp.service';

async function bootstrap() {
  console.log('Initializing NestJS App Context to test notifications...');
  const app = await NestFactory.createApplicationContext(AppModule);

  const emailService = app.get(EmailService);
  const whatsappService = app.get(WhatsappService);

  const testEmail = process.env.TEST_EMAIL || 'hello@adruvaSolution.com';
  console.log(`\n--- testing SMTP EMAIL to: ${testEmail} ---`);
  try {
    const emailResult = await emailService.sendTestEmail(testEmail);
    console.log(
      `SMTP Email Send Result: ${emailResult ? 'SUCCESS' : 'FAILED'}`,
    );
  } catch (err) {
    console.error('SMTP Email Error:', err);
  }

  console.log('\n--- testing WHATSAPP notification ---');
  try {
    const whatsappResult = await whatsappService.sendLeadNotification(
      'Test Lead User',
      'AI & Web Development',
      '+919876543210',
    );
    console.log(
      `WhatsApp Send Result: ${whatsappResult ? 'SUCCESS' : 'FAILED'}`,
    );
  } catch (err) {
    console.error('WhatsApp Error:', err);
  }

  await app.close();
  console.log('\nTesting session ended.');
}

bootstrap().catch(console.error);
