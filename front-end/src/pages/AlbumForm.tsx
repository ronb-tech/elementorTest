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
    _id: -1,
    user_id: userId || -1,
    title: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    const fetchAlbumData = async (id: number) => {
      const albumData = await albumServiceLogic.getAlbumByUserId(
        userId,
        albumId
      );
      setAlbum(albumData);
    };

    if (albumId) {
      fetchAlbumData(albumId);
    }
  }, [albumId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAlbum((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", album);
    if (album.title) {
      if (album._id && album._id !== -1) {
        albumServiceLogic.updateAlbum(album).then((res) => {
          console.log("success, album updated", res);
          navigate(`/users/${albumId}/albums`);
        });
      } else {
        albumServiceLogic.createAlbum(album).then((res) => {
          console.log("success, album added", res);
          navigate(`/users/${userId}/albums/`);
        });
      }
    } else {
      alert("Form cannot be submitted with empty fields");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        {albumId ? "Edit Album" : "Add Album"}
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
