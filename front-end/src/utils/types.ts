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
  userId: number;
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

export interface AppUser {
  userName: string;
  id: number;
  isAdmin: boolean;
  email?: string;
}
