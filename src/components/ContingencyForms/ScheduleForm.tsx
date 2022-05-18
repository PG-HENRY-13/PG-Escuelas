import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUser, sendContingency } from "../../redux/actions";
import { ContingencyType, Job } from "../../redux/interfaces";
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
    <div className="usersform-container">
      <form id="miForm" onSubmit={submit}>
        <fieldset hidden={props.hide}>
          <legend>Nivel de previsión de la novedad:*</legend>
          <div>
            <input
              type="radio"
              name="hasNotice"
              value={"true"}
              checked={data.hasNotice === "true"}
              onChange={(e) => setData({ ...data, hasNotice: e.target.value })}
            ></input>
            <label>Solicitar permiso</label>
          </div>
          <div>
            <input
              type="radio"
              name="hasNotice"
              value={"false"}
              checked={data.hasNotice === "false"}
              onChange={(e) => setData({ ...data, hasNotice: e.target.value })}
            ></input>
            <label>Notificar</label>
          </div>
        </fieldset>
        <fieldset hidden={props.hide}>
          <legend>Cargo:*</legend>
          <select
            className="form-select"
            onChange={changeHandler1}
            name="jobId"
            id="job"
          >
            {loadedUser.jobs?.map((job: Job) => {
              return <option value={job.id}>{job.name}</option>;
            })}
          </select>
        </fieldset>
        <fieldset>
          <div>
            <legend>Motivo:*</legend>
            <textarea
              onChange={changeHandler1}
              rows={4}
              cols={60}
              name="reason"
              value={data.reason}
            ></textarea>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend>Fecha:*</legend>
            <input
              className="form-control"
              type="date"
              name="date"
              onChange={changeHandler1}
              value={data.date}
            ></input>
          </div>
        </fieldset>
        {props.type === "multiple" ? <div></div> : ""}
        <fieldset>
          <legend>Esto implica:*</legend>
          <div>
            <input
              type="radio"
              onChange={changeHandler1}
              name="implies"
              value="Horas extra"
              checked={data.implies === "Horas extra"}
            ></input>
            <label>
              Hora/s extra/s (en caso de exceder la cantidad de horas de su
              jornada habitual)
            </label>
          </div>
          <div>
            <input
              type="radio"
              onChange={changeHandler1}
              name="implies"
              value="Llegada tarde"
              checked={data.implies === "Llegada tarde"}
            ></input>
            <label>
              Llegada tarde (en caso de modificar su horario de inicio de
              jornada manteniendo el de finalización)
            </label>
          </div>
          <div>
            <input
              type="radio"
              onChange={changeHandler1}
              name="implies"
              value="Retiro anticipado"
              checked={data.implies === "Retiro anticipado"}
            ></input>
            <label>
              Retiro Anticipado (en caso de modificar su horario de finalización
              de jornada manteniendo el de inicio)
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend>Cantidad de horas extra/perdidas:*</legend>
            <input
              className="form-control"
              name="hoursNumber"
              onChange={changeHandler1}
              value={data.hoursNumber}
            ></input>
          </div>
        </fieldset>
        <br></br>
        <button disabled={disable} className="btn btn-dark" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
