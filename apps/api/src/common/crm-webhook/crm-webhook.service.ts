import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CrmWebhookService {
  private readonly logger = new Logger(CrmWebhookService.name);

  async pushLeadToCRM(inquiry: {
    name: string;
    email: string;
    phone?: string | null;
    companyName?: string | null;
    serviceInterested?: string | null;
    budgetRange?: string | null;
    timeline?: string | null;
    message?: string | null;
    createdAt?: Date | null;
    ipAddress?: string | null;
  }): Promise<string | null> {
    const url = process.env.ADRUVA_CRM_WEBHOOK_URL;
    const secret = process.env.ADRUVA_CRM_WEBHOOK_SECRET;

    if (!url || url === 'http://localhost:4000/webhook') {
      this.logger.log(`Mock CRM webhook pushed: ${JSON.stringify(inquiry)}`);
      return `crm_lead_${Math.random().toString(36).substring(2, 11)}`;
    }

    try {
      const payload = {
        source: 'website_contact_form',
        lead: {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone || '',
          company: inquiry.companyName || '',
          service: inquiry.serviceInterested || '',
          budget: inquiry.budgetRange || '',
          timeline: inquiry.timeline || '',
          message: inquiry.message || '',
          created_at: (inquiry.createdAt || new Date()).toISOString(),
          ip_address: inquiry.ipAddress || '',
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': secret || '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        this.logger.error(
          `CRM webhook failed with status ${response.status}: ${errText}`,
        );
        return null;
      }

      const data = (await response.json()) as {
        lead_id?: string;
        success?: boolean;
      };
      return data.lead_id || null;
    } catch (error) {
      this.logger.error(`CRM webhook push error: ${(error as Error).message}`);
      return null;
    }
  }
}
