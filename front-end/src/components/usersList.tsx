import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { User } from "../utils/types";

interface UsersListProps {
  users: User[];
  onUserClick: (user_id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onUserClick }) => {
  return (
    <div className="card-list">
      {users.map((user, index) => (
        <Card
          className="card-item"
          key={user.id}
          onClick={() => onUserClick(user.id)}
        >
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
            <Typography variant="body2">
              number of Albums: {index * 2}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsersList;
