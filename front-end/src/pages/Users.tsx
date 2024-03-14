import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/types";
import { userServiceLogic } from "../services/index";
import UsersList from "../components/usersList";
import SkeletonCard from "../components/SkeletonCard";
import { AddItems } from "../components/AddItems";
import DeleteDialog from "../components/DialogDelete";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const [itemName, setItemName] = useState<string>("");

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
    const itemName = users?.find((usr) => usr._id == userId)?.name || "";
    handleRequestDelete(userId, itemName);
  };

  const onUserEdit = (userId: number): void => {
    navigate(`/user/form/${userId}`);
  };

  const onAddUsers = (): void => {
    navigate(`/user/form`);
  };

  const handleRequestDelete = (itemId: number, itemName: string) => {
    setItemIdToDelete(itemId);
    setItemName(itemName);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async (itemId: number) => {
    try {
      const isRemoved = await userServiceLogic.deleteUser(itemId);
      console.log(`Deleted ${itemName}`, isRemoved);
      if (isRemoved) {
        setTimeout(() => {
          handleCloseDeleteDialog();
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }

    handleCloseDeleteDialog();
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
      <h3>you have {users.length} users </h3>
      <AddItems text="users" addUsers={onAddUsers}></AddItems>

      {users.length > 0 ? (
        <>
          <DeleteDialog
            open={deleteDialogOpen}
            itemId={itemIdToDelete}
            itemName={itemName}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
          />
          <UsersList
            users={users}
            onUserClick={onRedirectUser}
            onDeleteItem={onUserDelete}
            onEditItem={onUserEdit}
          ></UsersList>
        </>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default UsersPage;
