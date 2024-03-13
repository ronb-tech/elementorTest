import { Album } from "../utils/types";

class AlbumService {
  baseUrl: string;

  constructor(BASE_URL: string) {
    this.baseUrl = BASE_URL;
  }

  async getAllAlbums() {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async getAlbumById(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return await response.json();
  }

  async createAlbum(album: Album) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album),
    });
    return await response.json();
  }

  async updateAlbum(id: number, album: Album) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album),
    });
    return await response.json();
  }

  async deleteAlbum(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    return await response.ok;
  }
}

export default AlbumService;
