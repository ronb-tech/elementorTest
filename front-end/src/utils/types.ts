export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  lastUpdated?: Date;
  limit?: number;
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

export interface AppUser {
  userName: string;
  id: number;
  isAdmin: boolean;
  email?: string;
}
