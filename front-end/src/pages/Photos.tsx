import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Photo } from "../utils/types";
import { photoServiceLogic } from "../services/index";
import SkeletonCard from "../components/SkeletonCard";
import PhotoList from "../components/photoList";
import Carousel from "../components/Carousel";

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let { albumId } = useParams<"albumId">();
  let albumIdNumber = albumId ? parseInt(albumId, 10) : 0;

  if (isNaN(albumIdNumber)) {
    albumIdNumber = 0;
  }

  const onImgCaruselSelected = (img: Photo) => {
    console.log("on onImgCaruselSelected", img);
  };

  const getPhotos = async (album_id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const photosData = await photoServiceLogic.getPhotosByAlbumId(album_id);
      if (photosData.length > 0) {
        setPhotos(photosData);
      } else {
        setError("No photos found");
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to get photos");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (albumIdNumber > 0) {
      getPhotos(albumIdNumber);
    }
  }, [albumIdNumber]);

  if (isLoading) {
    return <SkeletonCard loading={true} numberOfItems={6} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-photos">
      <h2>Photos in Album number {albumId}</h2>
      {photos.length > 0 ? (
        <div>
          <Carousel photos={photos}></Carousel>
          <PhotoList
            photos={photos}
            onImgClick={onImgCaruselSelected}
          ></PhotoList>
        </div>
      ) : (
        <div>No photos found</div>
      )}
    </div>
  );
};

export default Photos;
