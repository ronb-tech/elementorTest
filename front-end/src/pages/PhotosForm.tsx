import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Photo } from "../utils/types";
import { photoServiceLogic } from "../services/index";
import useParsedParam from "../utils/useParsedParam";

const PhotosForm: React.FC = () => {
  const navigate = useNavigate();
  const albumId = useParsedParam("albumId");
  const userIdParam = useParsedParam("userId");
  console.log(albumId, userIdParam);

  const [photo, setPhoto] = useState<Photo>({
    _id: 0,
    album_id: 0,
    title: "",
    url: "",
  });

  // useEffect(() => {
  //   const fetchAlbumData = async (id: number) => {
  //     const albumData = await albumServiceLogic.getAlbumByUserId(
  //       userIdParam,
  //       albumId
  //     );
  //     setPhoto(albumData);
  //   };

  //   if (albumId > 0 && userIdParam > 0) {
  //     fetchAlbumData(albumId);
  //   }
  // }, [albumId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPhoto((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", photo);
    if (photo.title && photo.thumbnailUrl && photo.album_id > 0) {
      if (photo._id && photo._id !== -1) {
        // albumServiceLogic.updateAlbum(photo).then((res) => {
        //   console.log("success, photo updated", res);
        //   navigate(`/users/${userIdParam}/albums`);
        // });
      } else {
        // albumServiceLogic.createAlbum(photo).then((res) => {
        //   console.log("success, photo added", res);
        //   navigate(`/users/${userIdParam}/albums/`);
        // });
      }
    } else {
      alert("Form cannot be submitted with empty fields");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        {albumId ? "Edit Photo" : "Add Photo"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="title"
          label="Image Title"
          value={photo.title || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="url"
          label="Image Url"
          value={photo.url || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="album_id"
          label="Album Id"
          type="number"
          value={photo.album_id.toString()}
          onChange={handleChange}
          inputProps={{
            step: "1",
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          {albumId ? "Update" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default PhotosForm;
