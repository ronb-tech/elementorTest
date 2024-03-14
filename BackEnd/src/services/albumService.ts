import { User, Album, Photo } from "../models/types";
import { fetchData, mapHandles } from "../models/dataHandler";

export const getAlbumsByUserId = async (userId: string): Promise<Album[]> => {
  let photos: Photo[] = [];
  let albums: Album[] = [];

  try {
    albums = await fetchData(mapHandles.albums.allAlbums);
  } catch (error) {
    throw new Error("Failed to load album data");
  }

  try {
    photos = await fetchData(mapHandles.users.allUsers);
  } catch (error) {
    throw new Error("Failed to load user data");
  }

  // const albumCountByUserId = albums.reduce((acc, album) => {
  //   acc[album.user_id] = (acc[album.user_id] || 0) + 1;
  //   return acc;
  // }, {} as Record<number, number>);

  // const usersWithAlbumCount = users.map((user) => ({
  //   ...user,
  //   albumCount: albumCountByUserId[user._id] || 0,
  // }));

  return albums;
};
