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
              <div className="row g-0 " >
                <div className="col-md-4 gradient-custom text-center mb-0 p-4" style={{backgroundColor:"#728187"}}>
                 
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
                        <h6 className="text-decoration-none">Editar Usuario</h6>
                      </Link>
                    ) : (
                      <Link
                        to={"/user/updateuser/" + cuil}
                        className="d-flex flex-column text-decoration-none "
                      >
                        {iconEdit}
                        <h6 style={{marginTop:15}} className="text-decoration-none link-dark">Editar Usuario</h6>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-md-8" style={{backgroundColor:"#faf9f9"}}>
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

    // <div className=" container card w-75 mt-3 shadow-lg">
    //   <div className="card-title text-center">
    //     <h1>
    //       Datos de {userToUpdate.name} {userToUpdate.lastName}
    //     </h1>
    //   </div>
    //   <div className="card text-center p-4 ">
    //     <div className="row">
    //       <div className="col fs-3  text-start">Cuil:</div>
    //       <div className="col fs-4 text-end">{userToUpdate.cuil}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Nombre:</div>
    //       <div className="col fs-4 text-end">{userToUpdate.name}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Apellido:</div>
    //       <div className="col fs-4 text-end">{userToUpdate.lastName}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Escalafón:</div>
    //       <div className="col fs-4 text-end">
    //         {userToUpdate.seniorityDate.split("T")[0]}
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Direccion:</div>
    //       <div className="col fs-4 text-end">{userToUpdate.address}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Teléfono:</div>
    //       <div className="col fs-4 text-end">{userToUpdate.phoneNumber}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Email:</div>
    //       <div className="col fs-4 text-end">{userToUpdate.emailAddress}</div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Genero:</div>
    //       <div className="col fs-4 text-end">
    //         {userToUpdate.gender === "masc"
    //           ? "Masculino"
    //           : userToUpdate.gender === "fem"
    //           ? "Femenino"
    //           : "Sin especificar"}
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col fs-3  text-start">Rol:</div>
    //       <div className="col fs-4 text-end">
    //         {userToUpdate.role === "empleado"
    //           ? "Empleado"
    //           : userToUpdate.role === "admin"
    //           ? "Admin"
    //           : "Gerente"}
    //       </div>
    //     </div>

    //     <div className="row">
    //       <div className="card w-50 text-center">
    //         <div className="card-body">
    //           <h5 className="">Trabajos:</h5>
    //         </div>
    //         <ul className="list-group list-group-flush">
    //           {userToUpdate.jobs.length ? (
    //             userToUpdate.jobs.map((job: Job) => {
    //               return <li className="list-group-item fs-5">{job.name}</li>;
    //             })
    //           ) : (
    //             <div className="">Sin trabajos asignados</div>
    //           )}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row text-center">
    //     {role === "admin" ? (
    //       <Link to={"/admin/updateuser/" + cuil}>
    //         <button className="btn-dark">Editar Usuario</button>
    //       </Link>
    //     ) : (
    //       <Link to={"/user/updateuser/" + cuil}>
    //         <button className="btn-dark">Editar Usuario</button>
    //       </Link>
    //     )}
    //   </div>
    // </div>

    // <div className="container w-75 ">

    //   <div className="card text-center">
    //     <div className="card-title">
    //       <h1>Datos de {userToUpdate.name}</h1>
    //     </div>
    //     <div className="card-body">
    //         <div className="card-text col-3"><span>Cuil: </span><span>{userToUpdate.cuil}</span></div>

    //         <div className="card-text col-md-12"><span>Nombre: </span><span>{userToUpdate.name}</span></div>

    //         <div className="card-text">
    //           <span>Apellido: </span><span>{userToUpdate.lastName}</span>
    //         </div>
    //         <div className="card-text">
    //           <span>Escalafon:</span><span>{userToUpdate.seniorityDate.split("T")[0]}</span>
    //         </div>

    //         <div className="card-text">
    //           <span>Direccion: </span><span>{userToUpdate.address}</span>
    //         </div>

    //         <div className="card-text">
    //           <span>Número de telefono: </span><span>{userToUpdate.phoneNumber}</span>
    //         </div>

    //         <div className="card-text">
    //           <span>eMail: </span><span>{userToUpdate.emailAddress}</span>
    //         </div>

    //         <div className="card-text">
    //           <span>Genero:{" "}</span>
    //           <span>
    //             {userToUpdate.gender === "masc"
    //               ? "Masculino"
    //               : userToUpdate.gender === "fem"
    //               ? "Femenino"
    //               : "Sin especificar"}
    //           </span>
    //         </div>

    //         <div className="card-text">
    //           <span>Rol:{" "}</span>
    //           <span>
    //             {userToUpdate.role === "empleado"
    //               ? "Empleado"
    //               : userToUpdate.role === "admin"
    //               ? "Admin"
    //               : "Gerente"}
    //           </span>
    //         </div>

    //         <div className="card-text">
    //           <span className="">Trabajos:</span>
    //           <ul className="list-group">
    //           {userToUpdate.jobs.length ? (
    //             userToUpdate.jobs.map((job: Job) => {
    //               return <li className='card-text'>{job.name}</li>;
    //             })
    //           ) : (
    //             <div className="">Sin trabajos asignados</div>
    //           )}
    //           </ul>

    //           <div>
    //             {role === "admin" ? (
    //               <Link to={"/admin/updateuser/" + cuil}>
    //                 <button className="btn-dark">Editar Usuario</button>
    //               </Link>
    //             ) : (
    //               <Link to={"/user/updateuser/" + cuil}>
    //                 <button className="btn-dark">Editar Usuario</button>
    //               </Link>
    //             )}
    //           </div>
    //         </div>

    //     </div>
    //   </div>
    //   <div className="">
    //     <a href="javascript:history.back()">
    //       <img className="back-img" src={Back_Logo}></img>
    //     </a>
    //   </div>
    // </div>
  );
}
