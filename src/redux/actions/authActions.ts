import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
// import toast from "react-toastify";
import {
 
} from "../interfaces";
import {url} from "./index";


export const signIn = () => {
    axios
    .post(url)
};