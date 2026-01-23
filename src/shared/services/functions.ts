import {ServiceStatus} from "@/shared/services/types.ts";
import type {ColorType} from "@/shared/documents/types.ts";

export function getNameServiceStatus(status: ServiceStatus): string {
  switch (status) {
    case ServiceStatus.ACCEPTED:
      return 'Принято';
    case ServiceStatus.CANCELLED:
      return 'Отменено';
    case ServiceStatus.COMPLETED:
      return 'Выполнено';
    case ServiceStatus.PENDING:
      return 'В ожидании';
    default:
      return '<Статус не известен>'
  }
}

export function getColorByServiceStatus(status: ServiceStatus): ColorType {
  switch (status) {
    case ServiceStatus.ACCEPTED:
      return 'main-purple';
    case ServiceStatus.CANCELLED:
      return 'main-pink';
    case ServiceStatus.COMPLETED:
      return 'main-green';
    case ServiceStatus.PENDING:
      return 'main-active';
    default:
      return 'main-white'
  }
}