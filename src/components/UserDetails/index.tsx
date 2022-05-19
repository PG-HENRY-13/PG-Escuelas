import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Job } from "../../redux/interfaces";
// import "../../styles/UserDetails.css";
import Back_Logo from "../../styles/img/Back_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";

const iconEdit = (
  <FontAwesomeIcon icon={faEdit} size="2x" style={{ color: "black" }} />
);

export default function UserDetails(): JSX.Element {
  const role = useSelector((state: any) => state.authState.role);
  let { cuil } = useParams();
  const dispatch = useDispatch();
  const userToUpdate = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  useEffect(() => {
    if (cuil) dispatch(loadUser(Number(cuil)) as any);
  }, []);

  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center h-100 ">
          <div className="col col-lg-9 mb-4 mb-lg-0 ">
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
                  <h5>
                    {userToUpdate.name} {userToUpdate.lastName}
                  </h5>
                  <p>
                    {" "}
                    {userToUpdate.role === "empleado"
                      ? "Empleado"
                      : userToUpdate.role === "admin"
                      ? "Admin"
                      : "Gerente"}
                  </p>
                  {/* <i className="far fa-edit mb-5"></i> */}
                  <div>
                    {role === "admin" ? (
                      <Link
                        to={"/admin/updateuser/" + cuil}
                        className="d-flex flex-column text-decoration-none "
                      >
                        {iconEdit}
                        <h6 className="text-decoration-none link-dark mt-3">Editar Usuario</h6>
                      </Link>
                    ) : (
                      <Link
                        to={"/user/updateuser/" + cuil}
                        className="d-flex flex-column text-decoration-none "
                      >
                        {iconEdit}
                        <h6
                          style={{ marginTop: 15 }}
                          className="text-decoration-none link-dark"
                        >
                          Editar Usuario
                        </h6>
                      </Link>
                    )}
                  </div>
                </div>
                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                  <div className="card-body p-4">
                    <h4>Información </h4>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Nombre</h6>
                        <p className="text-muted">{userToUpdate.name}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Apellido</h6>
                        <p className="text-muted">{userToUpdate.lastName}</p>
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">
                          {userToUpdate.emailAddress}
                        </p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Teléfono</h6>
                        <p className="text-muted">{userToUpdate.phoneNumber}</p>
                      </div>
                    </div>

                    <h6>Datos Laborales</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>CUIL</h6>
                        <p className="text-muted">{userToUpdate.cuil}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Escalafón</h6>
                        <p className="text-muted">
                          {userToUpdate.seniorityDate.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Rol</h6>
                        <p className="text-muted">
                          {" "}
                          {userToUpdate.role === "empleado"
                            ? "Empleado"
                            : userToUpdate.role === "admin"
                            ? "Admin"
                            : "Gerente"}
                        </p>
                      </div>
                    </div>
                    <h6>Trabajos</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      {userToUpdate.jobs.length ? (
                        userToUpdate.jobs.map((job: Job) => {
                          return (
                            <p className="text-muted text-capitalize">
                              {job.name}
                            </p>
                          );
                        })
                      ) : (
                        <p className="text-muted">Sin trabajos asignados</p>
                      )}
                    </div>
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
