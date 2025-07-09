import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "O ID deve ser numérico").transform(Number)
});
