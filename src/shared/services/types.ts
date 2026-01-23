export interface ServiceModel {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  status: ServiceStatus;
  service_type: ServiceType;
  building: string;
  room_number: string;
  scheduled_date: string | null;
  time_slot: string | null;
  contact_phone: string;
  description: string;
  chat_id: string;
}

export interface Chat {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  type: ChatType;
  is_group: boolean;
  description: string;
}

export interface MessageModel {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  conversation_id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  message_type: string;
}

export interface MessageForm {
  conversation_id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  message_type: string;
  created_at: string;
}

export enum ServiceStatus {
  'PENDING' = 'pending',
  'ACCEPTED' = 'accepted',
  'COMPLETED' = 'completed',
  'CANCELLED' = 'cancelled',
}

export enum ServiceType {
  'CLEANING' = 'cleaning',
  'HANDYMAN' = 'handyman',
  'MANAGEMENT_COMPANY' = 'management_company',
}

export enum ChatType {
  CONCIERGE = 'concierge',
  FACULTY_COURSE = 'faculty_course',
  FACULTY_PROGRAM = 'faculty_program',
  FACULTY_UNIVERSITY = 'faculty_university',
  TEACHER = 'teacher',
  DIRECT = 'direct',
}