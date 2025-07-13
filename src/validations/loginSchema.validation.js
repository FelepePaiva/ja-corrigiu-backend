import {adminSchema} from '../validations/adminSchema.validation.js';
export const loginSchema = adminSchema.pick({
    email: true,
    password: true,
});