import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres"),
  registration_code: z.string().min(1, "Código de matrícula é obrigatório"),
  classId: z.number(
    {invalid_type_error: "O classId deve ser um número inteiro",
      required_error: "O classId é obrigatório"
    }).int()
});
// São validações iniciais, tenho que modificar