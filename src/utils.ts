import { userTypes } from "./types";
function getAllManagers(employees: userTypes[]): userTypes[] {
  let managers: userTypes[] = [];
  employees.forEach((employee) => {
    if (employee.type === "manager") {
      managers.push(employee);
    }
    managers = managers.concat(getAllManagers(employee.children));
  });
  return managers;
}
export const fetchManagersList = async () => {
  const employees = await fetchAllEmployees();
  return getAllManagers(employees);
};

export const fetchAllEmployees = async () => {
  const employee_URL: string = process.env.REACT_APP_employee_URL!;

  const response = await fetch(employee_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return convertData(await response.json(), "");
};

function convertData(data: any, parentId: any) {
  return data
    .filter((emp: any) => emp.parentId == parentId)
    .map((emp: any) => ({
      name: emp.name,
      salary: emp.salary,
      employeeType: emp.employeeType,
      id: emp.id,
      type: emp.type,
      children: convertData(data, String(emp.id)),
    }));
}
