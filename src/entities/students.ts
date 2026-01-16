import {z} from 'zod';


export const studentScheme = z.object({
    lastname: z.string().min(1, 'Фамилия обязательно'),
    firstname: z.string().min(1, 'Имя обязательно'),
    patronymic: z.string().optional(),
    email: z.string().min(1, 'Email обязательно').email('Не верный формат Email'),
    phone: z.string().min(1, 'Телефон обязательно').min(11, 'Должен содрежать 11 цифр').max(11, 'Должен содрежать 11 цифр'),
    university: z.string().min(1, 'Требуется полное название университета'),
    faculty: z.string().min(1, 'Требуется полное название факультета'),
    direction: z.string().min(1, 'Требуется выбрать направление подготовки'),
    stream: z.string().optional(),
    group: z.string().min(1, 'Номер группы обязателен'),
    course: z.string().min(1, 'Требуется выбрать курс'),
    building: z.string().min(1, 'Номер корпуса проживания обязателен'),
    room: z.string().min(1, 'Номер комнаты проживания обязателен'),
    additionally: z.string().optional(),
  })
;