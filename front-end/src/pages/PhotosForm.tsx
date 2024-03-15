import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Photo } from "../utils/types";
import { photoServiceLogic } from "../services/index";

const PhotosForm: React.FC = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<Photo>({
    _id: 0,
    album_id: 0,
    title: "",
    url: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPhoto((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", photo);

    if (photo.title && photo.url && photo.album_id > 0) {
      photoServiceLogic.createPhoto(photo).then((res) => {
        if (res.ok) {
          console.log("success, photo added", res);
          alert("photo added");
        }
      });

      /// add
    } else {
      alert("Form cannot be submitted with empty fields");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        Add Photo
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
          Create
        </Button>
      </form>
    </Container>
  );
};

export default PhotosForm;
