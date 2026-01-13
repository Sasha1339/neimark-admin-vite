export interface DocumentForm {
  name: string;
  date: string;
}

export interface DocumentData extends DocumentForm {
  status: string;
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
