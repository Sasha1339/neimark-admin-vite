import {z} from 'zod';


export const studentScheme = z.object({
    last_name: z.string().min(1, 'Фамилия обязательно'),
    first_name: z.string().min(1, 'Имя обязательно'),
    patronymic: z.string().optional(),
    email: z.string().min(1, 'Email обязательно').email('Не верный формат Email'),
    phone_number: z.string().min(1, 'Телефон обязательно').min(11, 'Должен содрежать 11 цифр').max(12, 'Должен содрежать 11 цифр'),
    university: z.string().min(1, 'Требуется полное название университета'),
    faculty: z.string().min(1, 'Требуется полное название факультета'),
    field_of_study: z.string().min(1, 'Требуется выбрать направление подготовки'),
    cohort: z.string().optional(),
    group: z.string().min(1, 'Номер группы обязателен'),
    year_of_study: z.number().refine((e) => e && e > -1, 'Требуется выбрать курс'),
    building: z.string().min(1, 'Номер корпуса проживания обязателен'),
    room_number: z.string().min(1, 'Номер комнаты проживания обязателен'),
    resident_comment: z.string().optional(),
  });