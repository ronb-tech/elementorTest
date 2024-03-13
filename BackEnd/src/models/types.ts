export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  lastUpdated?: Date;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
  thumbnailUrl?: string;
}
