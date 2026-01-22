import {DocumentType} from "@/shared/documents/types.ts";

export const getNameDocument = (type: DocumentType) => {
  switch (type) {
    case DocumentType.RESIDENCE_PERMIT:
      return 'Разрешение на проживание';
    case DocumentType.PASSPORT:
      return 'Паспорт';
    case DocumentType.VISA:
      return 'ВИЗА';
    default:
      return '<Безымянный>';
  }
}