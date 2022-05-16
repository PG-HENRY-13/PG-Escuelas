import React, { useEffect, useState } from "react";
import { StoreState, Paycheck } from "../../redux/interfaces";
import "../../styles/UserList.css";
import { fetchUsers, loadUser, loadUserSalary } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";
import axios from "axios";
import { URL_API } from "../../env";
import { toast } from "react-toastify";

export default function Paychecks(): JSX.Element {
  const toDay = new Date();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useSelector((state: any) => state.authState);
  const filter = searchParams.get("filter") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payChecks, setPayChecks] = useState([]);
  const [period, setPeriod] = useState(
    toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1).toString().padStart(2, "0")
  );

  // function putUserinState(cuil: number) {
  //   dispatch(loadUser(cuil) as any);
  //   navigate("/admin/userlist/" + cuil);
  // }

  // function putUserinStateSalary(cuil: number) {
  //   dispatch(loadUserSalary(cuil) as any);
  //   navigate("/admin/salary/" + cuil);
  // }

  useEffect(() => {
    axios
      .get(
        `${URL_API}paychecks?cuil=${user.id}&period=${period.replace("-", "")}`
      )
      .then((response) => {
        setPayChecks(response.data);
      })
      .catch((error) => {
        toast.error("No se pudo cargar la información");
      });
  }, [period]);

  const handleFilter = (e: string) => {
    setSearchParams({ filter: e });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setPeriod(e.target.value);
  };

  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Listado de Bonos de sueldo</h1>
      </div>
      <div className="userlist-search-container">
        <h4>Busqueda rápida</h4>
        <input
          className="form-control"
          type="text"
          value={filter}
          placeholder="Buscar"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="periodoS"></label>
        <input
          type="month"
          name="periodoS"
          id="periodoS"
          min="2018-03"
          value={period}
          onChange={handleChange}
        ></input>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th data-type="numeric">
              Período <span className="resize-handle"></span>
            </th>
            <th data-type="any">
              Cargo <span className="resize-handle"></span>
            </th>
            <th data-type="numeric">
              Sueldo Básico <span className="resize-handle"></span>
            </th>
            <th data-type="numeric">
              Adicionales <span className="resize-handle"></span>
            </th>
            <th data-type="numeric">
              Horas extras <span className="resize-handle"></span>
            </th>
            <th data-type="numeric">
              Descuento por ausencias <span className="resize-handle"></span>
            </th>
            <th data-type="numeric">
              Horas descontadas <span className="resize-handle"></span>
            </th>
            <th data-type="numeric">
              Sindicato <span className="resize-handle"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {payChecks
            .filter((payc: Paycheck) => {
              if (!filter) return true;
              const jobName =
                payc.jobName.toLowerCase() + " " + user.lastName.toLowerCase();

              return jobName.includes(filter.toLocaleLowerCase())
                ? payc
                : false;
            })
            .map((e: Paycheck) => {
              return (
                <>
                  <tr>
                    <td>{e.userCuil}</td>
                    <td>{e.jobName}</td>
                    <td>{"$" + Number(e.baseWage$).toFixed(2)}</td>
                    <td>{"$" + Number(e.additionals$).toFixed(2)}</td>
                    <td>{"$" + Number(e.overTimeAdditionals$).toFixed(2)}</td>
                    <td>{"$" + Number(e.absencesDeductions$).toFixed(2)}</td>
                    <td>{"$" + Number(e.underTimeDeductions$).toFixed(2)}</td>
                    <td>{"$" + Number(e.unionDeductions$).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-dark"onClick={()=>navigate('../paycheck')}>Ver recibo</button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
