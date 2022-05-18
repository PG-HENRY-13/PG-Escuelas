import React from "react";
import { loadUser, sendContingency } from "../../redux/actions";
import { useState, useEffect } from "react";
import { ContingencyType, Job } from "../../redux/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Contingency } from "../../redux/interfaces";
import { toast } from "react-toastify";

//hacer interface para las props

export default function AbsenceForm(props: any): JSX.Element {
  const dispatch = useDispatch();
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
    <div>
      <div className="container">
        <form onSubmit={submit}>
          <div className="row">
            <fieldset hidden={props.hide}>
              <legend>Nivel de previsión de la novedad:*</legend>
              <div>
                <input
                  id="request"
                  type="radio"
                  name="hasNotice"
                  value={"true"}
                  checked={data.hasNotice === "true"}
                  onChange={(e) =>
                    setData({ ...data, hasNotice: e.target.value })
                  }
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
                  onChange={(e) =>
                    setData({ ...data, hasNotice: e.target.value })
                  }
                ></input>
                <label htmlFor="notify">Notificar</label>
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
          </div>
          <fieldset>
            <div>
              <legend>Motivo:*</legend>
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
          <button disabled={disable} className="btn btn-dark" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
