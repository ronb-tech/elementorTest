import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Photo } from "../utils/types";
import { photoServiceLogic } from "../services/index";
import SkeletonCard from "../components/SkeletonCard";
import PhotoList from "../components/PhotoList";
import Carousel from "../components/Carousel";
import "../layout/assets/style/photos.scss";
import { AddItems } from "../components/AddItems";
import DeleteDialog from "../components/DialogDelete";
import useParsedParam from "../utils/useParsedParam";

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const albumId = useParsedParam("albumId");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const photosData = await photoServiceLogic.getPhotosByAlbumId(albumId);
        setPhotos(photosData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to get photos");
      } finally {
        setIsLoading(false);
      }
    };

    if (albumId > 0) fetchPhotos();
  }, [albumId]);

  const onImgCaruselSelected = (imgIndex: number) => {
    setCurrentImageIndex(imgIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAddPhoto = (): void => {};
  const onPhotoDelete = (photoId: number): void => {
    console.log("onPhotoDelete", photoId);
    setDeleteDialogOpen(true);

    // const albumToDelete = albums.find((album) => album._id === albumId);
    // if (albumToDelete) {
    //   setAlbumName(albumToDelete.title);
    //   setItemIdToDelete(albumId);
    // }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {};

  if (isLoading) return <SkeletonCard loading={true} numberOfItems={6} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-photos">
      <div className="page-photos-top">
        <h5>
          {photos.length} Photos in Album number {albumId}
        </h5>
        <span>click on the image to see the carousel</span>
        <AddItems text="Photos" addItems={onAddPhoto} />
      </div>

      {photos.length > 0 ? (
        <>
          <DeleteDialog
            open={deleteDialogOpen}
            itemId={itemIdToDelete}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
          />
          <PhotoList
            className=""
            photos={photos}
            onImgClick={onImgCaruselSelected}
            onDeleteItem={onPhotoDelete}
          />
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div className="modal-carousel">
              <Carousel photos={photos} currentImageIndex={currentImageIndex} />
            </div>
          </Modal>
        </>
      ) : (
        <div>No photos found</div>
      )}
    </div>
  );
};

export default Photos;
