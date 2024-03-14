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

  async getPhotosByAlbumId(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return await response.json();
  }

  async createPhoto(photo: Photo) {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    return await response.json();
  }

  async updatePhoto(photo: Photo) {
    const response = await fetch(`${this.baseUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    return await response.json();
  }

  async deletePhoto(id: number) {
    const response = await fetch(`${this.baseUrl}/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.ok;
  }
}

export default PhotoService;
