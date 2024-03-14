import React from "react";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface ActionItem {
  actionId: string;
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

export const ActionItems: React.FC<ActionItemsProps> = ({
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

const handleActionEvent = (actionId: string, itemId: number): void => {
  console.log("action name", actionId);
  console.log("action item id", actionId);
};

export const getActionsOptions = (id: number) => [
  {
    actionId: "edit",
    icon: <EditIcon />,
    label: "edit",
    onClick: () => handleActionEvent("edit", id),
  },
  {
    actionId: "delete",
    icon: <DeleteIcon />,
    label: "delete",
    onClick: () => handleActionEvent("delete", id),
  },
  {
    actionId: "add",
    icon: <AddIcon />,
    label: "add",
    onClick: () => handleActionEvent("add", id),
  },
];
