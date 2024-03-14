export interface User {
  _id: number;
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
  _id: number;
  user_id: number;
  title: string;
  thumbnailUrl?: string;
  limit?: number;
}

export interface Photo {
  _id: number;
  albumId: number;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  amout?: number;
  limit?: number;
}
