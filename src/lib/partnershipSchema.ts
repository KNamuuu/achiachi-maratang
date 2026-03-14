import { z } from 'zod';

export const partnershipSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  phone: z
    .string()
    .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '올바른 전화번호를 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  region: z.string().min(1, '희망 지역을 선택해주세요.'),
  budget: z.string().min(1, '투자 예산을 선택해주세요.'),
  experience: z.string().min(1, '외식업 경험을 선택해주세요.'),
  message: z.string().optional(),
});

export type PartnershipFormData = z.infer<typeof partnershipSchema>;
