import React, { useState, useEffect } from "react";
import { User } from "../utils/types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const res = await fetch(`${baseUrl}/users`);
      const data = await res.json();
      return data;
    } catch (err) {}
  };

  useEffect(() => {
    getUsers().then((users) => {
      if (users) {
        setUsers(users);
      }
    });
  }, []);

  return (
    <div className="page-users">
      <h1>Users Page</h1>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
};
export default UsersPage;
