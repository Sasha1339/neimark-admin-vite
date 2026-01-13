import type {Student} from "@/shared/types.ts";

export const withUrlImages = (id: string) => {
  return `https://resto-mate.ru/images/api/v1/images?fileName=${id}`;
}

export function formatDate(line: string): string {
  const date = new Date(line);
  return date.toLocaleString('ru-RU');
}

export const getFullName = (student: Student) => {
  return `${student.firstname} ${student.lastname}` + (student.patronymic ?? '');
};