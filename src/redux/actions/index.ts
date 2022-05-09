import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import {
  DeleteUsersAction,
  FetchUsersAction,
  User,
  Job,
  CreateUserAction,
  AssignJobToUserAction,
  FetchJobsAction,
  LoadUserAction,
  UpdateUserAction,
  FetchUserAction,
  FilterRolesAction,
  UserForm,
  UpdateFormUserAction,
  FilterJobsAction,
  SaveUsersFromExcelFileAction,
  Contingency,
  FetchContingenciesAction,
  DeleteContingencyAction,
  LoadUserSalaryAction,
} from "../interfaces";

export const url = "http://localhost:3001/api/";
const userUrl = url + "user";
const jobUrl = url + "job";
const filterJobsUrl = url + "filterjobs?JobId=";
const filterRolesUrl = url + "role?role=";
const excelUrl = url + "excel";
const employeesUrl = url + "employees";
const contingenciesUrl = url + "contingencies";
const wageUrl = url + "salary";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User[]>(userUrl);
    dispatch<FetchUsersAction>({
      type: ActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export const updateFormUser = (data: UserForm | string) => {
  return <UpdateFormUserAction>{
    type: ActionTypes.updateFormUser,
    payload:
      data === "empty"
        ? {
            cuil: "",
            name: "",
            lastName: "",
            password: "",
            password2: "",
            address: "",
            phoneNumber: "",
            emailAddress: "",
            seniorityDate: "",
            gender: "",
            role: "",
            jobs: [],
          }
        : data,
  };
};

export const fetchUser = (cuil: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User>(userUrl + "/" + cuil);
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: response.data,
    });
  };
};

export const deleteUsers = (userID: number) => {
  try {
    return async (dispatch: Dispatch) => {
      const response = await axios.delete<true>(userUrl, {
        data: {
          userID: userID,
        },
      });
      if (response) {
        dispatch<DeleteUsersAction>({
          type: ActionTypes.deleteUsers,
          payload: userID,
        });
      }
    };
    // eslint-disable-next-line
  } catch (error: any) {
    alert("Something went wrong. Try again");
    return error;
  }
};

export const createUser = (newUser: User) => (dispatch: Dispatch) => {
  axios
    .post(userUrl, newUser)
    .then((data) => {
      alert("Usuario añadido correctamente");
      dispatch<CreateUserAction>({
        type: ActionTypes.createUser,
        payload: data.data,
      });
    })
    .catch((err: any) => {
      alert("Eror, el usuario ya existe en la db");
      console.log("error: ", err);
    });
};

///// JOBS ACTIONS //////

export const assignJobToUser = (userCuil: string, jobID: string) => {
  try {
    console.log("lo que llega al action es user ", userCuil, "job ", jobID);
    return async (dispatch: Dispatch) => {
      const response = await axios.put<any>(jobUrl, {
        // CAMBIAR EL ANY!!!!
        userCuil: userCuil,
        jobID: jobID,
      });
      dispatch<AssignJobToUserAction>({
        type: ActionTypes.assignJobToUser,
        payload: response.data,
      });
      alert("Trabajo asignado correctamente");
    };
  } catch (err) {
    alert("Todo lo que podía salir mal lo ha hecho");
  }
};

export const fetchJobs = () => {
  console.log("fetchjobs");
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(jobUrl); ///CAMBIAR EL ANY
    dispatch<FetchJobsAction>({
      type: ActionTypes.fetchJobs,
      payload: response.data,
    });
  };
};

///////SEGURO DAVID YA LO HIZO PERO ES PA PROBAR

export const loadUser = (userCuil: number) => {
  console.log("llega el load con userCuil ", userCuil);
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(userUrl + "/" + userCuil, {
      data: {
        userCuil: userCuil,
      },
    }); ///CAMBIAR EL ANY
    dispatch<LoadUserAction>({
      type: ActionTypes.loadUser,
      payload: response.data,
    });
  };
};

export const loadUserSalary = (userCuil: number) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(wageUrl + "/" + userCuil, {
      data: {
        userCuil: userCuil,
      },
    }); ///CAMBIAR EL ANY
    dispatch<LoadUserSalaryAction>({
      type: ActionTypes.loadUserSalary,
      payload: response.data,
    });
  };
};

export const userUpdate = (newUser: UserForm) => (dispatch: Dispatch) => {
  axios
    .put(userUrl, newUser)
    .then((data) => {
      alert("Usuario actualizado correctamente");
      dispatch<UpdateUserAction>({
        type: ActionTypes.updateUser,
        payload: data.data,
      });
    })
    .catch((err: any) => {
      alert("Error al actualizar usuario");
      console.log("error: ", err);
    });
};

export const filterRoles = (roles: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(filterRolesUrl + roles, {
      data: {
        role: roles,
      },
    });
    dispatch<FilterRolesAction>({
      type: ActionTypes.filterRoles,
      payload: response.data,
    });
  };
};

export const filterJobs = (JobId: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(filterJobsUrl + JobId, {
      data: {
        JobId: JobId,
      },
    });
    dispatch<FilterJobsAction>({
      type: ActionTypes.filterJobs,
      payload: response.data,
    });
  };
};

///// EXCEL ACTIONS

export const saveUsersFromExcelFile = () => {
  return async (dispatch: Dispatch) => {
    console.log();
    const response = await axios.post<any>(excelUrl + "/users");
    dispatch<SaveUsersFromExcelFileAction>({
      type: ActionTypes.saveUsersFromExcelFile,
      payload: response.data,
    });
  };
};
export const sendContingency = (data: Contingency) => {
  axios
    .post(contingenciesUrl, {
      ...data,
      cuil: "200422352811",
      jobId: "1010",
      fullName: "Armando EsteBanquito",
    })
    .then(() => alert("Enviado"));
};

// export const FetchContingencies = (data: Contingency) => {
//   axios
//     .get(contingenciesUrl)
//     .then((data) => alert("Enviado"));
// };

export const fetchContingencies = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Contingency[]>(contingenciesUrl);
    dispatch<FetchContingenciesAction>({
      type: ActionTypes.fetchContingencies,
      payload: response.data,
    });
  };
};

export const deleteContingency = (id: number) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.delete(contingenciesUrl, { data: { id } });
    dispatch<DeleteContingencyAction>({
      type: ActionTypes.deleteContingency,
      payload: id,
    });
  };
};
