import React, { useEffect } from "react";
import { ContingencyType, StoreState, User } from "../../redux/interfaces";
import "../../styles/UserList.css";
import { deleteContingency, handleContingency } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";
import { ContingencyState } from "../../redux/interfaces";
import "../../styles/Contingency.css";

export default function ContingencyItem(props: any): JSX.Element {
  const dispatch = useDispatch();
  console.log("Esta son las props", props.fullName);
  return (
    <div className="all-container">
      <div className="head-container">
        <h4>
          {props.contingencyType.charAt(0).toUpperCase() +
            props.contingencyType.slice(1)}
        </h4>
        <h5>Estado: {props.state}</h5>
        <div className="btn-container">
          <button
            className="btn btn-outline-dark btn-space"
            disabled={props.state !== ContingencyState.pending}
            onClick={(e) =>
              dispatch(
                handleContingency(
                  Number(props.CID),
                  ContingencyState.accepted
                ) as any
              )
            }
          >
            Aprobar
          </button>
          <button
            className="btn btn-outline-dark btn-space"
            disabled={props.state !== ContingencyState.pending}
            onClick={(e) =>
              dispatch(
                handleContingency(
                  Number(props.CID),
                  ContingencyState.rejected
                ) as any
              )
            }
          >
            Rechazar
          </button>
          <button
            className="btn btn-outline-dark btn-space"
            disabled={props.state !== ContingencyState.pending}
            onClick={(e) =>
              dispatch(
                handleContingency(
                  Number(props.CID),
                  ContingencyState.discarded
                ) as any
              )
            }
          >
            Descartar
          </button>
        </div>
      </div>
      <div className="data-container">
        <h6>{`Usuario: ${props.fullName}`}</h6>
        <h6>{`Fecha: ${props.date.slice(0, -14)} ${
          props.endDate ? `al ${props.endDate.slice(0, -14)}` : ""
        }`}</h6>

        <h6>{`${
          props.contingencyType === ContingencyType.Absence
            ? `Suplente: ${
                props.substitute ? props.substitute : "Sin suplente sugerido"
              }`
            : `Horas extra/perdidas: ${props.hours}`
        }`}</h6>
      </div>
      <h6>{`Motivo: ${props.reason ? props.reason : "Sin motivo"}`}</h6>
    </div>
  );
}
