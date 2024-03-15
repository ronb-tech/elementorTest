import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Album } from "../utils/types";
import { albumServiceLogic } from "../services/index";
import useParsedParam from "../utils/useParsedParam";

const AlbumForm: React.FC = () => {
  const navigate = useNavigate();
  const albumId = useParsedParam("albumId");
  const userId = useParsedParam("userId");

  const [album, setAlbum] = useState<Album>({
    _id: albumId || -1, // Assuming -1 indicates a new album
    user_id: userId || 0, // Ensure you're correctly initializing user_id
    title: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    if (albumId > 0) {
      // Assuming valid IDs are positive integers
      albumServiceLogic.getAlbumById(albumId).then(setAlbum);
    }
  }, [albumId, userId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAlbum((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!album.title || !album.thumbnailUrl) {
      alert("Form cannot be submitted with empty fields");
      return;
    }

    try {
      if (album._id > 0) {
        await albumServiceLogic.updateAlbum(album);
        console.log("success, album updated");
      } else {
        await albumServiceLogic.createAlbum({ ...album, user_id: userId });
        console.log("success, album added");
      }
      navigate(`/users/${userId}/albums`);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was a problem with the album submission.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        {albumId > 0 ? "Edit Album" : "Add Album"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="title"
          label="Title"
          value={album.title || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="thumbnailUrl"
          label="Thumbnail Url"
          value={album.thumbnailUrl || ""}
          onChange={handleChange}
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

export default AlbumForm;
