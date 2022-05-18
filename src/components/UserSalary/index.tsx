import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUserSalary, loadUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Job } from "../../redux/interfaces";
import "../../styles/UserDetails.css";
import Back_Logo from "../../styles/img/Back_Logo.png";

export default function UserDetails(): JSX.Element {
  let { cuil } = useParams();
  const dispatch = useDispatch();
  const userToUpdate = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  const userConcepts = useSelector((state: any) => {
    console.log(state.salaryState.userFormSalary, "2222");
    return state.salaryState.userFormSalary;
  });

  useEffect(() => {
    if (cuil) dispatch(loadUser(Number(cuil)) as any);
  }, []);

  useEffect(() => {
    if (cuil) dispatch(loadUserSalary(Number(cuil)) as any);
  }, []);

  return (
    <div>
      <div className="user-detail-container">
        <div className="back-img-container">
          <Link to="/admin/userlist">
            <img className="back-img" src={Back_Logo}></img>
          </Link>
        </div>
        <div className="na-title">
          <h1>Salario de {userToUpdate.name}</h1>
        </div>
        {console.log(userConcepts)}
        <div className="user-detail-inside">
          <div className="labels-container">
            <label className="detail-label">
              Basico: {userConcepts.basic_salary}
            </label>
            <label className="detail-label">
              Antiguedad: {userConcepts.antiquity}
            </label>
            <label className="detail-label">
              Remunerativo: {userConcepts.remunerative}
            </label>
            <label className="detail-label">
              No Remunerativo: {userConcepts.no_remunerative}
            </label>
            <label className="detail-label">
              Deducciones: {userConcepts.deductions}
            </label>
            <label className="detail-label">
              Salario Total: {userConcepts.totalSalary}
            </label>
          </div>
        </div>
      </div>
      <Link to="/admin/paycheck">
        <button className="btn-paycheck">Ver recibo</button>
      </Link>
    </div>
  );
}
