export interface StudentMainInfo {
  firstname: string;
  lastname: string;
  patronymic?: string;
}


export interface Student extends StudentMainInfo {

  email: string;
  phone: string;
  university: string;
  faculty: string;
  direction: string;
  stream?: string;
  group: string;
  course: string;
  building: string;
  room: string;
  additionally?: string;
}