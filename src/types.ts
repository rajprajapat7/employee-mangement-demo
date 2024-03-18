export type userTypes =  {
  name: string;
  salary: string;
  employeeType: null | string;
  id: number;
  type: string;
  children: userTypes[];
}


export type userTypesAdding = {
  name: string;
  salary: string;
  employeeType: null | string;
  id: number;
  type: string;
  parentId:string
};
