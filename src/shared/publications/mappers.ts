import {PublicationCategory} from "@/shared/publications/types.ts";

export const toCategory = (category: PublicationCategory) => {

  switch (category) {
    case PublicationCategory.NEWS:
      return 'Новости';
    case PublicationCategory.EVENTS:
      return 'События';
    case PublicationCategory.POST:
      return 'Новости';
  }

}