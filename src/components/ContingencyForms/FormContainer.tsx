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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

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
                    icon={faBriefcase}
                    size="5x"
                    className="img-fluid my-5"
                  />
                </div>

                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                  <div className="card-body p-4">
                  
                  <div className="card-body p-3">
                    <h4>Seleccionar usuario y cargo:</h4>
                    <hr className="mt-0 mb-4" />
                    <div className="form-check mb-3">
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
                      </div>
                      {userData?.jobs.length && cuil ? (
                        <select onChange={(e) => setJobId(e.target.value)}>
                          {userData?.jobs.map((job: Job) => {
                            return <option value={job.id}>{job.name}</option>;
                          })}
                        </select>
                      ) : (
                        <label className="p-4"> No se registran cargos del usuario</label>
                      )}
                    </div>
                    <div className="card-body p-3">
                    <h4>Seleccionar tipo:</h4>
                    <hr className="mt-0 mb-4" />
                    <div className="form-container-select">
                      <select
                        className="form-select"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="ausencia">Ausencia</option>
                        <option value="cambio de horario">
                          Cambio de horario
                        </option>
                      </select>
                      </div>
                    </div>
                  </div>
                  {cuil && jobId ? (
                    type === "ausencia" ? (
                      <AbsenceForm
                        hide={true}
                        cuil={cuil}
                        jobId={jobId}
                      ></AbsenceForm>
                    ) : (
                      <ScheduleForm
                        hide={true}
                        cuil={cuil}
                        jobId={jobId}
                      ></ScheduleForm>
                    )
                  ) : (
                    ""
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
