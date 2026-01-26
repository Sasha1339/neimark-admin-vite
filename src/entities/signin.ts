import {z} from "zod";

export const signinScheme = z.object({
  email: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
});