import type {Student} from "@/shared/students/types.ts";

export interface DocumentForm {
  name: string;
  date: string;
}

export interface DocumentData extends DocumentForm {
  status: string;
  file: string;
  student: Student;
}

export interface Room {
  id: string;
  number: number;
  building: number;
  date: string;
  status: string;
}
