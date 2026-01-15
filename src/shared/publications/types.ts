export interface PublicationLink {
  title: string;
  category: PublicationCategory;
  date: string;
}

export interface Publication {
  title: string;
  category: PublicationCategory;
  description: string;
  date: string;
  files: FileList
}

export enum PublicationCategory {
  EVENTS = 'events',
  NEWS = 'news',
  POST = 'post',
}
