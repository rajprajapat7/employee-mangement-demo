import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Button, List, ListItem } from "@mui/material";
import { useMutation } from "react-query";
import { CheckCircleOutline } from "@mui/icons-material";
import EditModel from "./EditModal";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { userTypes } from "./types";
import AskDeleteModel from "./AskDeleteModel";
import SnackbarComponent from "./SnackbarComponent";

interface UserProfileTypes {
  id: string;
  user: userTypes;
  refetch: Function;
}

function UserProfile({ id, user, refetch }: UserProfileTypes) {
  const employee_URL = process.env.REACT_APP_employee_URL!;
  const [isDeleted, setDeleted] = React.useState(false);
  const [askDelete, setAskDelete] = React.useState<null | number>(null);
  const [showEditPopUp, setShowEditPopUp] = React.useState<userTypes[]>([]);

  const deleteEmployeeMutation = useMutation(
    (idToBeDeleted: number) => {
      return fetch(`${employee_URL}/${idToBeDeleted}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        setDeleted(true);
        if (
          showEditPopUp &&
          showEditPopUp.length &&
          askDelete === showEditPopUp[showEditPopUp.length - 1].id
        ) {
          const newData = [...showEditPopUp];
          newData.pop();
          setShowEditPopUp(newData);
        }
        refetch();
        setTimeout(() => setDeleted(false), 5000);
      },
    }
  );

  const handleDelete = (id: number) => {
    deleteEmployeeMutation.mutate(id);
    setAskDelete(null);
  };

  if (!user) {
    return <></>;
  }

  return (
    <div className="px-96 ">
      {isDeleted ? (
        <SnackbarComponent
          color="success"
          close={() => null}
          message="Employee Deleted SuccessFully"
        />
      ) : null}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="td" scope="row">
                Employee id
              </TableCell>
              <TableCell component="td" scope="row">
                {user.id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="td" scope="row">
                Employee Name
              </TableCell>
              <TableCell component="td" scope="row">
                {user.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="td" scope="row">
                Employee Salary
              </TableCell>
              <TableCell component="td" scope="row">
                ₹ &nbsp;{user.salary}
              </TableCell>
            </TableRow>
            {user.children.length > 0 ? (
              <TableRow
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  Organization
                </TableCell>
                <TableCell component="td" scope="row">
                  {user.children.length > 0 ? (
                    <List
                      key={user.id}
                      style={{ maxHeight: "100px", overflow: "auto" }}
                    >
                      {user.children.map((child: any) => (
                        <ListItem key={child.id}>
                          {child.name}
                          <Button
                            onClick={() =>
                              setShowEditPopUp([...showEditPopUp, child])
                            }
                            variant="text"
                          >
                            <EditIcon />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  ) : null}
                </TableCell>
              </TableRow>
            ) : null}
            <TableRow
            // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="td" scope="row">
                Action
              </TableCell>
              <TableCell component="td" scope="row">
                <Button
                  onClick={() => setShowEditPopUp([...showEditPopUp, user])}
                >
                  {" "}
                  <EditIcon /> Edit
                </Button>
                <Button
                  color="error"
                  disabled={user.children.length > 0}
                  onClick={() => setAskDelete(user.id)}
                >
                  <DeleteIcon /> Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {showEditPopUp && showEditPopUp.length ? (
        <EditModel
          onChildEdit={(user: userTypes) =>
            setShowEditPopUp([...showEditPopUp, user])
          }
          close={() => {
            const newData = [...showEditPopUp];
            newData.pop();
            setShowEditPopUp(newData);
          }}
          user={showEditPopUp[showEditPopUp.length - 1]}
          handleDelete={setAskDelete}
        />
      ) : null}
      {askDelete ? (
        <AskDeleteModel
          handleDelete={handleDelete}
          close={() => setAskDelete(null)}
          id={askDelete}
        />
      ) : null}
    </div>
  );
}

export default UserProfile;
