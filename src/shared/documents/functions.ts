import {type ColorType, DocumentStatus, DocumentType} from "@/shared/documents/types.ts";
import {colors} from "@/shared/colors.ts";

export const getNameDocument = (type: DocumentType) => {
  switch (type) {
    case DocumentType.RESIDENCE_PERMIT:
      return 'Разрешение на проживание';
    case DocumentType.PASSPORT:
      return 'Паспорт';
    case DocumentType.VISA:
      return 'Виза';
    default:
      return '<Безымянный>';
  }
}

export const withDocumentUrl = (id: string) => {
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/profile_documents/files/${id}/view?project=neimark`
}

export function getNameStatus(status: DocumentStatus): string {
  switch (status) {
    case DocumentStatus.REJECTED:
      return 'Отклонен';
    case DocumentStatus.EXPIRED:
      return 'Истек срок действия';
    case DocumentStatus.APPROVED:
      return 'Подвержден';
    case DocumentStatus.PENDING:
      return 'В ожидании';
    default:
      return '<Статус не известен>'
  }
}

export function getColorByStatus(status: DocumentStatus): ColorType {
  switch (status) {
    case DocumentStatus.REJECTED:
      return 'main-red';
    case DocumentStatus.EXPIRED:
      return 'main-red';
    case DocumentStatus.APPROVED:
      return 'main-green';
    case DocumentStatus.PENDING:
      return 'main-active';
    default:
      return 'main-white'
  }
}