import React from "react";
import { loadUser, sendContingency } from "../../redux/actions";
import { useState, useEffect } from "react";
import { ContingencyType, Job } from "../../redux/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Contingency } from "../../redux/interfaces";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLargeSlash} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//hacer interface para las props

export default function AbsenceForm(props: any): JSX.Element {
  const dispatch = useDispatch();
  const role = useSelector((state: any) => state.authState.role);
  function submit(e: React.SyntheticEvent) {
    try {
      e.preventDefault();
      let toSend: any = {
        ...data,
        hasNotice: data.hasNotice === "true" ? true : false,
        cuil: props.hide ? props.cuil : loggedUser.id,
      };
      if (data.date && data.endDate) {
        let day1 = new Date(data.date);
        let day2 = new Date(data.endDate);
        day1.setDate(day1.getDate() + 1);
        day2.setDate(day2.getDate() + 1);
        if (day2.getTime() - day1.getTime() < 0) {
          toast.error("Combinacion de fechas invalida");
          throw new Error("Combinacion de fechas invalida");
        } else if (day1.getMonth() === day2.getMonth()) {
          let difference = day2.getTime() - day1.getTime();
          let days = difference / (1000 * 3600 * 24);
          if (days > 0) toSend.absenceDays = days;
        } else if (day1.getMonth() + 1 === day2.getMonth()) {
          const toSend2: any = {
            ...data,
            hasNotice: data.hasNotice === "true" ? true : false,
            cuil: props.hide ? props.cuil : loggedUser.id,
          };
          let day0string = [
            day2.getFullYear(),
            (day2.getMonth() + 1).toString().padStart(2, "0"),
            "01",
          ].join("-");
          let day0 = new Date(day0string);
          day0.setDate(day0.getDate() + 1);
          let difference2 = day2.getTime() - day0.getTime();
          let days2 = difference2 / (1000 * 3600 * 24);
          toSend2.absenceDays = days2;
          toSend2.date = day0string;
          console.log(toSend2);
          let difference1 = day0.getTime() - day1.getTime();
          let days = difference1 / (1000 * 3600 * 24);
          toSend.absenceDays = days;
          if (toSend.cuil) sendContingency(toSend2);
        } else {
          toast.error(
            "No se puede solicitar faltas que difieran por mas de 1 mes"
          );
          throw new Error(
            "No se puede solicitar faltas que duren mas de 2 meses"
          );
        }
      }
      if (!data.endDate) {
        delete toSend.endDate;
        toSend.absenceDays = 1;
      }
      console.log(toSend);
      if (toSend.cuil) sendContingency(toSend);
      else alert("Problema con el cuil");
      setData({
        ...data,
        hasNotice: "true",
        contingencyType: ContingencyType.Absence,
        reason: "",
        date: "",
        endDate: "",
        substitute: "",
        jobId: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  const loggedUser = useSelector((state: any) => {
    return state.authState;
  });
  const loadedUser = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  const [data, setData] = useState({
    hasNotice: "true",
    contingencyType: ContingencyType.Absence,
    reason: "",
    date: "",
    endDate: "",
    substitute: "",
    jobId: props.hide ? props.jobId : "",
  });

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (loggedUser.id && !props.hide)
      dispatch(loadUser(Number(loggedUser.id)) as any);
  }, []);

  useEffect(() => {
    if (loadedUser.jobs[0]?.id && !props.hide)
      setData({ ...data, jobId: loadedUser.jobs[0].id });
  }, [loadedUser]);

  function changeHandler1(e: any) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (data.date && data.reason) setDisable(false);
    else setDisable(true);
  }, [data]);

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
                    icon={faUserLargeSlash}
                    size="5x"
                    className="img-fluid my-5"
                  />
                  <h5>
                    {loadedUser.name} {loadedUser.lastName}
                  </h5>
                  <p>
                    {" "}
                    {loadedUser.role === "empleado"
                      ? "Empleado"
                      : loadedUser.role === "admin"
                      ? "Admin"
                      : "Gerente"}
                  </p>
                </div>

                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                  <div className="card-body p-4">
                    <form className="mt-0 mb-4" onSubmit={submit}>
                      <div className="row">
                        <div className="card-body p-3">
                          <fieldset hidden={props.hide}>
                            <h4>Nivel de previsión de la novedad: *</h4>
                            <hr className="mt-0 mb-4" />
                            <div className="form-check mb-3">
                              <input
                                id="request"
                                type="radio"
                                name="hasNotice"
                                value={"true"}
                                checked={data.hasNotice === "true"}
                                className="form-check-input"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    hasNotice: e.target.value,
                                  })
                                }
                              ></input>
                              <label
                                htmlFor="request"
                                className="form-check-label"
                              >
                                Solicitar permiso
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                id="notify"
                                type="radio"
                                name="hasNotice"
                                checked={data.hasNotice === "false"}
                                value="false"
                                className="form-check-input"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    hasNotice: e.target.value,
                                  })
                                }
                              ></input>
                              <label
                                htmlFor="notify"
                                className="form-check-label"
                              >
                                Notificar
                              </label>
                            </div>
                          </fieldset>
                        </div>

                        <div className="card-body p-3">
                          <fieldset hidden={props.hide}>
                            <h4>Cargo: *</h4>

                            <hr className="mt-0 mb-4" />
                            <select
                              className="form-select"
                              onChange={changeHandler1}
                              name="jobId"
                              id="job"
                            >
                              {loadedUser.jobs?.map((job: Job) => {
                                return (
                                  <option value={job.id}>{job.name}</option>
                                );
                              })}
                            </select>
                          </fieldset>
                        </div>

                        <div className="card-body p-3">
                          <fieldset>
                            <div>
                              <h4>Motivo: *</h4>
                              <hr className="mt-0 mb-4" />
                              <textarea
                                onChange={changeHandler1}
                                rows={4}
                                cols={60}
                                name="reason"
                                className="form-control p-5"
                                style={{ height: 100 }}
                                value={data.reason}
                              ></textarea>
                            </div>
                          </fieldset>
                        </div>

                        <div className="card-body p-3 mb-4">
                          <fieldset>
                            <div>
                              <h4>Dia/Inicio de ausencia:*</h4>
                              <hr className="mt-0 mb-4" />
                              <input
                                className="form-control"
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={changeHandler1}
                              ></input>
                            </div>
                          </fieldset>
                        </div>

                        <div className="card-body mb-4 p-3">
                          <fieldset>
                            <div>
                              <h4>Reincorporacion:</h4>
                              <hr className="mt-0 mb-4" />
                              <input
                                className="form-control"
                                type="date"
                                value={data.endDate}
                                name="endDate"
                                onChange={changeHandler1}
                              ></input>
                            </div>
                          </fieldset>
                        </div>
                        <div className="card-body mb-4 p-3">
                          <fieldset>
                            <div>
                              <h4>Posible suplente:</h4>
                              <hr className="mt-0 mb-4" />
                              <input
                                className="form-control"
                                name="substitute"
                                value={data.substitute}
                                onChange={changeHandler1}
                              ></input>
                            </div>
                          </fieldset>
                        </div>
                        <button
                          disabled={disable}
                          className="btn btn-dark p-3"
                          type="submit"
                        >
                          Enviar
                        </button>
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
