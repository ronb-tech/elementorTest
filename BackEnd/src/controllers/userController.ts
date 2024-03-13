import { Request, Response } from "express";
import { User } from "../models/types";

// Mock users data, import it form other const file later
const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", username: "John" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", username: "Jane" },
];

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // const users = await User.find({});
    res.json(users);
  } catch (error) {
    //log the error
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
