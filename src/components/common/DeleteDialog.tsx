import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import React from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string[] | string;
  confirmFunc: () => void;
  denyFunc: () => void;
}

const DeleteDialog = ({
  isOpen,
  onClose,
  title,
  text,
  confirmFunc,
  denyFunc,
}: DeleteDialogProps): JSX.Element => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {Array.isArray(text) ? (
          text.map((value, i) => <DialogContentText key={i}>{value}</DialogContentText>)
        ) : (
          <DialogContentText>{text}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={confirmFunc}>
          Yes
        </Button>
        <Button color="secondary" onClick={denyFunc}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
