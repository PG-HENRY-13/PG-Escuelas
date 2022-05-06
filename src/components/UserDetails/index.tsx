import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  deleteUsers,
  fetchUser,
  userUpdate,
  loadUserJobs,
  loadUser,
} from "../../redux/actions";
import { useState, useEffect } from "react";
import validate from "../NewAccount/validate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Job } from "../../redux/interfaces";
import "../../styles/UserDetails.css";
export default function UserDetails(): JSX.Element {
  const navigate = useNavigate();
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

  const jobsToRender = useSelector((state: any) => {
    return state.jobsState.userJobs;
  });

  const [data, setData] = useState({
    cuil: "",
    name: "",
    lastName: "",
    password: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "otro",
    role: "empleado",
    seniorityDate: date,
  });

  useEffect(() => {
    setData(userToUpdate);
  }, [userToUpdate]);

  useEffect(() => {
    if (cuil) dispatch(loadUserJobs(cuil) as any);
    if (cuil) dispatch(loadUser(Number(cuil)) as any);
  }, []);

  return (
    <div className="user-detail-container">
      <div className="back-img-container">
        <Link to="/admin/userlist">
          <img
            className="back-img"
            src="http://cdn.onlinewebfonts.com/svg/img_490217.png"
          ></img>
        </Link>
      </div>
      <div className="na-title">
        <h1>Datos de {data.name}</h1>
      </div>
      <div className="user-detail-inside">
        <div className="labels-container">
          <label className="detail-label">Cuil: {data.cuil}</label>
          <br></br>
          <label className="detail-label">Nombre: {data.name}</label>
          <br></br>
          <label className="detail-label">Apellido: {data.lastName}</label>
          <br></br>
          <label className="detail-label">Contraseña: {data.password}</label>
          <br></br>
          <label className="detail-label">
            Escalafon: {data.seniorityDate.split("T")[0]}
          </label>
          <br></br>
          <label className="detail-label">Direccion: {data.address}</label>
          <br></br>
          <label className="detail-label">
            Número de telefono: {data.phoneNumber}
          </label>
          <br></br>
          <label className="detail-label">eMail: {data.emailAddress}</label>
          <br></br>
          <label className="detail-label">
            Genero:{" "}
            {data.gender === "masc"
              ? "Masculino"
              : data.gender === "fem"
              ? "Femenino"
              : "Sin especificar"}
          </label>
          <br></br>
          <label className="detail-label">
            Rol:{" "}
            {data.role === "empleado"
              ? "Empleado"
              : data.role === "admin"
              ? "Admin"
              : "Gerente"}
          </label>
          <br></br>
          <div className="detail-jobs-container">
            <label className="detail-label">Trabajos:</label>
            {jobsToRender.length ? (
              jobsToRender.map((job: Job) => {
                return <span className="detail-label">- {job.name}</span>;
              })
            ) : (
              <span className="detail-label">Sin trabajos asignados</span>
            )}
            <br></br>
          </div>
          <div className="edit-user-link">
            <Link to={"/admin/updateuser/" + cuil}>
              <button className="button">Editar Usuario</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
