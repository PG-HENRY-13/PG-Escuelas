import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import {
  DeleteUsersAction,
  FetchUsersAction,
  User,
  FilterUsersAction,
} from "../interfaces";

const url = "http://localhost:3001/api/user";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User[]>(url);
    dispatch<FetchUsersAction>({
      type: ActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export const deleteUsers = (userID: number) => {
  try {
    return async (dispatch: Dispatch) => {
      const response = await axios.delete<true>(url, {
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
    .post("http://localhost:3001/api/user", newUser)
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

export const filterUsers = (dispatch: Dispatch) => {
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
};
