import { useForm, SubmitHandler } from "react-hook-form";

import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchManagersList } from "./utils";
import { userTypesAdding } from "./types";
import SnackbarComponent from "./SnackbarComponent";

type Inputs = {
  name: string;
  designation: string;
  employeeType: string;
  belongsTo: string;
  salary: number;
  doj: string;
};

interface Manager {
  id: number;
  name: string;
}

interface AddEmployeeFormProps {
  refetch: Function;
  close: () => void;
}

export default function AddEmployeeForm({
  refetch,
  close,
}: AddEmployeeFormProps) {
  const employee_URL: string = process.env.REACT_APP_employee_URL!;
  const { data: managerList = [] } = useQuery(
    "manager-list",
    fetchManagersList
  );

  const [managerId, belongsTo] = useState<any>(-1);
 
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [selectedType, setSelectedType] = useState("employee");
  const [showSuccess, setShowSuccess] = useState(false);

  const addManagerMutation = useMutation(
    (data: userTypesAdding) => {
      return fetch(employee_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        belongsTo(-1);
        refetch();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          close();
        }, 5000);
        refetch();
      },
      onError: () => {
        alert("Some Error ");
      },
    }
  );
  

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let id = Date.now();
    let newData;
    if (managerId < 0) {
      newData = {
        id: id,
        type: selectedType,
        parentId: "",
        name: data.name,
        doj: data.doj,
        employeeType: data.employeeType,
        salary: data.salary.toString(),
      };
    } else {
      newData = {
        type: selectedType,
        id: id,
        name: data.name,
        employeeType: data.employeeType,
        salary: data.salary.toString(),
        parentId: managerId,
        doj: data.doj,
      };
    }
    addManagerMutation.mutate(newData);
    reset();
  };

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: Manager | null
  ) => {
    if (value) {
      belongsTo(value.id);
    }
  };

  return (
    <>
      {showSuccess ? (
        <>
          <SnackbarComponent
            color="success"
            close={() => null}
            message="Employee added successful"
          />
        </>
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            Add Employee
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-2 border-black flex flex-col px-96 gap-6 max-md:p-10"
          >
            <TextField
              id="standard-basic"
              label="Employee Name"
              color={errors.name ? "error" : "primary"}
              variant="standard"
              placeholder="Employee Name"
              {...register("name", { required: true })}
            />
            <TextField
              id="standard-basic"
              label="Employee Salary"
              color={errors.salary ? "error" : "primary"}
              variant="standard"
              type="number"
              placeholder="Employee Salary"
              {...register("salary", { required: true })}
            />
            <div className="flex gap-6 align-baseline items-center">
              <FormLabel required id="demo-row-radio-buttons-group-label">
                Employee Type
              </FormLabel>
              <RadioGroup
                row
                required
                aria-labelledby="demo-row-radio-buttons-group-label"
                {...register("employeeType")}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <FormControlLabel
                  value="employee"
                  control={<Radio checked={selectedType === "employee"} />}
                  label="Employee"
                />
                <FormControlLabel
                  value="manager"
                  control={<Radio checked={selectedType === "manager"} />}
                  label="Manager"
                />
              </RadioGroup>
            </div>
            <TextField
              id="standard-basic"
              label="Date of Joining"
              variant="standard"
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

            <Autocomplete
              options={managerList}
              getOptionLabel={(option) => option.name}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField {...params} label="Manager" />
              )}
            />

            <Divider />

            <div className="flex gap-6">
              <Button
                disabled={Object.keys(errors).length > 0}
                type="submit"
                className="p-4"
                variant="outlined"
              >
                Add
              </Button>
              <Button
                className="p-4"
                color="error"
                type="button"
                variant="outlined"
                onClick={() => reset()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
