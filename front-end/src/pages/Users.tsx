import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/types";
import { userServiceLogic } from "../services/index";
import UsersList from "../components/usersList";
import SkeletonCard from "../components/SkeletonCard";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getAllUsers = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const allUsers = await userServiceLogic.getAllUsers();
      if (allUsers.length > 0) {
        setUsers(allUsers);
      }
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      setIsLoading(false);
    }
  };

  const onRedirectUser = (userId: number): void => {
    console.log("onRedirectUser", userId);
    navigate(`/users/${userId}/albums`);
  };

  const onUserDelete = (userId: number): void => {
    console.log("onUserDelete", userId);
  };

  const onUserEdit = (userId: number): void => {
    console.log("onUserEdit", userId);
  };

  const onUserAdd = (userId: number): void => {
    console.log("onUserAdd");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
    <div className="page-users">
      <h1>Users Page</h1>
      {users.length > 0 ? (
        <UsersList
          users={users}
          onUserClick={onRedirectUser}
          onDeleteItem={onUserDelete}
          onEditItem={onUserEdit}
          onAddItem={onUserAdd}
        ></UsersList>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default UsersPage;
