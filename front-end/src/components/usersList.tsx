import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import { User } from "../utils/types";
import { onImgError } from "../utils/helper";
import { ActionItems, getActionsOptions } from "./ActionItems";

interface UsersListProps {
  users: User[];
  onUserClick: (user_id: number) => void;
  onDeleteItem: (user_id: number) => void;
  onEditItem: (user_id: number) => void;
  onAddItem: (user_id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onUserClick,
  onDeleteItem,
  onEditItem,
  onAddItem,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const actionsOptions = (id: number) => getActionsOptions(id, onActionClick);

  const onToggleSelectItem = (item: any) => {
    console.log("onToggleSelectItem", item);
  };

  const onActionClick = (actionId: string, itemId: number) => {
    if (actionId === "delete") {
      onDeleteItem(itemId);
    }
    if (actionId === "edit") {
      onEditItem(itemId);
    }
    if (actionId === "add") {
      onAddItem(itemId);
    }
  };

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
          <CardActions disableSpacing className="card-actions">
            <ActionItems
              itemId={user._id}
              isSelected={selectedUsers.includes(user._id)}
              onToggleSelect={(id) => onToggleSelectItem(id)}
              actions={actionsOptions(user._id)}
            />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default UsersList;
