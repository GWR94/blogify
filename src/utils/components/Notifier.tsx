/* eslint-disable react/state-in-constructor */
import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

let openSnackbarFn: { (props: SnackbarInput): void };

interface NotifierState {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

interface SnackbarInput {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

const Notifier = (): JSX.Element => {
  const [state, setState] = useState<NotifierState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = (): void =>
    setState({ ...state, message: "", open: false });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const openSnackbar = ({ message, severity }: SnackbarInput): void => {
    handleSnackbarClose();
    setState({ message, severity, open: true });
  };

  useEffect(() => {
    openSnackbarFn = openSnackbar;
  }, []);

  const { message, severity, open } = state;
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={handleSnackbarClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export function openSnackbar({ message, severity }: SnackbarInput): void {
  openSnackbarFn({ message, severity });
}

export default Notifier;
