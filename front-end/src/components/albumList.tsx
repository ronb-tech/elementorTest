import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Album } from "../utils/types";
import { onImgError } from "../utils/helper";

interface AlbumListProps {
  albums: Album[];
  onAlbumClick: (user_id: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onAlbumClick }) => {
  return (
    <div className="card-list">
      {albums.map((album, index) => (
        <Card
          className="card-item"
          key={album._id}
          onClick={() => onAlbumClick(album._id)}
        >
          <CardMedia
            component="img"
            className="card-img"
            image={album.thumbnailUrl}
            title={album.title}
            onError={onImgError}
          />
          <CardContent>
            <Typography variant="body2">
              <b>Album Name: </b>
              {album.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AlbumList;
