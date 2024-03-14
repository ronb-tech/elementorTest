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

  async updateUser(user: User) {
    const response = await fetch(`${this.baseUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  }

  async deleteUser(id: number) {
    const response = await fetch(`${this.baseUrl}/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.ok;
  }
}

export default userService;
