import React from "react";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

interface ActionItem {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

interface ActionItemsProps {
  itemId: number | string;
  isSelected: boolean;
  onToggleSelect: (itemId: number | string) => void;
  actions: ActionItem[];
}

const ActionItems: React.FC<ActionItemsProps> = ({
  itemId,
  isSelected,
  onToggleSelect,
  actions,
}) => {
  return (
    <>
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(itemId)}
        inputProps={{ "aria-label": "select item" }}
      />
      {actions.map((action, index) => (
        <IconButton
          key={index}
          aria-label={action.label}
          onClick={action.onClick}
        >
          {action.icon}
        </IconButton>
      ))}
    </>
  );
};

export default ActionItems;
