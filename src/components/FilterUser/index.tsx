import {
  getQueriesForElement,
  queryAllByAltText,
} from "@testing-library/react";
import { send } from "process";
import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Action } from "redux";
import { filterUsers, fetchUsers } from "../../redux/actions";
import { StoreState, User } from "../../redux/interfaces";

export default function FilterUser(): JSX.Element {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  /* useEffect(() => {
    dispatch(filterUsers() as any);
    // eslint-disable-next-line
  }, []); */

  console.log("filter:", filter);

  const handleChange = (e: any) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterUsers() as any);
  };

  return (
    <div>
      {/* <select onChange={(e) => setFilter(e.target.value)}> */}
      <select onChange={handleChange}>
        <option value="">All</option>
        <option value="admin">Admin</option>
        <option value="empleado">Empleado</option>
        <option value="gerente">Gerente</option>
      </select>
    </div>
  );
}
