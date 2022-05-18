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
  ExportGobExcelToCalculatorAction,
  CalculateAllWagesAction,
  ContingencyState,
  HandleContingencyAction,
  FetchUserContingenciesAction,
  Paycheck as PaycheckI,
  FetchAllPaychecksAction,
  FetchPaychecksByCuilAction,
} from "../interfaces";

import { URL_API } from "../../env.js";
import { toast } from "react-toastify";
import Paycheck from "../../components/Paycheck";

export const url: string = URL_API;
// export const url = "http://localhost:3001/api/";

export const userUrl = url + "user";
const jobUrl = url + "job";
const filterJobsUrl = url + "filterjobs?JobId=";
const filterRolesUrl = url + "role?role=";
const excelUrl = url + "excel";
const employeesUrl = url + "employees";
const contingenciesUrl = url + "contingencies";
const wageUrl = url + "salary/";

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
    await axios
      .get<User>(userUrl + "/" + cuil)
      .then((response) => {
        dispatch<FetchUserAction>({
          type: ActionTypes.fetchUser,
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.error("Error al intentar cargar los datos del usuario");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
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
    toast.error("Something went wrong. Try again");
    return error;
  }
};

export const createUser = (newUser: User) => (dispatch: Dispatch) => {
  axios
    .post(userUrl, newUser)
    .then((data) => {
      toast.success("Usuario añadido correctamente");
      dispatch<CreateUserAction>({
        type: ActionTypes.createUser,
        payload: data.data,
      });
    })
    .catch((err: any) => {
      toast.error("Error, el usuario ya existe en la db");
      console.log("error: ", err.message);
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
      toast.success("Trabajo asignado correctamente");
    };
  } catch (err) {
    toast.error("Todo lo que podía salir mal lo ha hecho");
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

export const userUpdate = (newUser: UserForm) => (dispatch: Dispatch) => {
  axios
    .put(userUrl, newUser)
    .then((data) => {
      toast.success("Usuario actualizado correctamente");
      dispatch<UpdateUserAction>({
        type: ActionTypes.updateUser,
        payload: data.data,
      });
    })
    .catch((err: any) => {
      toast.error("Error al actualizar usuario");
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
    try {
      const response = await axios.post<any>(excelUrl + "/users");
      response.data.map(async (user: User) => await axios.post(userUrl, user));
      dispatch<SaveUsersFromExcelFileAction>({
        type: ActionTypes.saveUsersFromExcelFile,
        payload: response.data,
      });
      toast.success("Usuarios cargados");
    } catch (err) {
      console.log(err);
    }
  };
};

export const exportGobExcelToCalculator = (period: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<any>(excelUrl + "/gob", {
        period: period,
      });
      dispatch<ExportGobExcelToCalculatorAction>({
        type: ActionTypes.exportGobExcelToCalculator,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const calculateAllWages = (cuils: any) => {
  return async (dispatch: Dispatch) => {
    var response;
    try {
      cuils.map(async (cuil: string) => {
        response = await axios.post<any>(wageUrl + cuil);
      });
    } catch (err) {
      console.log("error, ", err);
    }
    toast.success("Paychecks calculados");
  };
};

export const loadUserSalary = (userCuil: number) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post<any>(wageUrl + "/" + userCuil, {
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

/// PAYCHECK ACTIONS
export const fetchAllPaychecks = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<PaycheckI[]>(wageUrl + "all");
    dispatch<FetchAllPaychecksAction>({
      type: ActionTypes.fetchAllPaychecks,
      payload: response.data,
    });
  };
};

export const fetchPaychecksByCuil = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any[]>(wageUrl + "paychecksByCuil");
    dispatch<FetchPaychecksByCuilAction>({
      type: ActionTypes.fetchPaychecksByCuil,
      payload: response.data,
    });
  };
};

/// CONTINGENCIES ACTIONS

export const sendContingency = (data: Contingency) => {
  axios
    .post(contingenciesUrl, {
      ...data,
    })
    .then(() => toast.success("Enviado"));
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

export const fetchUserContingencies = (cuil: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Contingency[]>(
      contingenciesUrl + "/" + cuil
    );
    dispatch<FetchUserContingenciesAction>({
      type: ActionTypes.fetchUserContingencies,
      payload: response.data,
    });
  };
};

export const deleteContingency = (id: number) => {
  return async (dispatch: Dispatch) => {
    await axios
      .delete(contingenciesUrl, { data: { id } })
      .then(() => {
        toast.success("Contingencia eliminada corretamente");
        dispatch<DeleteContingencyAction>({
          type: ActionTypes.deleteContingency,
          payload: id,
        });
      })
      .catch((err) => {
        toast.error("Error al eliminar la contingencia");
      });
  };
};

export const handleContingency = (id: number, resolve: ContingencyState) => {
  return async (dispatch: Dispatch) => {
    await axios
      .put(contingenciesUrl, {
        id,
        resolve,
      })
      .then(() => {
        toast.success("Contingencia atendida correctamente");
        dispatch<HandleContingencyAction>({
          type: ActionTypes.handleContingency,
          payload: { id, resolve },
        });
      })
      .catch((err) => {
        toast.error("Error al resolver la contingencia");
      });
  };
};
