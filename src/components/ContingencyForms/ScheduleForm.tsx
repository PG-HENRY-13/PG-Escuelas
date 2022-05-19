import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUser, sendContingency } from "../../redux/actions";
import { ContingencyType, Job } from "../../redux/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function ScheduleForm(props: any): JSX.Element {
  const dispatch = useDispatch();
  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    let type: any;
    switch (data.implies) {
      case "Horas extra":
        type = ContingencyType.overtime;
        break;
      case "Llegada tarde":
        type = ContingencyType.lateArrival;
        break;
      case "Retiro anticipado":
        type = ContingencyType.earlyWithdrawal;
        break;
      default:
        type = ContingencyType.lateArrival;
        break;
    }
    const toSend = {
      ...data,
      contingencyType: type,
      hasNotice: data.hasNotice === "true" ? true : false,
      cuil: props.hide ? props.cuil : loggedUser.id,
    };
    console.log("ESTO ES TO SEND: ---------", toSend);
    if (toSend.cuil) sendContingency(toSend);
    else toast.error("Problema con el cuil");
    setData({
      ...data,
      hasNotice: "true",
      reason: "",
      date: "",
      hoursNumber: 0,
      implies: "",
    });
  }

  const loggedUser = useSelector((state: any) => {
    return state.authState;
  });

  const loadedUser = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  const [data, setData] = useState({
    hasNotice: "true",
    reason: "",
    date: "",
    hoursNumber: 0,
    implies: "",
    jobId: props.hide ? props.jobId : "",
  });

  useEffect(() => {
    if (loggedUser.id && !props.hide)
      dispatch(loadUser(Number(loggedUser.id)) as any);
  }, []);

  useEffect(() => {
    if (loadedUser.jobs[0]?.id && !props.hide)
      setData({ ...data, jobId: loadedUser.jobs[0].id });
  }, [loadedUser]);

  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (data.date && data.reason && data.implies && data.hoursNumber)
      setDisable(false);
    else setDisable(true);
  }, [data]);

  function changeHandler1(e: any) {
    if (e.target.name === "hoursNumber" && !isNaN(e.target.value))
      setData({ ...data, [e.target.name]: Number(e.target.value) });
    else if (e.target.name === "hoursNumber" && isNaN(e.target.value))
      toast.error("Numeros solamente");
    else setData({ ...data, [e.target.name]: e.target.value });
  }

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
                    icon={faUserClock}
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

                  <div></div>
                </div>
                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                  <div className="card-body p-4">
                    <form className="mt-0 mb-4" id="miForm" onSubmit={submit}>
                      <div className="row">
                        <div className="card-body p-3">
                          <fieldset hidden={props.hide}>
                            <h4>Nivel de previsión de la novedad: *</h4>
                            <hr className="mt-0 mb-4" />
                            <div className="form-check mb-3">
                              <input
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
                              <label>Solicitar permiso</label>
                            </div>

                            <div className="form-check">
                              <input
                                type="radio"
                                name="hasNotice"
                                value={"false"}
                                checked={data.hasNotice === "false"}
                                className="form-check-input"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    hasNotice: e.target.value,
                                  })
                                }
                              ></input>
                              <label>Notificar</label>
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

                        <div className="card-body p-3">
                          <fieldset>
                            <div>
                              <h4>Fecha: *</h4>
                              <hr className="mt-0 mb-4" />
                              <input
                                className="form-control mb-3"
                                type="date"
                                name="date"
                                onChange={changeHandler1}
                                value={data.date}
                              ></input>
                            </div>
                          </fieldset>
                        </div>

                        <div className="card-body p-3">
                          {props.type === "multiple" ? <div></div> : ""}
                          <fieldset>
                            <h4>Esto implica: *</h4>
                            <hr className="mt-0 mb-4" />
                            <div className="form-check mb-3">
                              <input
                                type="radio"
                                onChange={changeHandler1}
                                name="implies"
                                value="Horas extra"
                                className="form-check-input"
                                checked={data.implies === "Horas extra"}
                              ></input>
                              <label className="form-check-label">
                                Hora/s extra/s (en caso de exceder la cantidad
                                de horas de su jornada habitual)
                              </label>
                            </div>
                            <div className="form-check mb-3">
                              <input
                                type="radio"
                                onChange={changeHandler1}
                                name="implies"
                                className="form-check-input"
                                value="Llegada tarde"
                                checked={data.implies === "Llegada tarde"}
                              ></input>
                              <label className="form-check-label">
                                Llegada tarde (en caso de modificar su horario
                                de inicio de jornada manteniendo el de
                                finalización)
                              </label>
                            </div>
                            <div className="form-check mb-3">
                              <input
                                type="radio"
                                className="form-check-input"
                                onChange={changeHandler1}
                                name="implies"
                                value="Retiro anticipado"
                                checked={data.implies === "Retiro anticipado"}
                              ></input>
                              <label className="form-check-label">
                                Retiro Anticipado (en caso de modificar su
                                horario de finalización de jornada manteniendo
                                el de inicio)
                              </label>
                            </div>
                          </fieldset>
                        </div>

                        <div className="card-body p-3 mb-3">
                          <fieldset>
                            <div>
                              <h4>Cantidad de horas extra/perdidas: *</h4>
                              <hr className="mt-0 mb-4" />
                              <input
                                className="form-control"
                                name="hoursNumber"
                                onChange={changeHandler1}
                                value={data.hoursNumber}
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
