import { Test, TestingModule } from '@nestjs/testing';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

const mockInquiriesService = {
  create: jest.fn().mockResolvedValue({ success: true }),
  findAll: jest.fn().mockResolvedValue({ success: true, data: [] }),
  findOne: jest.fn().mockResolvedValue({ success: true, data: {} }),
  updateStatus: jest.fn().mockResolvedValue({ success: true }),
  exportCsv: jest.fn().mockResolvedValue('id,name,email'),
};

describe('InquiriesController', () => {
  let controller: InquiriesController;
  let service: InquiriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InquiriesController],
      providers: [
        { provide: InquiriesService, useValue: mockInquiriesService },
      ],
    }).compile();

    controller = module.get<InquiriesController>(InquiriesController);
    service = module.get<InquiriesService>(InquiriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO, IP address and user-agent', async () => {
      const dto = new CreateInquiryDto();
      const mockReq = {
        ip: '127.0.0.1',
        headers: {
          'x-forwarded-for': '203.0.113.195',
          'user-agent': 'Chrome/Testing',
        },
      } as any;

      const result = await controller.create(dto, mockReq);

      expect(service.create).toHaveBeenCalledWith(
        dto,
        '203.0.113.195',
        'Chrome/Testing',
      );
      expect(result).toEqual({ success: true });
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with page, limit and status parameters', async () => {
      const result = await controller.findAll('2', '15', 'PENDING');

      expect(service.findAll).toHaveBeenCalledWith({
        page: '2',
        limit: '15',
        status: 'PENDING',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('exportCsv', () => {
    it('should get CSV data, set headers and send the response', async () => {
      const mockRes = {
        set: jest.fn(),
        send: jest.fn().mockReturnValue('response_sent'),
      } as any;

      await controller.exportCsv(mockRes);

      expect(service.exportCsv).toHaveBeenCalled();
      expect(mockRes.set).toHaveBeenCalledWith('Content-Type', 'text/csv');
      expect(mockRes.set).toHaveBeenCalledWith(
        'Content-Disposition',
        'attachment; filename="inquiries.csv"',
      );
      expect(mockRes.send).toHaveBeenCalledWith('id,name,email');
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id', async () => {
      const result = await controller.findOne('inq_123');

      expect(service.findOne).toHaveBeenCalledWith('inq_123');
      expect(result.success).toBe(true);
    });
  });

  describe('updateStatus', () => {
    it('should call service.updateStatus with id and status', async () => {
      const result = await controller.updateStatus('inq_123', 'RESOLVED');

      expect(service.updateStatus).toHaveBeenCalledWith('inq_123', 'RESOLVED');
      expect(result.success).toBe(true);
    });
  });
});
