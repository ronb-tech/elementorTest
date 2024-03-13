import { User, Album } from "../models/types";
const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.JSONPLACEHOLDER_URL;
const imagePath = process.env.PICSUM_URL;

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${baseUrl}users`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const users = await response.json();
    const formattedUsers = users.map((user: any) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      };
    });
    return formattedUsers;
  } catch (err) {
    console.error("getUsers", err);
    return [];
  }
};

export const getAllalbums = async (): Promise<Album[]> => {
  try {
    const response = await fetch(`${baseUrl}albums`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const albums = await response.json();

    return albums;
  } catch (err) {
    console.error("getAlbums", err);
    return [];
  }
};
