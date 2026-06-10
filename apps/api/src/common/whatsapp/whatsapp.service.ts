import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly metaApi = 'https://graph.facebook.com/v18.0';

  async sendLeadNotification(
    name: string,
    service: string,
    phone: string,
  ): Promise<boolean> {
    const to = process.env.TEAM_WHATSAPP;
    const token = process.env.META_WHATSAPP_TOKEN;
    const phoneId = process.env.META_PHONE_NUMBER_ID;

    if (!to || !token || !phoneId || token === 'dummy_whatsapp_token') {
      this.logger.log(
        `Mock WhatsApp notification sent to team | Lead: ${name}, Service: ${service}, Phone: ${phone}`,
      );
      return true;
    }

    try {
      const response = await fetch(`${this.metaApi}/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: 'new_website_lead',
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },
                  { type: 'text', text: service || 'N/A' },
                  { type: 'text', text: phone || 'N/A' },
                ],
              },
            ],
          },
        }),
      });

      if (!response.ok) {
        const errData = (await response.json()) as Record<string, unknown>;
        this.logger.error(
          `Meta API WhatsApp send failed: ${JSON.stringify(errData)}`,
        );
        return false;
      }

      this.logger.log('WhatsApp notification sent successfully to team.');
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send WhatsApp message: ${(error as Error).message}`,
      );
      return false;
    }
  }
}
