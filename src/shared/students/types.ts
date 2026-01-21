export interface Student {
  last_name: string;
  first_name: string;
  patronymic: string;
  full_name: string;
  phone_number: string;
  avatar_url: string;
  faculty: string;
  group: string;
  building: string;
  room_number: string;
  university: string;
  field_of_study: string;
  cohort: string;
  year_of_study: string;
  resident_comment: string;
  is_admin: boolean;
  user_role: Role;
  resident_type: ResidentType;
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