import React from "react";
import { StoreState, User } from "../../redux/interfaces";
import "../../styles/UserInfo.css";
import { fetchUsers } from "../../redux/actions";
import { connect } from "react-redux";

export default function userFilters() {
  return (
    <div>
      <select>
        <option value="all">Todos</option>
        <option value="admin">Admin</option>
        <option value="employee">Empleado</option>
        <option value="gerent">Gerente</option>
      </select>
    </div>
  );
}
