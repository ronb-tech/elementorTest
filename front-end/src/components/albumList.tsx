import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Album } from "../utils/types";

interface AlbumListProps {
  albums: Album[];
  onAlbumClick: (user_id: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onAlbumClick }) => {
  const imgSrc =
    "https://mui.com/static/images/cards/contemplative-reptile.jpg";

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
            image={imgSrc}
            title={album.title}
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
