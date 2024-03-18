import * as React from "react";
import Box from "@mui/material/Box";
import { Alert, Button, List, ListItem, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { userTypes } from "./types";

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

interface EditModelProps {
  user: userTypes;
  onChildEdit: (user: userTypes) => void;
  close: () => void;
  handleDelete: (id: number) => void;
}
function EditModel({ close, user, onChildEdit, handleDelete }: EditModelProps) {
  return (
    <Modal
      open={true}
      onClose={close}
      aria-labelledby={`Edit Employee:-${user.id}`}
      component={"div"}
      key={user.id}
      aria-describedby={`Edit Employee:des-${user.id}`}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span> Employee:-{user.id}</span>
          <Button color="error" disabled={user.children.length > 0} variant="text">
            <DeleteIcon onClick={() => handleDelete(user.id)} />
          </Button>
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Employee Name
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="standard-basic"
                    label="Employee Name"
                    defaultValue={user.name}
                    variant="standard"
                    placeholder="Employee Name"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Employee Salary
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="standard-basic"
                    label="Employee Salary"
                    defaultValue={user.salary}
                    variant="standard"
                    placeholder="Employee Salary"
                  />
                </TableCell>
              </TableRow>
              {user.children.length > 0 ? (
                <TableRow
                  style={{ maxHeight: "100px" }}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Organization
                  </TableCell>
                  <TableCell style={{ maxHeight: "100px" }} component="td">
                    <List style={{ maxHeight: "100px", overflow: "auto" }}>
                      {user.children.map((child: any) => (
                        <ListItem key={child.id}>
                          {child.name}{" "}
                          <Button variant="text">
                            <EditIcon onClick={() => onChildEdit(child)} />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex gap-10 mt-6 justify-end">
          <Button variant="contained" color="success">
            Update
          </Button>
          <Button variant="outlined" color="info" onClick={close}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditModel;
