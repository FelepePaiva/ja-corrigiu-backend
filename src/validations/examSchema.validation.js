import { z } from 'zod';

export const examSchema = z.object({
  title: z.string().min(1),
  questions_count: z.number().int().positive(),
  answer_key: z.array(z.string()).min(1),
  teacherId: z.number().int().positive(),
  classId: z.number().int().positive()  
});
