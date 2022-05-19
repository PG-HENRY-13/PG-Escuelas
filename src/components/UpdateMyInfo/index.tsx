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

export default function UpdateMyInfo(): JSX.Element {
  let { cuil } = useParams();

  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);
  const [changed, setChanged] = useState(false);

  const data = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  const [error, setError] = React.useState({
    cuil: "Ingrese un Cuil valido",
    name: "Ingrese un nombre",
    lastName: "Ingrese un apellido",
    address: "Ingrese una direccion",
    phoneNumber: "Ingrese un número valido",
    emailAddress: "Ingrese una direccion de correo valida",
  });

  useEffect(() => {
    setError({
      cuil: "",
      name: "",
      lastName: "",
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
      error.address ||
      error.phoneNumber ||
      error.emailAddress ||
      !changed
    )
      setDisabled(true);
    else setDisabled(false);
  }, [error, changed]);

  useEffect(() => {
    setError(validate(data));
  }, [data]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
    dispatch(updateFormUser({ ...data, [e.target.name]: e.target.value }));
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChanged(true);
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
                    <form onSubmit={submit}>
                      <div className="row">
                        <div className="card-body p-3">
                          <h1>Editar Usuario</h1>
                          <hr className="mt-0 mb-4" />

                          <div className="form-group">
                            <label className="col-sm-2 control-label">
                              Nombre:
                            </label>
                            <h3>{data.name}</h3>
                            <span className="err">{error.name}</span>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">
                              Apellido:
                            </label>
                            <h3>{data.lastName}</h3>
                            <span className="err">{error.lastName}</span>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label"></label>
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
                          <div className="form-group">
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
                          <div className="form-group">
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
                          <div className="form-group">
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
                          <div className="form-group">
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
                        </div>
                        <div className="form-button-container">
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
