import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface askDeleteModelProps {
  id: number;
  close: () => void;
  handleDelete: (id: number) => void;
}

export default function AskDeleteModel({
  close,
  id,
  handleDelete,
}: askDeleteModelProps) {
  return (
    <div>
      <Modal
        open={true}
        onClose={close}
        disablePortal={false}
        component={"div"}
        aria-labelledby="Ask delete Modal"
        aria-describedby="Ask delete Modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This action can not be undo
          </Typography>
          <Divider />
          <div className="flex gap-3 mt-8">
            <Button
              onClick={() => handleDelete(id)}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
            <Button onClick={close} color="inherit" variant="outlined">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
