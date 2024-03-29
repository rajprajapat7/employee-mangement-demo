import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "react-query";
import { fetchAllEmployees } from "./utils";
import AddEmployeeForm from "./AddEmployeeForm";
import UserProfile from "./UserProfile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function DrawerComponent() {
  const [open, setOpen] = React.useState("");
  const { data = [], refetch } = useQuery("employeeList", fetchAllEmployees, {
    refetchOnWindowFocus: false,
  });

  const ListComponent = ({ data }: any) => {
    const [showChildren, setShowChildren] = React.useState<any>({});

    const toggleChildren = (id: any) => {
      setShowChildren((prevShowChildren: any) => ({
        ...prevShowChildren,
        [id]: !prevShowChildren[id],
      }));
    };

    return (
      <List className="justify-start items-start id--001">
        {data.map((employee: any) => (
          <ListItem className="flex flex-col " key={employee.id} disablePadding>
            {employee.children.length ? (
              <>
                <Button
                  endIcon={
                    <KeyboardArrowDownIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleChildren(employee.id);
                      }}
                    />
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(employee.id);
                  }}
                  variant="text"
                  fullWidth
                >
                  <span className="text-black cursor-pointer  mr-32">
                    {employee.name}
                  </span>
                </Button>
              </>
            ) : (
              <ListItemText
                className=" cursor-pointer"
                onClick={() => setOpen(employee.id)}
                primary={employee.name}
              />
            )}
            {showChildren[employee.id] && (
              <div>
                <ListComponent
                  onClick={() => setOpen(employee.id)}
                  data={employee.children}
                />
              </div>
            )}
          </ListItem>
        ))}
      </List>
    );
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="">
      <List>
        <ListItem disablePadding>
          <div className="ml-3">
            <Button
              className=""
              onClick={() => setOpen("add-new")}
              variant="contained"
            >
              Add Employee
            </Button>
          </div>
        </ListItem>
      </List>
      <ListComponent data={data} />
      <Divider />
    </Box>
  );

  function filterById(data: any, id: string): any | null {
    for (const item of data) {
      if (item.id == id) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const result = filterById(item.children, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  return (
    <div>
      <Drawer variant="permanent" open={true}>
        {DrawerList}
      </Drawer>
      {open === "add-new" ? (
        <AddEmployeeForm refetch={refetch} close={() => setOpen("")} />
      ) : (
        <UserProfile
          refetch={refetch}
          id={open}
          user={filterById(data, open)}
        />
      )}
    </div>
  );
}
