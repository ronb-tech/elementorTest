import React from "react";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { Action } from "@remix-run/router";

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
  const handleActionClick = (
    action: ActionItem,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    action.onClick();
  };

  const stopPropagationForDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="card-actions-items" onClick={stopPropagationForDiv}>
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(itemId)}
        inputProps={{ "aria-label": "select item" }}
      />
      {actions.map((action, index) => (
        <IconButton
          key={index}
          aria-label={action.label}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            handleActionClick(action, event)
          }
        >
          {action.icon}
        </IconButton>
      ))}
    </div>
  );
};

export default ActionItems;
