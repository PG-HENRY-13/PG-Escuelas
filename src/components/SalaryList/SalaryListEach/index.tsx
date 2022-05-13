import React, { useEffect } from "react";
import "../../../styles/SalaryList.css";

// interface Props {
//   array: Array<{jobId: number,
//   jobName: string,
//   baseWage$: number,
//   additionals$: number,
//   seniority$: number,
//   overTimeAdditionals$: number,
//   absencesDeductions$: number,
//   underTimeDeductions$: number,
//   unionDeductions$: number,
//   baseWageCode: number,
//   underTimeDeductionsCode: number,
//   absencesDeductionsCode: number}>;
// }

var array =[
  {
      jobId: 1012,
      jobName: "profe",
      baseWage$: 50070,
      additionals$: 14881.98,
      seniority$: 0,
      overTimeAdditionals$: 0,
      absencesDeductions$: 0,
      underTimeDeductions$: 0,
      unionDeductions$: 1001.4,
      baseWageCode: 100,
      underTimeDeductionsCode: 3779,
      absencesDeductionsCode: 1226
  },
  {
      jobId: 1013,
      jobName: "profe inicial",
      baseWage$: 53574.899999999994,
      additionals$: 14881.98,
      seniority$: 0,
      overTimeAdditionals$: 0,
      absencesDeductions$: 0,
      underTimeDeductions$: 0,
      unionDeductions$: 1071.4979999999998,
      baseWageCode: 107,
      underTimeDeductionsCode: 3779,
      absencesDeductionsCode: 219
  },
  
]

//{ array }:Props
export default function SalaryList(): JSX.Element {
  return (
    <div className="subList">
      <div className="userlist-filter-container">
        {array?.map((t)=>{
          return(
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
                <td>{t.baseWage$.toFixed(2)}</td>
                <td>{t.additionals$.toFixed(2)}</td>
                <td>{t.seniority$.toFixed(2)}</td>
                <td>{t.overTimeAdditionals$.toFixed(2)}</td>
                <td>{t.absencesDeductions$.toFixed(2)}</td>
                <td>{t.underTimeDeductions$.toFixed(2)}</td>
                <td>{t.unionDeductions$.toFixed(2)}</td>
              </tr>
            </>
          </tbody>
        </table>
        </>
          )
        })}
        
      </div>
    </div>
  );
}
