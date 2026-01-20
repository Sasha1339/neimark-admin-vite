import {PublicationCategory} from "@/shared/publications/types.ts";

export const toCategory = (category: PublicationCategory) => {

  switch (category) {
    case PublicationCategory.NEWS:
      return 'Новости';
    case PublicationCategory.EVENT:
      return 'События';
    case PublicationCategory.ANNOUNCEMENT:
      return 'Объявления';
    default:
      return '<Не выбрано>';
  }

}