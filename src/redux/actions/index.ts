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
  return async (dispatch: Dispatch) => {
    const response = await axios.put<any>(jobUrl, {
      // CAMBIAR EL ANY!!!!
      data: {
        userCuil: userCuil,
        jobID: jobID,
      },
    });
    dispatch<AssignJobToUserAction>({
      type: ActionTypes.assignJobToUser,
      payload: response.data,
    });
  };
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

/* export const filterUsers = (dispatch: Dispatch) => {
  axios
    .get("http://localhost:3001/api/role?role=admin")
    .then((data) => {
      dispatch<FilterUsersAction>({
        type: ActionTypes.filterUsers,
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
}; */
