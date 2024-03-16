import { User, Album, Photo } from "../models/types";
import { fetchData, mapHandles } from "../models/dataHandler";

import UserModel from "../models/userModel";

export const getAllUsersData = async (): Promise<User[]> => {
  let users: User[] = [];
  let albums: Album[] = [];

  //just for the example for getting from mongoDB
  UserModel.find()
    .lean()
    .then((users) => {
      console.log("users from mongo", users);
    })
    .catch((err) => {
      console.log("error from mongo", err);
    });

  try {
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
