export interface DocumentForm {
  name: string;
  date: string;
}

export interface DocumentData extends DocumentForm {
  status: string;
  file: string;
  student: Student;
}

export interface Student {
  firstname: string;
  lastname: string;
  patronymic?: string;
  email?: string;
  phone?: string;
  university?: string;
  faculty?: string;
  direction?: string;
  stream?: string;
  group?: string;
  course?: string;
  building?: string;
  room?: string;
  additionally?: string;
}

export interface Publication {
  title: string;
  category: string;
  description: string;
  date: string;
  files: FileList
}

export interface Room {
  id: string;
  number: number;
  building: number;
  date: string;
  status: string;
}
