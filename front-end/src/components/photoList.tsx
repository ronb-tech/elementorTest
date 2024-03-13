import React from "react";
import { Photo } from "../utils/types";

interface PhotoListProps {
  photos: Photo[];
  onImgClick: (img: Photo) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, onImgClick }) => {
  const fallbackImg = "https://example.com/fallback-image.jpg";

  return (
    <div className="photo-list">
      {photos.map((photo, index) => (
        <img
          key={photo.id}
          src={photo.url}
          alt={photo.title}
          onError={(e) => (e.currentTarget.src = fallbackImg)}
          style={{ width: 100, height: 100 }}
          onClick={() => onImgClick(photo)}
        />
      ))}
    </div>
  );
};

export default PhotoList;
