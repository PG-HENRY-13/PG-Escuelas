import React, { useEffect } from "react";
import "../../../styles/SalaryList.css";
import { useNavigate } from "react-router-dom";

// interface Props {
//   array: Array<{jobId: number; jobName: number;
//     baseWage$: number; additionals$: number; seniority$: number; overTimeAdditionals$:number;
//     absencesDeductions$: number; underTimeDeductions$: number; unionDeductions$: number; baseWageCode:number;
//     underTimeDeductionsCode: number; absencesDeductionsCode: number ,createdAt: string;period:string;
//     updatedAt:string;userCuil:string}>;
// }
interface Props {
  array: Array<{
    absencesDeductions$: string;
    absencesDeductionsCode: string;
    additionals$: string;
    baseWage$: string;
    baseWageCode: string;
    excusedAbsences: string;
    isSigned: boolean;
    jobId: string;
    jobName: string;
    overTimeAdditionals$: string;
    overTimeHours: string;
    period: string;
    seniority$: string; //
    seniorityYears: string; //
    totalAmount: string;
    underTimeDeductions$: string;
    underTimeDeductionsCode: string;
    underTimeHours$: string; //
    unexcusedAbsences: string; //
    unionDeductions$: string; //
    userCuil: string; //
  }>;
}
export default function SalaryListEach({ array }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="subList">
      <div className="userlist-filter-container">
        {array?.map((t) => {
          return (
            <>
              <th colSpan={4}>Cargo: {t.jobName}</th>
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
                    <th data-type="text-short">
                      Total<span className="resize-handle"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr>
                      <td>{Number(t.baseWage$).toFixed(2)}</td>
                      <td>{Number(t.additionals$).toFixed(2)}</td>
                      <td>{Number(t.seniority$).toFixed(2)}</td>
                      <td>{Number(t.overTimeAdditionals$).toFixed(2)}</td>
                      <td>{Number(t.absencesDeductions$).toFixed(2)}</td>
                      <td>{Number(t.underTimeDeductions$).toFixed(2)}</td>
                      <td>{Number(t.unionDeductions$).toFixed(2)}</td>
                      <td>{Number(t.totalAmount).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-dark"
                          onClick={() =>
                            navigate(
                              "../paycheck" + "/" + t.jobName + "/" + t.userCuil
                            )
                          }
                        >
                          Ver recibo
                        </button>
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </>
          );
        })}
      </div>
    </div>
  );
}
