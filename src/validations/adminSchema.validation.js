    import {z} from 'zod';

    export const adminSchema = z.object({
        name: z.string().min(3, "O nome precisa ter três caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "A senha precisa ter 6 caracters, no mínimo")
    });