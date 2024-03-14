import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  itemId: number | null;
  itemName?: string;
  onClose: () => void;
  onConfirm: (itemId: number) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  itemId,
  itemName = "",
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (itemId !== null) {
      onConfirm(itemId);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {itemName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
