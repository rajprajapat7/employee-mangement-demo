import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { userTypes, userTypesAdding } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";

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

type Inputs = {
  name: string;
  designation: string;
  employeeType: string;
  belongsTo: string;
  salary: number;
  doj: string;
};

interface EditModelProps {
  user: userTypes;
  onChildEdit: (user: userTypes) => void;
  close: () => void;
  handleDelete: (id: number) => void;
  handleEdit: (data: userTypesAdding) => void;
}
function EditModel({
  close,
  user,
  onChildEdit,
  handleDelete,
  handleEdit,
}: EditModelProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();
  const [selectedType, setSelectedType] = React.useState(user.type);
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    const newData = {
      name: data.name || user.name,
      salary: data.salary || user.salary,
      employeeType: data.employeeType || user.employeeType,
      type: selectedType,
      doj: data.doj || user.doj,
      id: user.id,
      parentId: user.parentId,
    };
    handleEdit(newData);
  };

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
          <Button
            color="error"
            disabled={user.children.length > 0}
            variant="text"
          >
            <DeleteIcon onClick={() => handleDelete(user.id)} />
          </Button>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      color={errors.name ? "error" : "primary"}
                      {...register("name", { required: true })}
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
                      type="number"
                      label="Employee Salary"
                      defaultValue={user.salary}
                      color={errors.salary ? "error" : "primary"}
                      {...register("salary", { required: true })}
                      variant="standard"
                      placeholder="Employee Salary"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="flex gap-6 align-baseline items-center">
                  <TableCell>
                    <FormLabel required id="demo-row-radio-buttons-group-label">
                      Employee Type
                    </FormLabel>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      row
                      required
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      {...register("employeeType")}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <FormControlLabel
                        value="employee"
                        control={
                          <Radio checked={selectedType === "employee"} />
                        }
                        label="Employee"
                      />
                      <FormControlLabel
                        value="manager"
                        control={<Radio checked={selectedType === "manager"} />}
                        label="Manager"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DOJ</TableCell>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      label="Date of Joining"
                      variant="standard"
                      defaultValue={user.doj}
                      type="text"
                      onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.type = "date";
                        e.target.addEventListener(
                          "blur",
                          () => {
                            e.target.type = "text";
                          },
                          { once: true }
                        );
                      }}
                      color={errors.salary ? "error" : "primary"}
                      placeholder="Date of Joining"
                      {...register("doj", { required: true })}
                    />
                  </TableCell>
                </TableRow>
                {user.children.length > 0 ? (
                  <TableRow style={{ maxHeight: "100px" }}>
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
            <Button
              disabled={isSubmitted}
              type="submit"
              variant="contained"
              color="success"
            >
              Update
            </Button>
            <Button variant="outlined" color="info" onClick={close}>
              Close
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModel;
