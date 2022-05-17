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
import { jsPDF } from "jspdf";
import axios from "axios";
import { URL_API } from "../../env";
import { jobsReducer } from "../../redux/reducers/jobs";

export default function Paycheck(): JSX.Element {
  const role = useSelector((state: any) => state.authState.role);
  let job = useParams();
  console.log(job);
  const dispatch = useDispatch();
  const userToUpdate = useSelector((state: any) => {
    return state.usersState.userForm;
  });
  const user = useSelector((state: any) => state.authState);

  useEffect(() => {
    if (job) dispatch(loadUser(user.id) as any);
  }, []);

  const toDay = new Date();
  const [payChecks, setPayChecks] = useState([]);
  const [period, setPeriod] = useState(
    toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    axios
      .get(
        `${URL_API}paychecks?cuil=${user.id}&period=${period.replace("-", "")}`
      )
      .then((response) => {
        setPayChecks(response.data);
      });
    console.log(payChecks, "2");
  }, [period]);

  const jobPaycheck: any = payChecks.filter((e: any) => {
    let jobFilter = job.jobName;
    let jobFiltrado = e.jobName === jobFilter;
    return jobFiltrado;
  });

  console.log(user, "2222");
  console.log(jobPaycheck, "111111");

  return (
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
              <td colSpan={3}>{job.jobName}</td>
              <th>Periodo</th>
              <td>{jobPaycheck[0].period}</td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>CUIL</th>
              <td colSpan={3}>{user.id}</td>
              <th colSpan={1}>Escalafon</th>
              <td colSpan={3}>{}</td>
              <th>Fecha de pago</th>
              <td>{jobPaycheck[0].period}</td>
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
            <td colSpan={2} className="myAlign"></td>
            <td className="myAlign"></td>
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
            <td className="myAlign">{jobPaycheck[0].overTimeAdditionals$}</td>
            <td className="myAlign"></td>
            <td className="myAlign"></td>
          </tr>
          <tr>
            <td className="myAlign">203</td>
            <td className="myAlign" colSpan={6}>
              DESCUENTO POR AUSENCIAS
            </td>
            <td colSpan={2} className="myAlign">
              {jobPaycheck[0].underTimeDeductions$}
            </td>
            <td className="myAlign"></td>
            <td className="myAlign"></td>
            <td className="myAlign">{jobPaycheck[0].underTimeDeductions$}</td>
          </tr>
          <tr>
            <td className="myAlign" colSpan={9}></td>
            <td className="myAlign"> XXXXX </td>
            <td className="myAlign"> XXXXX </td>
            <td className="myAlign"> XXXXX </td>
          </tr>
          <tr>
            <td className="myAlign" colSpan={10}></td>
            <td className="table-border">TOTAL</td>
            <td className="table-border"> XXXXX </td>
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
            <td colSpan={2}>Banco:</td>
            <td className="footer" colSpan={7}></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td className="footer" colSpan={7}></td>
            <td>.</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td className="footer" colSpan={7}></td>
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
  );
}
