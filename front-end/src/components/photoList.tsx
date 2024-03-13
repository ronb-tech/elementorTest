import React from "react";
import { Photo } from "../utils/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface PhotoListProps {
  photos: Photo[];
  onImgClick: (img: Photo) => void;
  className: string;
}

const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  onImgClick,
  className,
}) => {
  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const fallbackImg = "https://picsum.photos/300/300";
    console.log("onImgError", fallbackImg);
    event.currentTarget.src = fallbackImg;
  };

  return (
    <div className="card-list">
      {photos.map((photo, index) => (
        <Card
          className="card-item"
          key={photo.id}
          onClick={() => onImgClick(photo)}
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
