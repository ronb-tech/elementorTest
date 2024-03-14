import React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

interface AddItemsProps {
  addUsers: () => void;
  text?: string;
}

export const AddItems: React.FC<AddItemsProps> = ({ text, addUsers }) => {
  return (
    <div className="add-section">
      <p> add more {text}</p>
      <IconButton onClick={addUsers}>
        <AddIcon />
      </IconButton>
    </div>
  );
};
