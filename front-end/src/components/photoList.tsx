import React from "react";
import { Photo } from "../utils/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { onImgError } from "../utils/helper";
import { ActionItems, getActionsOptions } from "./ActionItems";

interface PhotoListProps {
  photos: Photo[];
  onImgClick: (index: number) => void;
  className: string;
  onDeleteItem: (albumId: number) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  onImgClick,
  onDeleteItem,
}) => {
  const actionsOptions = (id: number) => getActionsOptions(id, onActionClick);
  const onActionClick = (actionId: string, itemId: number) => {
    if (actionId === "delete") {
      onDeleteItem(itemId);
    }
  };
  return (
    <div className="card-list">
      {photos.map((photo, index) => (
        <div key={photo._id}>
          <ActionItems itemId={photo._id} actions={actionsOptions(photo._id)} />
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
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
