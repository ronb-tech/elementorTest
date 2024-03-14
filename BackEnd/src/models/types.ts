export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  albumCount?: number;
  createdAt?: string;
  lastUpdated?: Date;
  limit?: number;
  avatarUrl?: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
  thumbnailUrl?: string;
  limit?: number;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  amout?: number;
  limit?: number;
}
