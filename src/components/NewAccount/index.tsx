import React from "react";
import { connect, useDispatch } from "react-redux";
import { deleteUsers, fetchUsers, createUser } from "../../redux/actions";
import { StoreState, User } from "../../redux/interfaces";
import { useState } from "react";

export default function NewAccount(): JSX.Element {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    cuil: "",
    name: "",
    lastName: "",
    password: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "other",
    role: "employee",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createUser(data) as any);
  }

  return (
    <div>
      <h1>Create New User</h1>
      <form onSubmit={submit}>
        <div>
          <label>Cuil:</label>
          <input name="cuil" value={data.cuil} onChange={changeHandler}></input>
          <br></br>
          <label>Nombre:</label>
          <input name="name" value={data.name} onChange={changeHandler}></input>
          <br></br>
          <label>Apellido:</label>
          <input
            name="lastName"
            value={data.lastName}
            onChange={changeHandler}
          ></input>
          <br></br>
          <label>Contraseña:</label>
          <input
            name="password"
            value={data.password}
            onChange={changeHandler}
          ></input>
          <br></br>
          <label>Direccion:</label>
          <input
            name="address"
            value={data.address}
            onChange={changeHandler}
          ></input>
          <br></br>
          <label>Numero de telefono:</label>
          <input
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={changeHandler}
          ></input>
          <br></br>
          <label>eMail:</label>
          <input
            name="emailAddress"
            value={data.emailAddress}
            onChange={changeHandler}
          ></input>
          <br></br>
          <label>Genero:</label>
          <select name="gender" onChange={selectHandler} defaultValue="other">
            <option value="other">Sin especificar</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
          </select>
          <br></br>
          <label>Rol:</label>
          <select name="role" onChange={selectHandler} defaultValue="employee">
            <option value="employee">Empleado</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
          <br></br>
          <button className="barBtn" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
