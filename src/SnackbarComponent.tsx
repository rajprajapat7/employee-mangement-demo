import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
interface SnackbarComponentTypes {
  message: string;
  color: string;
  close: () => void;
}

export default function SnackbarComponent({
  message,
  color,
  close,
}: SnackbarComponentTypes) {
  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={close}
        message={message}
      />
    </div>
  );
}
