import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUserJobs, loadUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Job } from "../../redux/interfaces";
import "../../styles/UserDetails.css";
export default function UserDetails(): JSX.Element {
  let { cuil } = useParams();
  const dispatch = useDispatch();
  const userToUpdate = useSelector((state: any) => {
    return state.usersState.user;
  });

  const jobsToRender = useSelector((state: any) => {
    return state.jobsState.userJobs;
  });

  useEffect(() => {
    if (cuil) dispatch(loadUserJobs(cuil) as any);
    if (cuil) dispatch(loadUser(Number(cuil)) as any);
  }, []);

  return (
    <div className="user-detail-container">
      <div className="na-title">
        <h1>Datos de {userToUpdate.name}</h1>
      </div>
      <div className="user-detail-inside">
        <div className="labels-container">
          <label className="detail-label">Cuil: {userToUpdate.cuil}</label>
          <br></br>
          <label className="detail-label">Nombre: {userToUpdate.name}</label>
          <br></br>
          <label className="detail-label">
            Apellido: {userToUpdate.lastName}
          </label>
          <br></br>
          <label className="detail-label">
            Contraseña: {userToUpdate.password}
          </label>
          <br></br>
          <label className="detail-label">
            Escalafon:{userToUpdate.seniorityDate.split("T")[0]}
          </label>
          <br></br>
          <label className="detail-label">
            Direccion: {userToUpdate.address}
          </label>
          <br></br>
          <label className="detail-label">
            Número de telefono: {userToUpdate.phoneNumber}
          </label>
          <br></br>
          <label className="detail-label">
            eMail: {userToUpdate.emailAddress}
          </label>
          <br></br>
          <label className="detail-label">
            Genero:{" "}
            {userToUpdate.gender === "masc"
              ? "Masculino"
              : userToUpdate.gender === "fem"
              ? "Femenino"
              : "Sin especificar"}
          </label>
          <br></br>
          <label className="col-sm-2 control-label">
            Rol:{" "}
            {userToUpdate.role === "empleado"
              ? "Empleado"
              : userToUpdate.role === "admin"
              ? "Admin"
              : "Gerente"}
          </label>
          <br></br>
          <h5>Trabajos:</h5>
          {jobsToRender.length ? (
            jobsToRender.map((job: Job) => {
              return <h6>- {job.name}</h6>;
            })
          ) : (
            <span>Sin trabajos asignados</span>
          )}
          <br></br>
          <Link to={"/admin/updateuser/" + cuil} className="barBtn">
            Editar Usuario
          </Link>
        </div>
      </div>
    </div>
  );
}
