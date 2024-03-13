import React from "react";
import { Photo } from "../utils/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface PhotoListProps {
  photos: Photo[];
  onImgClick: (img: Photo) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, onImgClick }) => {
  const fallbackImg = "https://picsum.photos/300/300?random=";

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
            image={fallbackImg + index}
            title={photo.title}
            loading="lazy"
          />
        </Card>
      ))}
    </div>
  );
};

export default PhotoList;
