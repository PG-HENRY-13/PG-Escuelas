import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from "./index";
import { SignInAction, SignOutAction } from "../interfaces";

export const signIn = (data: any) => {
  return async (dispatch: Dispatch) => {
    axios
      .post(url + "login", data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch<SignInAction>({
          type: ActionTypes.signIn,
          payload: token.data,
        });
      })
      .catch((error) => {
        // toast.error('error.response.data')
        alert('Error de cuil o contraseña');
      });
  };
};

export const loadUserAuth = () => {
  return (dispatch: Dispatch, getState: any) => {
    const token = getState().authState.token;
    console.log(token);
    if (token) {
      dispatch({
        type: ActionTypes.loadUserAuth,
        payload: token,
      });
    } else return null;
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.signOut,
      
    })
  };
};