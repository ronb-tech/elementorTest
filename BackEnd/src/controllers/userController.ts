import { Request, Response } from "express";
import { User } from "../models/types";
import { getUsers } from "../utils/getMockData";

let users: User[] = [];

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    users = await getUsers();
    if (users && users.length > 0) {
      res.json(users);
    } else {
      throw new Error("No users found");
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user) => user.id.toString() === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
};
