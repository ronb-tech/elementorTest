import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Album } from "../utils/types";
import { albumServiceLogic } from "../services/index";
import SkeletonCard from "../components/SkeletonCard";
import AlbumList from "../components/AlbumList";
import { AddItems } from "../components/AddItems";

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    console.log("onRedirectUser", albumId);
    navigate(`/albums/${albumId}/photos`);
  };

  useEffect(() => {
    console.log("userId", userIdNumber);
    getAlbums(userIdNumber);
  }, [userIdNumber]);

  const onAddAlbum = (): void => {
    navigate(`/albums/albumForm`);
  };

  if (isLoading) {
    return (
      <>
        <SkeletonCard loading={isLoading} numberOfItems={6}></SkeletonCard>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-album">
      <h2>Albums Page, for user {userId}</h2>
      <h3>you have {albums.length} Albums </h3>
      <AddItems text="albums" addItems={onAddAlbum}></AddItems>

      {albums.length > 0 ? (
        <div>
          <AlbumList albums={albums} onAlbumClick={onRedirectAlbum}></AlbumList>
        </div>
      ) : (
        <div>not found results</div>
      )}
    </div>
  );
};

export default Albums;
