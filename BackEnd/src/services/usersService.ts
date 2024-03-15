import { User, Album, Photo } from "../models/types";
import { fetchData, mapHandles } from "../models/dataHandler";

import UserModel from "../models/userModel";

export const getAllUsersData = async (): Promise<User[]> => {
  let users: User[] = [];
  let albums: Album[] = [];

  try {
    //just for the example for getting from mongoDB
    const usersFromMongo: User[] = await UserModel.find().lean();

    users = await fetchData(mapHandles.users.allUsers);
  } catch (error) {
    throw new Error("Failed to load user data");
  }

  try {
    albums = await fetchData(mapHandles.albums.allAlbums);
  } catch (error) {
    throw new Error("Failed to load album data");
  }

  const albumCountByUserId = albums.reduce((acc, album) => {
    acc[album.userId] = (acc[album.userId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const usersWithAlbumCount = users.map((user) => ({
    ...user,
    albumCount: albumCountByUserId[user._id] || 0,
  }));

  return usersWithAlbumCount;
};
