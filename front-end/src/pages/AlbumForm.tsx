import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Album } from "../utils/types";
import { albumServiceLogic } from "../services/index";

const AlbumForm: React.FC = () => {
  const [album, setAlbum] = useState<Album>({
    _id: -1,
    user_id: -1,
    title: "",
    thumbnailUrl: "",
  });

  const navigate = useNavigate();
  let { albumId } = useParams<"albumId">();
  let { userId } = useParams<"userId">();

  let albumIdNumber = albumId ? parseInt(albumId, 10) : 0;
  if (isNaN(albumIdNumber)) {
    albumIdNumber = 0;
  }

  useEffect(() => {
    const fetchAlbumData = async (id: number) => {
      const albumData = await albumServiceLogic.getAlbumById(id);
      setAlbum(albumData);
    };

    if (albumIdNumber) {
      fetchAlbumData(albumIdNumber);
    }
  }, [albumIdNumber]);

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
          navigate(`/users/${albumIdNumber}/albums`);
        });
      } else {
        albumServiceLogic.createAlbum(album).then((res) => {
          console.log("success, album added", res);
          navigate(`/users/${album.user_id}/albums`);
        });
      }
    } else {
      alert("Form cannot be submitted with empty fields");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        {albumIdNumber ? "Edit Album" : "Add Album"}
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
          {albumIdNumber ? "Update" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default AlbumForm;
