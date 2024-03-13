import { User } from "../utils/types";

class userService {
  baseUrl: string;
  constructor(BASE_URL: string) {
    this.baseUrl = BASE_URL;
  }

  async getAllUsers() {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async getUserById(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return await response.json();
  }

  async createUser(user: User) {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  }

  async updateUser(id: number, user: User) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  }

  async deleteUser(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    return await response.ok;
  }
}

export default userService;
