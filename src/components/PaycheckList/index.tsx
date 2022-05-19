import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import {
  fetchAllPaychecks,
  fetchPaychecksByCuil,
  fetchUsers,
  loadUser,
  loadUserSalary,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";
import "../../styles/SalaryList.css";
// import { mapFinderOptions } from "sequelize/types/utils";
import axios from "axios";
import { URL_API } from "../../env";
import Calculator from "../Calculator";

export default function PaycheckList(): JSX.Element {
  const dispatch = useDispatch();
  const dBpaychecks: any[] = useSelector((state: any) => {
    return state.salaryState.paychecks;
  });

  const paychecksByCuil: any[] = useSelector((state: any) => {
    return state.salaryState.paychecksByCuil;
  });

  console.log("paychecksByCuil: ", paychecksByCuil);
  useEffect(() => {
    console.log(dBpaychecks);
    dispatch(fetchAllPaychecks() as any);
    dispatch(fetchPaychecksByCuil() as any);
  }, []);

  function addValues(array: any[], key: string) {
    var sum = 0;
    array.map((obj) => {
      if (obj[key]) {
        var num = Number(obj[key]);
      } else {
        var num = 0;
      }
      return (sum = sum + num);
    });
    return sum;
  }

  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Recibos de sueldo separados</h1>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th data-type="numeric">
              <span className="resize-handle">Cuil</span>
            </th>
            <th data-type="any">
              Job ID <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              jobName<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Salario Base<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              No Remunerativos<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Dias de Ausencia<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Deducciones por Ausencias<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Deducciones por Sindicato<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Salario Total<span className="resize-handle"></span>
            </th>
          </tr>
        </thead>
        {dBpaychecks?.map((paycheck) => {
          return (
            <tr>
              {paycheck.userCuil}
              <td>{paycheck.jobId}</td>
              <td>{paycheck.jobName}</td>
              <td>{Number(paycheck.baseWage$).toFixed(2)}</td>
              <td>{Number(paycheck.additionals$).toFixed(2)}</td>
              <td>{Number(paycheck.unexcusedAbsences)}</td>
              <td>{Number(paycheck.absencesDeductions$).toFixed(2)}</td>
              <td>{Number(paycheck.unionDeductions$).toFixed(2)}</td>
              <td>{Number(paycheck.totalAmount).toFixed(2)}</td>
            </tr>
          );
        })}
      </table>

      <div className="na-title">
        <h1>Recibos de sueldo agrupados por CUIL</h1>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th data-type="numeric">
              <span className="resize-handle">Cuil</span>
            </th>
            <th data-type="any">
              Job ID <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              jobName<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Salario Base<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              No Remunerativos<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Dias de Ausencia<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Deducciones por Ausencias<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Deducciones por Sindicato<span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Salario Total<span className="resize-handle"></span>
            </th>
          </tr>
        </thead>
        {paychecksByCuil?.map((obj) => {
          return (
            <tr>
              <td>{obj[0].userCuil}</td>
              <td>todos</td>
              <td>todos</td>
              <td>{addValues(obj, "baseWage$").toFixed(2)}</td>
              {console.log(obj[0].additionals$)}
              <td>{addValues(obj, "additionals$").toFixed(2)}</td>
              <td>{addValues(obj, "unexcusedAbsences$")}</td>
              <td>{addValues(obj, "absencesDeductions$").toFixed(2)}</td>
              <td>{addValues(obj, "unionDeductions$").toFixed(2)}</td>
              <td>{addValues(obj, "totalAmount").toFixed(2)}</td>
            </tr>
          );
        })}
      </table>
      <button
        onClick={() => {
          console.log("Esta son todas: ", dBpaychecks);
          console.log("Esta son las de cada user creo: ", paychecksByCuil);
        }}
      >
        Tocame
      </button>
    </div>
  );
}
