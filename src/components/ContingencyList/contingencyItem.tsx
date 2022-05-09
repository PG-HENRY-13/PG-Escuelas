import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import "../../styles/UserList.css";
import { deleteContingency } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";

export default function ContingencyItem(props: any): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div>
      <h4>
        Motivo:{" "}
        {props.contingencyType.charAt(0).toUpperCase() +
          props.contingencyType.slice(1)}
      </h4>
      <button
        onClick={(e) => dispatch(deleteContingency(Number(props.CID)) as any)}
      >
        Check
      </button>
      <div>
        <h6>{`Usuario: ${props.fullName}`}</h6>
        <h6>{"Fecha: " + props.date.slice(0, -14)}</h6>
        <h6>{`Motivo: ${props.reason ? props.reason : "Sin motivo"}`}</h6>
      </div>
    </div>
  );
}
