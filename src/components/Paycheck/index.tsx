import "../../styles/Paycheck.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { URL_API } from "../../env";

export default function Paycheck(): JSX.Element {
  const toDay = new Date();
  const user = useSelector((state: any) => state.authState);
  let job = useParams();
  const dispatch = useDispatch();
  const [payChecks, setPayChecks] = useState([]);
  const [period, setPeriod] = useState(
    toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    if (job)
      dispatch(loadUser(user.id) as any).then(() => {
        api();
      });
  }, []);

  function api() {
    axios
      .get(
        `${URL_API}paychecks?cuil=${user.id}&period=${period.replace("-", "")}`
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

  const antiguedad = "4807.6";

  function sumar() {
    if (jobPaycheck) {
      var a = parseFloat(jobPaycheck[0].baseWage$);
      var b = parseFloat(jobPaycheck[0].additionals$);
      var c = parseFloat(jobPaycheck[0].overTimeAdditionals$);
      var d = parseFloat(antiguedad);
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
      var f = parseFloat(antiguedad);
      var total = a + b + c - d - e + f;
      return total;
    }
  }

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
                    {user.name} {user.lastName}
                  </td>
                  <th colSpan={1}>Cargo</th>
                  <td colSpan={4}>{job.jobName}</td>
                  <th>Periodo</th>
                  <td>{jobPaycheck[0].period}</td>
                  <th></th>
                  <td></td>
                </tr>
                <tr>
                  <th>CUIL</th>
                  <td colSpan={3}>{user.id}</td>
                  <th>Fecha de pago</th>
                  <td>{jobPaycheck[0].period}</td>
                  <td colSpan={3}>{}</td>
                  <th>Ingreso</th>
                  <td>{jobPaycheck[0].createdAt}</td>
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
                  {jobPaycheck[0].baseWage$}
                </td>
                <td className="myAlign">{jobPaycheck[0].baseWage$}</td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">1836</td>
                <td className="myAlign" colSpan={6}>
                  ANTIGUEDAD
                </td>
                <td colSpan={2} className="myAlign">
                  {antiguedad}
                </td>
                <td className="myAlign">{antiguedad}</td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">304</td>
                <td className="myAlign" colSpan={6}>
                  SINDICATO
                </td>
                <td colSpan={2} className="myAlign">
                  {jobPaycheck[0].unionDeductions$}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
                <td className="myAlign">{jobPaycheck[0].unionDeductions$}</td>
              </tr>
              <tr>
                <td className="myAlign">1023</td>
                <td className="myAlign" colSpan={6}>
                  ADICIONAL REMUNERATIVO
                </td>
                <td colSpan={2} className="myAlign">
                  {jobPaycheck[0].additionals$}
                </td>
                <td className="myAlign">{jobPaycheck[0].additionals$}</td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
              </tr>
              <tr>
                <td className="myAlign">201</td>
                <td className="myAlign" colSpan={6}>
                  HORAS EXTRAS
                </td>
                <td colSpan={2} className="myAlign">
                  {jobPaycheck[0].overTimeAdditionals$}
                </td>
                <td className="myAlign">
                  {jobPaycheck[0].overTimeAdditionals$}
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
                  {jobPaycheck[0].absencesDeductions$}
                </td>
                <td className="myAlign"></td>
                <td className="myAlign"></td>
                <td className="myAlign">
                  {jobPaycheck[0].absencesDeductions$}
                </td>
              </tr>
              <tr>
                <td className="myAlign" colSpan={9}></td>
                <td className="myAlign">{sumar()}</td>
                <td className="myAlign"></td>
                <td className="myAlign">{restar()}</td>
              </tr>
              <tr>
                <td className="myAlign" colSpan={10}></td>
                <td className="table-border">TOTAL</td>
                <td className="table-border">{total()}</td>
              </tr>
              <tr>
                <td colSpan={2}></td>
                <td className="footer" colSpan={7}></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Periodo:</td>
                <td className="footer" colSpan={7}>
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
                <td colSpan={2}></td>
                <td className="footer" colSpan={7}></td>
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
