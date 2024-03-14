import { User, Album, Photo } from "../models/types";
import { fetchData, mapHandles } from "../models/dataHandler";

export const getAlbumsByUserIdData = async (
  user_id: number
): Promise<Album[]> => {
  let photos: Photo[] = [];
  let albums: Album[] = [];

  try {
    const albumsData = await fetchData(mapHandles.albums.allAlbums);
    albums = (await albumsData?.filter(
      (album) => album.userId === user_id
    )) as Album[];
  } catch (error) {
    throw new Error("Failed to load album data");
  }

  try {
    photos = await fetchData(mapHandles.photos.allImages);
  } catch (error) {
    throw new Error("Failed to load user data");
  }

  const formattedPhoto = albums.map((album) => {
    const firstAlbumThumb = photos?.find(
      (photo) => photo.albumId === album._id
    )?.thumbnailUrl;

    return {
      ...album,
      thumbnailUrl: firstAlbumThumb || "",
    };
  });

  return formattedPhoto;
};
