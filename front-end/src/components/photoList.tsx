import React from "react";
import { Photo } from "../utils/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { onImgError } from "../utils/helper";

interface PhotoListProps {
  photos: Photo[];
  onImgClick: (index: number) => void;
  className: string;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, onImgClick }) => {
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
