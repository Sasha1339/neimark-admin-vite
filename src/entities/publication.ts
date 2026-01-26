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
  gallery_urls:
    z.array(z.string()),
  content:
    z.string().min(1, 'Описание обязательно'),
  published_at:
    z.string().min(1, 'Дата обязательна'),
  files:
    z
      .custom<FileList>().optional()
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