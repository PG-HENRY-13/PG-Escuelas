import React from "react";
import { loadUser, sendContingency } from "../../redux/actions";
import { useState, useEffect } from "react";
import { ContingencyType, Job } from "../../redux/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Contingency } from "../../redux/interfaces";
import { toast } from "react-toastify";

export default function AbsenceForm(): JSX.Element {
  const dispatch = useDispatch();
  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    let toSend: any = {
      ...data,
      hasNotice: data.hasNotice === "true" ? true : false,
      cuil: loggedUser.id,
    };
    if (data.date && data.endDate) {
      let day1 = new Date(data.date);
      let day2 = new Date(data.endDate);
      let difference = day2.getTime() - day1.getTime();
      let days = difference / (1000 * 3600 * 24);
      if (days > 0) toSend.absenceDays = days;
    }
    if (!data.endDate) {
      delete toSend.endDate;
      toSend.absenceDays = 1;
    }
    console.log(toSend);
    if (toSend.cuil) sendContingency(toSend);
    else toast.error("Problema con el cuil");
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
    jobId: "",
  });

  useEffect(() => {
    if (loggedUser.id) dispatch(loadUser(Number(loggedUser.id)) as any);
  }, []);

  useEffect(() => {
    if (loadedUser.jobs[0]?.id)
      setData({ ...data, jobId: loadedUser.jobs[0].id });
  }, [loadedUser]);

  function changeHandler1(e: any) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  return (
    <div className="usersform-container">
      <form id="miForm" onSubmit={submit}>
        <fieldset>
          <legend>Nivel de previsión de la novedad:*</legend>
          <div>
            <input
              id="request"
              type="radio"
              name="hasNotice"
              value={"true"}
              checked={data.hasNotice === "true"}
              onChange={(e) => setData({ ...data, hasNotice: e.target.value })}
            ></input>
            <label htmlFor="request">Solicitar permiso</label>
          </div>
          <div>
            <input
              id="notify"
              type="radio"
              name="hasNotice"
              checked={data.hasNotice === "false"}
              value="false"
              onChange={(e) => setData({ ...data, hasNotice: e.target.value })}
            ></input>
            <label htmlFor="notify">Notificar</label>
          </div>
        </fieldset>
        <fieldset>
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
            <legend>Motivo:</legend>
            <textarea
              onChange={changeHandler1}
              rows={4}
              cols={60}
              value={data.reason}
              name="reason"
            ></textarea>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend>Dia/Inicio de ausencia:*</legend>
            <input
              className="form-control"
              type="date"
              name="date"
              value={data.date}
              onChange={changeHandler1}
            ></input>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend>Reincorporacion:</legend>
            <input
              className="form-control"
              type="date"
              value={data.endDate}
              name="endDate"
              onChange={changeHandler1}
            ></input>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend>Posible suplente:</legend>
            <input
              className="form-control"
              name="substitute"
              value={data.substitute}
              onChange={changeHandler1}
            ></input>
          </div>
        </fieldset>
        <br></br>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
