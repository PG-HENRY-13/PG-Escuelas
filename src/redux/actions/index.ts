import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import {
  DeleteUsersAction,
  FetchUsersAction,
  User,
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
      if (data.data === "Que hacer si ya existe, findOrcreate en el back") {
        alert("La persona ya se encuentra registrada");
        return;
      } else {
        alert("Usuario añadido correctamente");
        dispatch({ type: ActionTypes.createUser, payload: data.data });
      }
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
