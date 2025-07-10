import {z} from 'zod';
export const classSchema = z.object({
    code: z.string().regex(/^[5-9][A-Z][MT]$/, {
  message: "Código da turma inválido. Use o formato: 6BT, 8AM, etc.",
})
})


