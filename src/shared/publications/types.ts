export interface Publication {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  category: PublicationCategory;
  featured_image_url: string;
  published_at: string;
  gallery_urls: string[];
  is_important: string;
  status: string;
  content: string;
}

export interface PublicationForm {
  title: string;
  category: PublicationCategory;
  published_at: string;
  featured_image_url?: string;
  gallery_urls: string[];
  content: string;
  is_important?: boolean;
  author_id?: string;
  status?: 'published' | 'unpublished';
  files?: FileList
}

export enum PublicationCategory {
  EVENT = 'event',
  NEWS = 'news',
  ANNOUNCEMENT = 'announcement',
}
