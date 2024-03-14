import React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

interface AddItemsProps {
  addItems: () => void;
  text?: string;
}

export const AddItems: React.FC<AddItemsProps> = ({ text, addItems }) => {
  return (
    <div className="add-section">
      <p> add more {text}</p>
      <IconButton onClick={addItems}>
        <AddIcon />
      </IconButton>
    </div>
  );
};
