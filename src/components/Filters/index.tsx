import React from "react";
import { StoreState, User } from "../../redux/interfaces";
import "../../styles/UserInfo.css";
import { fetchUsers } from "../../redux/actions";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { filterRoles } from "../../redux/actions";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FilterUser(): JSX.Element {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role") ?? "";

  const handleFilter = (e: string) => {
    setSearchParams({ role: e });
    dispatch(filterRoles(e) as any);
  };

  return (
    <div>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="">Todos</option>
        <option value="admin">Admin</option>
        <option value="empleado">Empleado</option>
        <option value="gerente">Gerente</option>
      </select>
    </div>
  );
}
