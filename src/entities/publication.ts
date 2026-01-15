import {z} from 'zod';
import {PublicationCategory} from "@/shared/publications/types.ts";


export const createPublicationScheme = z.object({
    title: z.string().min(1, 'Название обязательно'),
  category: z.enum(
    [PublicationCategory.EVENTS, PublicationCategory.NEWS, PublicationCategory.POST],
    {
      errorMap: () => ({ message: 'Выберите категорию' })
    }
  ),
    description:
      z.string().min(1, 'Описание обязательно'),
    date:
      z.string().min(1, 'Дата обязательна'),
    files:
      z
        .custom<FileList>() // используем custom для типизации
        .refine((files) => files && files.length > 0, {message: 'Файл обязателен'}),
  })
;