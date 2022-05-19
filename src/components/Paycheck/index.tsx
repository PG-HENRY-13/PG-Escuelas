import React, { useEffect, useState } from "react";
import "../../styles/Paycheck.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser } from "../../redux/actions";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { URL_API } from "../../env";
import { fetchUsers } from "../../redux/actions";

export default function Paycheck(): JSX.Element {
  let cuil = useParams().cuil;
  const toDay = new Date();
  let job = useParams();
  const loadedUser = useSelector((state: any) => {
    return state.usersState.userForm;
  });
  const dispatch = useDispatch();
  const [payChecks, setPayChecks] = useState([]);
  const [period, setPeriod] = useState(
    toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    if (job)
      dispatch(loadUser(Number(cuil)) as any).then(() => {
        api();
      });
  }, []);

  function api() {
    axios
      .get(
        `${URL_API}paychecks?cuil=${loadedUser.cuil}&period=${period.replace(
          "-",
          ""
        )}`
      )
      .then((response) => {
        setPayChecks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const jobPaycheck: any = payChecks.filter((e: any) => {
    let jobFilter = job.jobName;
    let jobFiltrado = e.jobName === jobFilter;
    return jobFiltrado;
  });

  const gastos = "4807.6";

  function sumar() {
    if (jobPaycheck) {
      var a = parseFloat(jobPaycheck[0].baseWage$);
      var b = parseFloat(jobPaycheck[0].additionals$);
      var c = parseFloat(jobPaycheck[0].overTimeAdditionals$);
      var d = parseFloat(gastos);
      var suma = a + b + c + d;
      return suma;
    }
  }

  function restar() {
    if (jobPaycheck) {
      var a = parseFloat(jobPaycheck[0].unionDeductions$);
      var b = parseFloat(jobPaycheck[0].absencesDeductions$);
      var resta = a - b;
      return resta;
    }
  }

  function total() {
    if (jobPaycheck) {
      var a = parseFloat(jobPaycheck[0].baseWage$);
      var b = parseFloat(jobPaycheck[0].additionals$);
      var c = parseFloat(jobPaycheck[0].overTimeAdditionals$);
      var d = parseFloat(jobPaycheck[0].unionDeductions$);
      var e = parseFloat(jobPaycheck[0].absencesDeductions$);
      var f = parseFloat(gastos);
      var total = a + b + c - d - e + f;
      return total;
    }
  }

  let today = new Date();
  let fecha =
    today.getDate().toString().padStart(2, "0") +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getFullYear();

  return (
    <div>
      {jobPaycheck[0] ? (
        <div id="paycheckPdf">
          <div className="paycheck-container">
            <table className="empDetail">
              <thead>
                <tr>
                  <th>Nombre </th>
                  <td colSpan={3}>
                    {loadedUser.name} {loadedUser.lastName}
                  </td>
                  <th colSpan={1}>Cargo</th>
                  <td colSpan={4}>{job.jobName}</td>
                  <th>Periodo</th>
                  <td colSpan={2}>{jobPaycheck[0].period}</td>
                </tr>
                <tr>
                  <th>CUIL</th>
                  <td colSpan={3}>{loadedUser.cuil}</td>
                  <th>Fecha de pago</th>
                  <td>{jobPaycheck[0].period}</td>
                  <td colSpan={3}>{}</td>
                  <th>Fecha</th>
                  <td colSpan={2}>{fecha}</td>
                </tr>
              </thead>
              <tr className="myBackground">
                <th className="table-border">CODIGO</th>
                <th colSpan={6} className="table-border">
                  DESCRIPCION
                </th>
                <th colSpan={2} className="table-border">
                  CANTIDAD
                </th>
                <th className="table-border">REMUNERATIVOS</th>
                <th className="table-border">NO REMUNERATIVOS</th>
                <th className="table-border">DEDUCTIVOS</th>
              </tr>
              <tr>
                <td className="myAlign">101</td>
                <td className="myAlign" colSpan={6}>
                  SUELDO BASCIO
                </td>
                <td colSpan={2} className="myAlign">
                  {Number(jobPaycheck[0].baseWage$).toFixed(2)}
                </td>
                <td className="myAlign">
                  {Number(jobPaycheck[0].baseWage$)?.toFixed(2)}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">1836</td>
                <td className="myAlign" colSpan={6}>
                  GASTOS INHERENTES A LA LABOR DOCENTE
                </td>
                <td colSpan={2} className="myAlign">
                  {gastos}
                </td>
                <td className="myAlign">{gastos}</td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">304</td>
                <td className="myAlign" colSpan={6}>
                  SINDICATO
                </td>
                <td colSpan={2} className="myAlign">
                  {Number(jobPaycheck[0].unionDeductions$).toFixed(2)}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
                <td className="myAlign">
                  {Number(jobPaycheck[0]?.unionDeductions$).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="myAlign">1023</td>
                <td className="myAlign" colSpan={6}>
                  ADICIONAL REMUNERATIVO
                </td>
                <td colSpan={2} className="myAlign">
                  {Number(jobPaycheck[0].additionals$).toFixed(2)}
                </td>
                <td className="myAlign">
                  {Number(jobPaycheck[0].additionals$).toFixed(2)}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">201</td>
                <td className="myAlign" colSpan={6}>
                  HORAS EXTRAS
                </td>
                <td colSpan={2} className="myAlign">
                  {Number(jobPaycheck[0].overTimeAdditionals$).toFixed(2)}
                </td>
                <td className="myAlign">
                  {Number(jobPaycheck[0].overTimeAdditionals$).toFixed(2)}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">203</td>
                <td className="myAlign" colSpan={6}>
                  DESCUENTO POR AUSENCIAS
                </td>
                <td colSpan={2} className="myAlign">
                  {Number(jobPaycheck[0].absencesDeductions$).toFixed(2)}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
                <td className="myAlign">
                  {Number(jobPaycheck[0].absencesDeductions$).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="myAlign" colSpan={9}></td>
                <td className="myAlign">{sumar()?.toFixed(2)}</td>
                <td className="myAlign"></td>
                <td className="myAlign">{restar()?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="myAlign" colSpan={10}></td>
                <td className="table-border">TOTAL</td>
                <td className="table-border">{total()?.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={1}>Periodo:</td>
                <td className="footer" colSpan={8}>
                  {jobPaycheck[0].period}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td className="footer" colSpan={8}>
                  Recibi en concepto de mis haberes correspondientes al periodo
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td className="footer" colSpan={8}>
                  de arriba indicado y segun la presente liquidacion dejando
                </td>
                <td>.</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td className="footer" colSpan={8}>
                  constancia de haber recibido un duplicado de este recibo.
                </td>
                <td colSpan={1}></td>
                <td className="footer-center">
                  . . . . . . . . . . . . . . . . . . . . . . . .
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td className="footer" colSpan={8}></td>
                <td colSpan={1}></td>
                <td className="footer-center">Empleado</td>
                <td></td>
              </tr>
            </table>
          </div>
          <button
            className="button-download"
            onClick={() => {
              window.print();
            }}
          >
            Descargar
          </button>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}
