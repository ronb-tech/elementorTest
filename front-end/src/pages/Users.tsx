import React, { useState, useEffect } from "react";
import { User } from "../utils/types";
import { userServiceLogic } from "../services/index";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    getAllUsers();
  }, []);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-users">
      <h1>Users Page</h1>
      {users.length > 0 ? (
        <div>
          {users.map((user: User) => (
            <div key={user.id}>
              <span>{user.id}</span>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default UsersPage;
