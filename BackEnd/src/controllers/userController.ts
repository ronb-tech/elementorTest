import { Request, response, Response } from "express";
import { User } from "../models/types";
import { getAllUsersData } from "../services/usersService";
import { deleteItem, mapHandles } from "../models/dataHandler";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersData();
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

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const users: User[] = await getAllUsersData();
  const user = users.find((user) => user._id.toString() === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const users: User[] = await getAllUsersData();
  const user = await users.find((user) => user._id.toString() === id);
  if (user) {
    deleteItem({
      ...mapHandles.users.allUsers,
      itemId: user?._id,
    })
      .then((response) => {
        if (response) {
          return res.status(200).send({ message: "User deleted", ok: true });
        }
      })
      .catch(() => {
        return res.status(404).send({ message: "User not found", ok: false });
      });
  } else {
    res.status(500).send("Server error");
  }
};
