import { z } from 'zod';

export const answerSchema = z.object({
  examId: z.number({
    required_error: "O ID da prova é obrigatório",
    invalid_type_error: "O ID da prova deve ser um número"
  }).int().positive("O ID deve ser positivo"),

  answers: z.array(
    z.string().min(1, "Cada resposta precisa ter pelo menos um caractere")
  ).min(1, "A lista de respostas não pode estar vazia")
});