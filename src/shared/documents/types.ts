export interface DocumentFile {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  profile_id: string;
  type: DocumentType;
  status: DocumentStatus;
  file_id: string;
  file_url: string;
}

export enum DocumentType {
  'PASSPORT' = 'passport',
  'RESIDENCE_PERMIT' = 'residence_permit',
  'VISA' = 'visa'
}

export enum DocumentStatus {
  'PENDING' = 'pending',
  'APPROVED' = 'approved',
  'REJECTED' = 'rejected',
  'EXPIRED' = 'expired',
}
