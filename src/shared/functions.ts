import type {Room} from "@/shared/types.ts";
import type {Student} from "@/shared/students/types.ts";

export const withUrlImages = (id: string) => {
  return `https://resto-mate.ru/images/api/v1/images?fileName=${id}`;
}

export const withUrlDocuments = (id: string) => {
  return `http://localhost:3000/documents-library/api/view?file=${id}`;
}

export function formatDate(line: string): string {
  const date = new Date(line);
  return date.toLocaleString('ru-RU');
}

export function formatDateWithoutTime(line: string): string {
  const date = new Date(line);
  return date.toLocaleDateString('ru-RU');
}

export const getFullName = (student: Student) => {
  return `${student.first_name} ${student.last_name}` + (student.patronymic ?? '');
};

export const getNameRoom = (room: Room) => {
  return `Корпус ${room.building}, комната ${room.number}`
}