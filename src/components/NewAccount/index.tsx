import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import validate from "./validate";
import AssignJobs from "../AssignJobs/AssignJobs";
import "../../styles/NewAccount.css";
import { Link } from "react-router-dom";

export default function NewAccount(): JSX.Element {
  let today = new Date();
  let date =
    today.getFullYear().toString().padStart(4, "0") +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const data = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  const [error, setError] = React.useState({
    cuil: "Ingrese un Cuil valido",
    name: "Ingrese un nombre",
    lastName: "Ingrese un apellido",
    password: "Al menos 8 caracteres",
    password2: "Las contraseñas deben coincidir",
    address: "Ingrese una direccion",
    phoneNumber: "Ingrese un número valido",
    emailAddress: "Ingrese una direccion de correo valida",
  });

  useEffect(() => {
    if (
      error.cuil ||
      error.name ||
      error.lastName ||
      error.password ||
      error.password2 ||
      error.address ||
      error.phoneNumber ||
      error.emailAddress
    )
      setDisabled(true);
    else setDisabled(false);
  }, [error]);

  useEffect(() => {
    setError({
      cuil: "",
      name: "",
      lastName: "",
      password: "",
      password2: "",
      address: "",
      phoneNumber: "",
      emailAddress: "",
    });
    dispatch(updateFormUser("empty"));
    return () => {};
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
  };

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createUser(data) as any);
    dispatch(updateFormUser("empty"));
  }

  return (
    <div className="usersform-container">
      <div className="na-title">
        <h1>Crear Nuevo Usuario</h1>
      </div>
      <form onSubmit={submit}>
        <div className="form-container">
          <div className="form-group">
            <label className="col-sm-2 control-label">Nombre:</label>
            <input
              className="form-control"
              name="name"
              value={data.name}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.name}</span>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Apellido:</label>
            <input
              className="form-control"
              name="lastName"
              value={data.lastName}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.lastName}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Cuil:</label>
            <input
              className="form-control"
              name="cuil"
              value={data.cuil}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.cuil}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Contraseña:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.password}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
              Repita la contraseña:
            </label>
            <input
              className="form-control"
              type="password"
              name="password2"
              value={data.password2}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.password2}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
              Fecha de Escalafón:
            </label>
            <input
              className="form-control"
              type="date"
              name="seniorityDate"
              value={data.seniorityDate}
              onChange={changeHandler}
            ></input>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Direccion:</label>
            <input
              className="form-control"
              name="address"
              value={data.address}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.address}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Teléfono:</label>
            <input
              className="form-control"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.phoneNumber}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">E-mail:</label>
            <input
              className="form-control"
              name="emailAddress"
              value={data.emailAddress}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.emailAddress}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Género:</label>
            <select
              className="form-select"
              name="gender"
              onChange={selectHandler}
              defaultValue="other"
            >
              <option value="otro">Sin especificar</option>
              <option value="fem">Femenino</option>
              <option value="masc">Masculino</option>
            </select>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Rol:</label>
            <select
              className="form-select"
              name="role"
              onChange={selectHandler}
              defaultValue="employee"
            >
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
              <option value="gerente">Gerente</option>
            </select>
          </div>
        </div>
        <div className="form-button-container">
          <button disabled={disabled} className="button" type="submit">
            Crear Usuario
          </button>
        </div>
      </form>
      <AssignJobs
        name={data.name}
        cuil={data.cuil}
        removableJobs={true}
      ></AssignJobs>
      <Link
        to="/admin/excel/upload"
        className="form-button-container mini-button-container"
      >
        <button className="button minibtn" type="submit">
          Crear Multiples usuarios con Excel
        </button>
      </Link>
    </div>
  );
}
