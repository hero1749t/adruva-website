import { validate } from 'class-validator';
import { CreateInquiryDto } from './create-inquiry.dto';

describe('CreateInquiryDto', () => {
  let dto: CreateInquiryDto;

  beforeEach(() => {
    dto = new CreateInquiryDto();
    dto.name = 'John Doe';
    dto.email = 'john@example.com';
    dto.recaptchaToken = 'mock_recaptcha_token';
  });

  it('should validate successfully with correct values', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when name is empty', async () => {
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail validation when email is invalid', async () => {
    dto.email = 'invalid-email';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should fail validation when recaptchaToken is missing', async () => {
    delete (dto as any).recaptchaToken;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('recaptchaToken');
  });

  it('should allow optional fields like phone and message', async () => {
    dto.phone = '+919876543210';
    dto.message = 'I am interested in Web Development services';
    dto.companyName = 'Example Corp';
    dto.serviceInterested = 'Web Development';
    dto.budgetRange = '₹15,000 - ₹30,000';
    dto.timeline = '1-2 weeks';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
