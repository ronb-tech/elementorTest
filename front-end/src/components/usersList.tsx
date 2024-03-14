import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { User } from "../utils/types";
import { onImgError } from "../utils/helper";

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
          key={user._id}
          onClick={() => onUserClick(user._id)}
        >
          <CardMedia
            component="img"
            className="card-img-avatar"
            image={user.avatarUrl}
            title={user.username}
            onError={onImgError}
          />
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
            <Typography variant="body2">
              number of Albums: {user?.albumCount}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsersList;
