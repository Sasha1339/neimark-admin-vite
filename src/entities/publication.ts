import {z} from 'zod';

export const createPublicationScheme = z.object({
  title: z.string().min(1, 'Название обязательно'),
  category: z.string().min(1, 'Выберите категорию'),
  description: z.string().min(1, 'Описание обязательно'),
  date: z.string().min(1, 'Дата обязательна'),
  files: z
    .custom<FileList>() // используем custom для типизации
    .refine((files) => files && files.length > 0, { message: 'Файл обязателен' }),
});