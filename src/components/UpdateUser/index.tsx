import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteUsers, fetchUser, userUpdate } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AssignJobs from "../AssignJobs/AssignJobs";
import validate from "../NewAccount/validate";
import "../../styles/UpdateUser.css";

export default function UpdateUser(): JSX.Element {
  let { cuil } = useParams();
  let today = new Date();
  let date =
    today.getFullYear().toString().padStart(4, "0") +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const dispatch = useDispatch();
  const userToUpdate = useSelector((state: any) => {
    return state.usersState.user;
  });

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    cuil: "",
    name: "",
    lastName: "",
    password: "",
    password2: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "otro",
    role: "empleado",
    seniorityDate: date,
  });

  const [error, setError] = React.useState({
    cuil: "Ingrese un Cuil valido",
    name: "Ingrese un nombre",
    lastName: "Ingrese un apellido",
    password: "Al menos 8 caracteres",
    password2: "Al menos 8 caracteres",
    address: "Ingrese una direccion",
    phoneNumber: "Ingrese un número valido",
    emailAddress: "Ingrese una direccion de correo valida",
  });

  useEffect(() => {
    setData({
      cuil: "",
      name: "",
      lastName: "",
      password: "",
      password2: "",
      address: "",
      phoneNumber: "",
      emailAddress: "",
      gender: "otro",
      role: "empleado",
      seniorityDate: date,
    });
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
    if (cuil) {
      dispatch(fetchUser(cuil) as any);
      setDisabled(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (
      error.cuil ||
      error.name ||
      error.lastName ||
      error.password ||
      error.address ||
      error.phoneNumber ||
      error.emailAddress
    )
      setDisabled(true);
    else setDisabled(false);
  }, [error]);

  useEffect(() => {
    if (cuil || data.cuil) setData(userToUpdate);
    setError(validate(data));
  }, [userToUpdate]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(userUpdate(data) as any);
  }

  return (
    <div className="usersform-container">
      <div className="na-title">
        <h1>Editar Usuario</h1>
      </div>
      <form onSubmit={submit}>
        <div className="form-container">
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
            <label className="col-sm-2 control-label">Contraseña:</label>
            <input
              className="form-control"
              name="password"
              value={data.password}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.password}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-6 control-label">
              Escalafon:{data.seniorityDate.split("T")[0]}
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
            <label className="col-sm-2 control-label">teléfono:</label>
            <input
              className="form-control"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.phoneNumber}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">eMail:</label>
            <input
              className="form-control"
              name="emailAddress"
              value={data.emailAddress}
              onChange={changeHandler}
            ></input>
            <span className="err">{error.emailAddress}</span>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Genero:</label>
            <select
              className="form-select"
              name="gender"
              onChange={selectHandler}
              defaultValue={data.gender}
            >
              <option value="otro">Sin especificar</option>
              <option value="fem">Femenino</option>
              <option value="masc">Masculino</option>
            </select>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Rol:</label>
            <select
              className="form-select"
              name="role"
              onChange={selectHandler}
              defaultValue={data.role}
            >
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
              <option value="gerente">Gerente</option>
            </select>
          </div>
        </div>
        <div className="form-button-container">
          <button disabled={disabled} className="button" type="submit">
            Guardar Cambios
          </button>
        </div>
      </form>
      <AssignJobs name={data.name} cuil={cuil ? cuil : data.cuil}></AssignJobs>
    </div>
  );
}
