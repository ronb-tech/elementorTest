import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Album } from "../utils/types";
import { onImgError } from "../utils/helper";
import { ActionItems, getActionsOptions } from "./ActionItems";

interface AlbumListProps {
  albums: Album[];
  onAlbumClick: (albumId: number) => void;
  onDeleteItem: (albumId: number) => void;
  onEditItem: (albumId: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onAlbumClick,
  onDeleteItem,
  onEditItem,
}) => {
  const actionsOptions = (id: number) => getActionsOptions(id, onActionClick);

  const onActionClick = (actionId: string, itemId: number) => {
    if (actionId === "delete") {
      onDeleteItem(itemId);
    }
    if (actionId === "edit") {
      onEditItem(itemId);
    }
  };

  return (
    <div className="card-list">
      {albums.map((album) => (
        <Card
          className="card-item"
          key={album._id}
          onClick={() => onAlbumClick(album._id)}
        >
          <CardMedia
            component="img"
            className="card-img"
            image={album.thumbnailUrl || "placeholder-img-url"}
            title={album.title}
            onError={onImgError}
          />
          <CardContent>
            <Typography variant="body2">
              <b>Album Name: </b>
              {album.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ActionItems
              itemId={album._id}
              actions={actionsOptions(album._id)}
            />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default AlbumList;
