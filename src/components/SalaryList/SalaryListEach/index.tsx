import React, { useEffect } from "react";
import "../../../styles/SalaryList.css";

// interface Props {
//   array: Array<{jobId: number; jobName: number;
//     baseWage$: number; additionals$: number; seniority$: number; overTimeAdditionals$:number;
//     absencesDeductions$: number; underTimeDeductions$: number; unionDeductions$: number; baseWageCode:number;
//     underTimeDeductionsCode: number; absencesDeductionsCode: number ,createdAt: string;period:string;
//     updatedAt:string;userCuil:string}>;
// }
interface Props {
  s: {
    jobId: number;
    jobName: number;
    baseWage$: number;
    additionals$: number;
    seniority$: number;
    overTimeAdditionals$: number;
    absencesDeductions$: number;
    underTimeDeductions$: number;
    unionDeductions$: number;
    baseWageCode: number;
    underTimeDeductionsCode: number;
    absencesDeductionsCode: number;
  };
}
export default function SalaryList({ s }: Props): JSX.Element {
  return (
    <div className="subList">
      <div className="userlist-filter-container">
        <>
          <th colSpan={4}>Cargo: {s.jobName}</th>
          <table className="table ">
            <thead>
              <tr>
                <th data-type="numeric">
                  Basico<span className="resize-handle"></span>
                </th>
                <th data-type="any">
                  Adicional <span className="resize-handle"></span>
                </th>
                <th data-type="text-short">
                  Antiguedad<span className="resize-handle"></span>
                </th>
                {/* ACA VAN TODOS LOS DATOS A MOSTRAR */}
                <th data-type="text-short">
                  Horas Extra<span className="resize-handle"></span>
                </th>
                <th data-type="text-short">
                  Ausencias<span className="resize-handle"></span>
                </th>
                <th data-type="text-short">
                  Tardanzas<span className="resize-handle"></span>
                </th>
                <th data-type="text-short">
                  Sindicato<span className="resize-handle"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr>
                  <td>{Number(s.baseWage$).toFixed(2)}</td>
                  <td>{Number(s.additionals$).toFixed(2)}</td>
                  <td>{Number(s.seniority$).toFixed(2)}</td>
                  <td>{Number(s.overTimeAdditionals$).toFixed(2)}</td>
                  <td>{Number(s.absencesDeductions$).toFixed(2)}</td>
                  <td>{Number(s.underTimeDeductions$).toFixed(2)}</td>
                  <td>{Number(s.unionDeductions$).toFixed(2)}</td>
                </tr>
              </>
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
}
