import {z} from 'zod';
import {PublicationCategory} from "@/shared/publications/types.ts";


export const createPublicationScheme = z.object({
  title: z.string().min(1, 'Название обязательно'),
  category: z.enum(
    [PublicationCategory.EVENT, PublicationCategory.NEWS, PublicationCategory.ANNOUNCEMENT],
    {
      errorMap: () => ({message: 'Выберите категорию'})
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
});

export const updatePublicationScheme = z.object({
  title: z.string().min(1, 'Название обязательно'),
  category: z.enum(
    [PublicationCategory.EVENT, PublicationCategory.NEWS, PublicationCategory.ANNOUNCEMENT],
    {
      errorMap: () => ({message: 'Выберите категорию'})
    }
  ),
  content:
    z.string().min(1, 'Описание обязательно'),
  gallery_urls:
    z.array(z.string()),
  published_at:
    z.string().min(1, 'Дата обязательна'),
  files:
    z.custom<FileList>().optional()
});