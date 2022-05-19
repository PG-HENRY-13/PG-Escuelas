import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser, userUpdate } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AssignJobs from "../AssignJobs/AssignJobs";
import validate from "../NewAccount/validate";
import "../../styles/UpdateUser.css";
import axios from "axios";
import { URL_API } from "../../env";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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

  const [disabled, setDisabled] = useState(true);
  const [changed, setChanged] = useState(false);

  const data = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  const [error, setError] = React.useState({
    cuil: "",
    name: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
  });

  useEffect(() => {
    if (cuil) {
      dispatch(loadUser(Number(cuil)) as any);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log(error);
    if (
      error.name ||
      error.lastName ||
      error.address ||
      error.phoneNumber ||
      error.emailAddress
    )
      setDisabled(true);
    else if (changed) setDisabled(false);
  }, [error, changed]);

  // useEffect(() => {
  //   setError(validate(data));
  // }, [data]);

  //  useEffect(() => {
  //   setDisabled(false);
  // }, [data]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
    !changed && setChanged(true);
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    !changed && setChanged(true);
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
  };

  const handlerOnClickPwd = (e: React.MouseEvent) => {
    e.preventDefault();
    axios
      .post(`${URL_API}login/forgotpwd`, { cuil: data.cuil })
      .then((response) => {
        toast.success("Correo enviado, revise su casilla");
      })
      .catch((error) => {
        var sp = document.getElementById("otro");
        if (sp) sp.innerHTML = "Ingrese el CUIL correcto";
      });
  };

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(userUpdate(data) as any);
  }

  return (
    <section className="vh-100 mb-4">
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
                </div>

                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                  <div className="card-body p-4">
                    <form className="mt-0 mb-4" onSubmit={submit}>
                      <div className="row">
                        <div className="card-body p-3">
                          <h4>Editar Usuario</h4>
                          <hr className="mt-0 mb-4" />
                          <div className="form-check mb-3">
                            <label className="col-sm-2 control-label">
                              Nombre:
                            </label>
                            <input
                              className="form-control"
                              name="name"
                              value={data.name}
                              onChange={changeHandler}
                            ></input>
                            <span className="err">{error.name}</span>
                          </div>
                          <div className="form-check mb-3">
                            <label className="col-sm-2 control-label">
                              Apellido:
                            </label>
                            <input
                              className="form-control"
                              name="lastName"
                              value={data.lastName}
                              onChange={changeHandler}
                            ></input>
                            <span className="err">{error.lastName}</span>
                          </div>
                          <div className="form-check mb-3">
                            <label>Restear contraseña:</label>
                            <br />

                            <button
                              className="btn btn-dark p-3"
                              // className="form-control"
                              name="password"
                              // value={data.password}
                              onClick={handlerOnClickPwd}
                            >
                              Resetear contraseña
                            </button>

                            {/* <span className="err">{error.password}</span> */}
                          </div>
                          <div className="form-check mb-3">
                            <label className="col-sm-6 control-label">
                              Escalafon:
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="seniorityDate"
                              value={data.seniorityDate.split("T")[0]}
                              onChange={changeHandler}
                            ></input>
                          </div>
                          <div className="form-check mb-3">
                            <label className="col-sm-2 control-label">
                              Direccion:
                            </label>
                            <input
                              className="form-control"
                              name="address"
                              value={data.address}
                              onChange={changeHandler}
                            ></input>
                            <span className="err">{error.address}</span>
                          </div>
                          <div className="form-check mb-3">
                            <label className="col-sm-2 control-label">
                              teléfono:
                            </label>
                            <input
                              className="form-control"
                              name="phoneNumber"
                              value={data.phoneNumber}
                              onChange={changeHandler}
                            ></input>
                            <span className="err">{error.phoneNumber}</span>
                          </div>
                          <div className="form-check mb-3">
                            <label className="col-sm-3 control-label">
                              eMail:
                            </label>
                            <input
                              className="form-control"
                              name="emailAddress"
                              value={data.emailAddress}
                              onChange={changeHandler}
                            ></input>
                            <span className="err">{error.emailAddress}</span>
                          </div>
                          <div className="form-check mb-3">
                            <label className="col-sm-4 control-label">
                              Genero:
                            </label>
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
                          <div className="form-check mb-3">
                            <label className="col-sm-3 control-label">
                              Rol:
                            </label>
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
                        
                        <div className="form-check mb-1">
                          <AssignJobs
                            name={data.name}
                            cuil={cuil ? cuil : data.cuil}
                            removableJobs={false}
                            setDisabled={() => {
                              setChanged(true);
                            }}
                          ></AssignJobs>
                        </div>
                        </div>
                        <div className="form-check mb-3">
                          <button
                            disabled={disabled}
                            className="btn btn-dark p-3 col-md-12"
                            type="submit"
                          >
                            Guardar Cambios
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
