import React from "react";
import { sendContingency } from "../../redux/actions";
import { useState, useEffect } from "react";
import { ContingencyType } from "../../redux/interfaces";
import { useSelector } from "react-redux";
import { Contingency } from "../../redux/interfaces";

export default function AbsenceForm(): JSX.Element {
  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    let toSend: Contingency = {
      //el dato se substitute no se manda actualmente
      ...data,
      hasNotice: data.hasNotice === "true" ? true : false,
      fullName: loggedUser.name + " " + loggedUser.lastName,
      jobId: "1010",
      cuil: loggedUser.id,
    };
    if (!data.endDate) delete toSend.endDate;
    sendContingency(toSend);
    setData({
      hasNotice: "true",
      contingencyType: ContingencyType.Absence,
      reason: "",
      date: "",
      endDate: "",
      substitute: "",
    });
  }

  const loggedUser = useSelector((state: any) => {
    return state.authState;
  });

  const [data, setData] = useState({
    hasNotice: "true",
    contingencyType: ContingencyType.Absence,
    reason: "",
    date: "",
    endDate: "",
    substitute: "",
  });

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
