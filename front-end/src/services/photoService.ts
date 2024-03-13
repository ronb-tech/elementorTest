import { Photo } from "../utils/types";

class PhotoService {
  baseUrl: string;

  constructor(BASE_URL: string) {
    this.baseUrl = BASE_URL;
  }

  async getAllPhotos() {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async getPhotoById(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return await response.json();
  }

  async createPhoto(photo: Photo) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    return await response.json();
  }

  async updatePhoto(id: number, photo: Photo) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    return await response.json();
  }

  async deletePhoto(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    return await response.ok;
  }
}

export default PhotoService;
