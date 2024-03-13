import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Album } from "../utils/types";
import { albumServiceLogic } from "../services/index";
import SkeletonCard from "../components/SkeletonCard";

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

  useEffect(() => {
    console.log("userId", userIdNumber);
    getAlbums(userIdNumber);
  }, [userId]);

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
      Albums Page, for user {userId}
      {albums.length > 0 ? (
        <div>{JSON.stringify(albums)}</div>
      ) : (
        <div>not found results</div>
      )}
    </div>
  );
};

export default Albums;
