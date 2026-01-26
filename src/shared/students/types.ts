export interface Student {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  email: string;
  last_name: string;
  first_name: string;
  patronymic: string | null;
  full_name: string;
  phone_number: string;
  avatar_url: string;
  faculty: string | null;
  group: string | null;
  building: string | null;
  room_number: string | null;
  university: string | null;
  field_of_study: string | null;
  cohort: string | null;
  year_of_study: number | null;
  residence_comment: string | null;
  is_admin: boolean;
  user_role: Role;
  resident_type: ResidentType;
}

export interface StudentForm {
  last_name: string;
  first_name: string;
  patronymic?: string;
  full_name?: string;
  email: string;
  phone_number: string;
  faculty: string;
  group: string;
  building: string;
  room_number: string;
  university: string;
  field_of_study: string;
  cohort?: string;
  year_of_study: number;
  residence_comment?: string;
  is_admin?: boolean;
  user_role?: Role;
  resident_type?: ResidentType;
}

export enum Role {
  'SYSTEM_ADMIN' = 'system_admin',
  'MANAGER_COMPANY_ADMIN' = 'manager_company_admin',
  'COMMERCIAL_ORG_ADMIN' = 'commercial_org_admin',
  'OPERATIONS_DISPATCHER' = 'operations_dispatcher',
  'TEACHER' = 'teacher',
  'TUTOR' = 'tutor',
  'STUDENT' = 'student',
  'APPLICANT' = 'applicant',
  'guest' = 'guest',
}

export enum ResidentType {
  STUDENT = 'student',
  STAFF = 'staff',
  GUEST = 'guest',
}