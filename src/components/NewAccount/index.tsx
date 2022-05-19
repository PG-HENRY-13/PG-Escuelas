import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import validate from "./validate";
import AssignJobs from "../AssignJobs/AssignJobs";
import "../../styles/NewAccount.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function NewAccount(): JSX.Element {
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
    emailAddress: "Ingrese una direccion de correo válida",
    seniorityDate: "Ingrese fecha de escalafón",
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
      error.emailAddress ||
      error.seniorityDate
    )
      setDisabled(true);
    else setDisabled(false);
  }, [error]);

  useEffect(() => {
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
  // new-container
  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center h-100 ">
          <div className="col col-lg-11 mb-4 mb-lg-0 ">
            <div className="card m-3 shadow-lg ">
              <div className="row g-0 ">
                <div
                  className="col-md-4 gradient-custom text-center mb-0 p-4"
                  style={{ backgroundColor: "#728187" }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    size="5x"
                    className="img-fluid my-5"
                  />

                  <div></div>
                </div>
    <div style={{ backgroundColor: "#faf9f9" }} className=" container-md card-body  new-container">
      
      <h4 className="form-label fs-2">Crear Nuevo Usuario</h4>
     
      <hr className="mt-0 mb-4"></hr>
      <form className="row g-3" onSubmit={submit}>
        <div className="form-floating mb-4 col-md-4">
          <input
            className="form-control"
            name="name"
            id="floatingName"
            placeholder="Mario"
            value={data.name}
            onChange={changeHandler}
          ></input>
          <span className="err">{error.name}</span>
          <label>Nombre:</label>
        </div>
        <div className="form-floating mb-4 col-md-4">
          <input
            className="form-control"
            name="lastName"
            id="floatingLastName"
            placeholder="Gonzales"
            value={data.lastName}
            onChange={changeHandler}
          ></input>
          <label>Apellido:</label>
          <span className="err">{error.lastName}</span>
        </div>

        <div className="form-floating mb-4 col-4">
          <input
            className="form-control"
            name="cuil"
            id="floatingCuil"
            placeholder="00000000000"
            value={data.cuil}
            onChange={changeHandler}
          ></input>
          <label>Cuil:</label>
          <span className="err">{error.cuil}</span>
        </div>
        <div className="form-floating mb-4 col-md-6">
          <input
            className="form-control"
            type="password"
            name="password"
            id="floatingPassword"
            placeholder="***"
            value={data.password}
            onChange={changeHandler}
          ></input>
          <label>Contraseña:</label>
          <span className="err">{error.password}</span>
        </div>
        <div className="form-floating mb-4 col-md-6">
          <input
            className="form-control"
            type="password"
            name="password2"
            id="floatingPassword2"
            placeholder="***"
            value={data.password2}
            onChange={changeHandler}
          ></input>
          <label className="text-start">Repita la contraseña:</label>
          <span className="err">{error.password2}</span>
        </div>
        <div className="form-floating mb-4 col-md-4">
          <input
            className="form-control"
            name="address"
            id="floatingAddress"
            placeholder="House address"
            value={data.address}
            onChange={changeHandler}
          ></input>
          <label className="text-start">Direccion:</label>
          <span className="err ">{error.address}</span>
        </div>
        <div className="form-floating mb-3 col-md-5">
          <input
            className="form-control"
            name="phoneNumber"
            id="floatingPhone"
            placeholder="221..."
            value={data.phoneNumber}
            onChange={changeHandler}
          ></input>
          <label className="text-start">Teléfono:</label>
          <span className="err ">{error.phoneNumber}</span>
        </div>
        <div className="form-floating col-md-12">
          <input
            className="form-control"
            name="emailAddress"
            id="floatingEmail"
            placeholder="johnDoe@hotmail.com"
            value={data.emailAddress}
            onChange={changeHandler}
          ></input>
          <label className="text-start">E-mail:</label>
          <span className="err">{error.emailAddress}</span>
        </div>
        <div className="form-floating col-md-5">
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelectGrid"
              aria-label="Floating label select example"
              onChange={selectHandler}
              defaultValue="otro"
              name="gender"
            >
              <option value="otro">Sin especificar</option>
              <option value="fem">Femenino</option>
              <option value="masc">Masculino</option>
            </select>
            <label htmlFor="floatingSelectGrid">Genero:</label>
          </div>
        </div>
        <div className="col-md-5">
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelectGrid2"
              aria-label="Floating label select example"
              onChange={selectHandler}
              defaultValue="empleado"
              name="role"
            >
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="floatingSelectGrid">Perfil:</label>
          </div>
        </div>
        <div className="form-floating mb-3 col-md-5">
          <input
            className="form-control"
            type="date"
            name="seniorityDate"
            value={data.seniorityDate}
            onChange={changeHandler}
          ></input>
          <label>Escalafón:</label>
          <span className="err">{error.seniorityDate}</span>
        </div>
        <div className=" form-floating mb-3 col-md-12">
          <AssignJobs
            name={data.name}
            cuil={data.cuil}
            removableJobs={true}
            setDisabled={setDisabled}
          ></AssignJobs>
        </div>
        <div className="form-button-container">
          <button disabled={disabled} className="btn btn-dark p-3 mt-4 col-md-12" type="submit">
            Crear Usuario
          </button>
        </div>
      </form>
      {/* <Link
        to="/admin/excel/upload"
        className="form-button-container mini-button-container"
      >
        <button className="button minibtn" type="submit">
          Crear Multiples usuarios con Excel
        </button>
      </Link> */}
    </div>
    </div></div>
            </div>
          </div>
        </div>
    
    </section>
  );
}
