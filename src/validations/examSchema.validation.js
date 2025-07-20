import { z } from 'zod';

export const examSchema = z.object({
  title: z.string().min(1),
  questions_count: z.number().int().positive(),
  answer_key: z.array(z.string()).min(1),
  teacherId: z.number().int().positive(),
  classId: z.number().int().positive(),
   bimester: z.number({
      required_error: "O bimestre é obrigatório",
      invalid_type_error: "O bimestre precisa ser um número",
    })
    .int()
    .min(1, "Bimestre deve ser entre 1 e 4")
    .max(4, "Bimestre deve ser entre 1 e 4"), 
});
