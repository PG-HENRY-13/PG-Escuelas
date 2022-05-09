import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser, userUpdate } from "../../redux/actions";
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

  const [disabled, setDisabled] = useState(false);

  const data = useSelector((state: any) => {
    return state.usersState.userForm;
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
      dispatch(loadUser(Number(cuil)) as any);
      setDisabled(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (
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
    setError(validate(data));
  }, [data]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
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
            <label className="col-sm-2 control-label">Restear contraseña:</label>
            <br />
            <input
            type="checkbox"
              // className="form-control"
              name="password"
              // value={data.password}
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(updateFormUser({ ...data, password: '123456' }));
                }
              }}
            ></input>
            {/* <span className="err">{error.password}</span> */}
          </div>
          <div className="form-group">
            <label className="col-sm-6 control-label">Escalafon:</label>
            <input
              className="form-control"
              type="date"
              name="seniorityDate"
              value={data.seniorityDate.split("T")[0]}
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
      <AssignJobs
        name={data.name}
        cuil={cuil ? cuil : data.cuil}
        removableJobs={false}
      ></AssignJobs>
    </div>
  );
}
