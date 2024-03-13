import React, { useState, useEffect } from "react";
import { User } from "../utils/types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className="page-users">
      <h1>Users Page</h1>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
};
export default UsersPage;
