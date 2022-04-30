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
} from "../interfaces";

const url = "http://localhost:3001/api/";
const userUrl = url + "user";
const jobUrl = url + "job";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User[]>(userUrl);
    dispatch<FetchUsersAction>({
      type: ActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export const fetchUser = (cuil: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<User>(userUrl + '/' + cuil);
      dispatch<FetchUserAction>({
        type: ActionTypes.fetchUser,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
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

export const assignJobToUser = (userCuil: number, jobID: number) => {
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
    const response = await axios.get<any>(userUrl); ///CAMBIAR EL ANY
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
} 

export const userUpdate = (newUser: User) => (dispatch: Dispatch) => {
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
