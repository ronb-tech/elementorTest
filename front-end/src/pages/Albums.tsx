import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Album } from "../utils/types";
import { albumServiceLogic } from "../services/index";
import AlbumList from "../components/AlbumList";
import SkeletonCard from "../components/SkeletonCard";
import { AddItems } from "../components/AddItems";
import DeleteDialog from "../components/DialogDelete";

const AlbumsPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const [albumName, setAlbumName] = useState<string>("");

  const navigate = useNavigate();
  let { userId } = useParams<"userId">();
  let userIdNumber = userId ? parseInt(userId, 10) : 0;
  if (isNaN(userIdNumber)) {
    userIdNumber = 0;
  }

  const getAlbums = async (user_id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const albumsData = await albumServiceLogic.getAlbumById(user_id);
      if (getAlbums.length > 0) {
        setAlbums(albumsData);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("failed to get albums");
      setIsLoading(false);
    }
  };

  const onRedirectAlbum = (albumId: number): void => {
    navigate(`/albums/${albumId}/photos`);
  };

  const onAlbumDelete = (albumId: number): void => {
    const albumToDelete = albums.find((album) => album._id === albumId);
    if (albumToDelete) {
      setAlbumName(albumToDelete.title); // Assuming your album object has a 'title' property
      setItemIdToDelete(albumId);
      setDeleteDialogOpen(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (itemIdToDelete !== null) {
      try {
        const isDeleted = await albumServiceLogic.deleteAlbum(itemIdToDelete); // Ensure this method is implemented in your service logic
        if (isDeleted) {
          setAlbums((currentAlbums) =>
            currentAlbums.filter((album) => album._id !== itemIdToDelete)
          );
          handleCloseDeleteDialog();
        }
      } catch (err) {
        console.error("Failed to delete album:", err);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      const user_id = parseInt(userId, 10);
      getAlbums(user_id);
    }
  }, [userId]);

  const onAddAlbum = (): void => {
    navigate("/album/form");
  };
  const onAlbumEdit = (): void => {
    navigate("/album/form");
  };

  if (isLoading) {
    return <SkeletonCard loading={isLoading} numberOfItems={6} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-albums">
      <h1>Albums Page</h1>
      <h3>You have {albums.length} albums</h3>
      <AddItems text="album" addItems={onAddAlbum} />
      {albums.length > 0 ? (
        <>
          <DeleteDialog
            open={deleteDialogOpen}
            itemId={itemIdToDelete}
            itemName={albumName}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
          />
          <AlbumList
            albums={albums}
            onAlbumClick={onRedirectAlbum}
            onDeleteItem={onAlbumDelete}
            onEditItem={onAlbumEdit}
          />
        </>
      ) : (
        <div>not found results</div>
      )}
    </div>
  );
};

export default AlbumsPage;
