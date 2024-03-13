import { Request, Response } from "express";
import { User } from "@/models/types";

// Mock users data, import it form other const file later
const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" ,username: "John"},
    { id: 2, name: "Jane Doe", email: "jane@example.com" ,username: "Jane"},
];

export const getAllUsers = (req: Request, res: Response) => {
    res.json(users);
    //add error hanlding to response
    
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