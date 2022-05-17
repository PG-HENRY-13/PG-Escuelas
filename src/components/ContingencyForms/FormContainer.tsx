import React, { useEffect, useState } from "react";
import "../../styles/FormContainer.css";
import { fetchContingencies, fetchUsers, loadUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Contingency, Job, User } from "../../redux/interfaces";
import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import AbsenceForm from "./AbsenceForm";
import ScheduleForm from "./ScheduleForm";

export default function FormContainer(): JSX.Element {
  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });
  const userData = useSelector((state: any) => {
    return state.usersState.userForm;
  });
  const usersOptions = loadedUsers?.map((user: User): OptionType => {
    return { value: user.cuil, label: user.name + " " + user.lastName };
  });

  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const [type, setType] = useState("ausencia");
  const [cuil, setCuil] = useState("");
  const [jobId, setJobId] = useState("");

  type OptionType = {
    value: string;
    label: string;
  };

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, []);

  useEffect(() => {
    if (cuil) dispatch(loadUser(Number(cuil)) as any);
  }, [cuil]);

  useEffect(() => {
    if (userData.jobs.length) setJobId(userData.jobs[0].id);
    else setJobId("");
  }, [userData]);

  //////////////////////

  const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      width: "300px",
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 10,
    }),
    control: (provided: any) => ({
      ...provided,
      width: "300px",
    }),
  };

  //////////////////////
  return (
    <div className="userlist-filter-container ">
      <div>
        <h4>Seleccionar usuario y cargo:</h4>
        <div className="form-container-select">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={usersOptions}
            isSearchable={true}
            styles={customStyles}
            placeholder="Buscar usuario..."
            noOptionsMessage={() => "Usuario no encontrado"}
            onChange={(e: any) => setCuil(e.value)}
          ></Select>
          <select onChange={(e) => setJobId(e.target.value)}>
            {userData?.jobs.map((job: Job) => {
              return <option value={job.id}>{job.name}</option>;
            })}
          </select>
        </div>
        <h4>Seleccionar tipo:</h4>
        <div className="form-container-select">
          <select
            className="form-select"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="ausencia">Ausencia</option>
            <option value="cambio de horario">Cambio de horario</option>
          </select>
        </div>
      </div>
      {cuil && jobId ? (
        type === "ausencia" ? (
          <AbsenceForm hide={true} cuil={cuil} jobId={jobId}></AbsenceForm>
        ) : (
          <ScheduleForm hide={true} cuil={cuil} jobId={jobId}></ScheduleForm>
        )
      ) : (
        ""
      )}
    </div>
  );
}
