import React from "react";
import { StoreState, User } from "../../redux/interfaces";
import "../../styles/UserList.css";
import {
  calculateAllWages,
  exportGobExcelToCalculator,
  fetchUsers,
} from "../../redux/actions";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { filterRoles, filterJobs, fetchJobs } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Calculator(): JSX.Element {
  const dispatch = useDispatch();

  const [period, setPeriod] = React.useState("202205");

  const users = useSelector((state: any) => {
    const users = state.usersState.users;
    return users;
  });

  var cuils = users.map((user: User) => user.cuil);

  const submit = async () => {
    await dispatch(exportGobExcelToCalculator(period) as any);
    await dispatch(calculateAllWages(cuils) as any);
  };

  return (
    <div>
      <div>
        <button onClick={submit}>Calcular todos los salarios</button>
      </div>
    </div>
  );
}
