import { Test, TestingModule } from '@nestjs/testing';
import { InquiriesService } from './inquiries.service';
import { PrismaService } from '../../prisma/prisma.service';
import { RecaptchaService } from '../../common/recaptcha/recaptcha.service';
import { EmailService } from '../../common/email/email.service';
import { WhatsappService } from '../../common/whatsapp/whatsapp.service';
import { CrmWebhookService } from '../../common/crm-webhook/crm-webhook.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockInquiry = {
  id: 'inq_123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  companyName: 'Test Corp',
  serviceInterested: 'web-development',
  budgetRange: '₹15,000',
  timeline: '1-2 weeks',
  message: 'Test message',
  status: 'PENDING',
  crmLeadId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  websiteInquiry: {
    create: jest.fn().mockResolvedValue(mockInquiry),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockInquiry, crmLeadId: 'crm_987' }),
    findMany: jest.fn().mockResolvedValue([mockInquiry]),
    count: jest.fn().mockResolvedValue(1),
    findUnique: jest.fn().mockResolvedValue(mockInquiry),
  },
};

const mockRecaptchaService = {
  verify: jest.fn().mockResolvedValue(true),
};

const mockEmailService = {
  sendUserConfirmation: jest.fn().mockResolvedValue(true),
  sendTeamNotification: jest.fn().mockResolvedValue(true),
};

const mockWhatsappService = {
  sendLeadNotification: jest.fn().mockResolvedValue(true),
};

const mockCrmWebhookService = {
  pushLeadToCRM: jest.fn().mockResolvedValue('crm_987'),
};

describe('InquiriesService', () => {
  let service: InquiriesService;
  let prisma: PrismaService;
  let recaptcha: RecaptchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiriesService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: RecaptchaService, useValue: mockRecaptchaService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: WhatsappService, useValue: mockWhatsappService },
        { provide: CrmWebhookService, useValue: mockCrmWebhookService },
      ],
    }).compile();

    service = module.get<InquiriesService>(InquiriesService);
    prisma = module.get<PrismaService>(PrismaService);
    recaptcha = module.get<RecaptchaService>(RecaptchaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      companyName: 'Test Corp',
      serviceInterested: 'web-development',
      budgetRange: '₹15,000',
      timeline: '1-2 weeks',
      message: 'Test message',
      recaptchaToken: 'valid_token',
    };

    it('should successfully create an inquiry when reCAPTCHA is valid', async () => {
      const result = await service.create(dto, '127.0.0.1', 'Mozilla/5.0');

      expect(recaptcha.verify).toHaveBeenCalledWith('valid_token');
      expect(prisma.websiteInquiry.create).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        message: "Your message has been sent! We'll get back within 24 hours.",
        data: { inquiryId: 'inq_123' },
      });
    });

    it('should bypass verification for the mock testing reCAPTCHA key', async () => {
      const testDto = {
        ...dto,
        recaptchaToken: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      };
      const result = await service.create(testDto, '127.0.0.1', 'Mozilla/5.0');

      expect(recaptcha.verify).not.toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it('should throw BadRequestException when reCAPTCHA fails', async () => {
      mockRecaptchaService.verify.mockResolvedValueOnce(false);

      await expect(service.create(dto, '127.0.0.1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return paginated list of inquiries', async () => {
      const result = await service.findAll({ page: '1', limit: '10' });

      expect(prisma.websiteInquiry.findMany).toHaveBeenCalled();
      expect(prisma.websiteInquiry.count).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockInquiry]);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single inquiry by ID', async () => {
      const result = await service.findOne('inq_123');

      expect(prisma.websiteInquiry.findUnique).toHaveBeenCalledWith({
        where: { id: 'inq_123' },
      });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockInquiry);
    });

    it('should throw NotFoundException if inquiry does not exist', async () => {
      mockPrismaService.websiteInquiry.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOne('inq_invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStatus', () => {
    it('should update and return the updated inquiry', async () => {
      const result = await service.updateStatus('inq_123', 'CONTACTED');

      expect(prisma.websiteInquiry.update).toHaveBeenCalledWith({
        where: { id: 'inq_123' },
        data: { status: 'CONTACTED' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('exportCsv', () => {
    it('should return correctly formatted CSV string', async () => {
      const csv = await service.exportCsv();

      expect(csv).toContain(
        'ID,Name,Email,Phone,Company,Service,Budget,Timeline,Message,Status,CRM Lead ID,Created At',
      );
      expect(csv).toContain('inq_123');
      expect(csv).toContain('"John Doe"');
    });
  });
});
