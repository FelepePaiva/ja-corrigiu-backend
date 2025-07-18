import {z} from 'zod';

export const teacherSchema = z.object({
    name: z.string().min(3, "O nome precisa ter 3 caracteres ou mais."),
    email: z.string().email("Email inválido"),
    cpf: z.string().min(11, "O CPF precisa ter 11 caracteres, no mínimo"),
    password: z.string().min(6, "A senha precisa ter 6 caracteres, no mínimo"),
    disciplineId: z.number(
    {invalid_type_error: "O disciplineId deve ser um número inteiro",
      required_error: "O disciplineId é obrigatório"
    }).int()
})