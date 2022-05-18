import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Job } from "../../redux/interfaces";
import "../../styles/UserDetails.css";
import Back_Logo from "../../styles/img/Back_Logo.png";

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
    <div className=" container card w-75 mt-3 shadow-lg">
      <div className="card-title text-center">
        <h1>Datos de {userToUpdate.name} {userToUpdate.lastName}</h1>
      </div>
      <div className="card text-center p-4 ">
        <div className="row">
          <div className="col fs-3  text-start">Cuil:</div>
          <div className="col fs-4 text-end">{userToUpdate.cuil}</div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Nombre:</div>
          <div className="col fs-2 text-end">{userToUpdate.name}</div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Apellido:</div>
          <div className="col fs-2 text-end">{userToUpdate.lastName}</div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Escalafón:</div>
          <div className="col fs-2 text-end">
            {userToUpdate.seniorityDate.split("T")[0]}
          </div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Direccion:</div>
          <div className="col fs-2 text-end">{userToUpdate.address}</div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Teléfono:</div>
          <div className="col fs-2 text-end">{userToUpdate.phoneNumber}</div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Email:</div>
          <div className="col fs-2 text-end">{userToUpdate.emailAddress}</div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Genero:</div>
          <div className="col fs-2 text-end">
            {userToUpdate.gender === "masc"
              ? "Masculino"
              : userToUpdate.gender === "fem"
              ? "Femenino"
              : "Sin especificar"}
          </div>
        </div>
        <div className="row">
          <div className="col fs-1  text-start">Rol:</div>
          <div className="col fs-2 text-end">
            {userToUpdate.role === "empleado"
              ? "Empleado"
              : userToUpdate.role === "admin"
              ? "Admin"
              : "Gerente"}
          </div>
        </div>
      </div>
      <div className="row text-center">
        {role === "admin" ? (
          <Link to={"/admin/updateuser/" + cuil}>
            <button className="btn-dark">Editar Usuario</button>
          </Link>
        ) : (
          <Link to={"/user/updateuser/" + cuil}>
            <button className="btn-dark">Editar Usuario</button>
          </Link>
        )}
      </div>
    </div>

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
