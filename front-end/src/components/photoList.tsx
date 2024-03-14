import React from "react";
import { Photo } from "../utils/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface PhotoListProps {
  photos: Photo[];
  onImgClick: (index: number) => void;
  className: string;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, onImgClick }) => {
  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const fallbackImg =
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
    console.log("onImgError", fallbackImg);
    event.currentTarget.src = fallbackImg;
  };

  return (
    <div className="card-list">
      {photos.map((photo, index) => (
        <Card
          className="card-item"
          key={photo._id}
          onClick={() => onImgClick(index)}
        >
          <CardMedia
            component="img"
            className="card-img"
            image={photo?.url}
            title={photo.title}
            onError={onImgError}
            loading="lazy"
          />
        </Card>
      ))}
    </div>
  );
};

export default PhotoList;
