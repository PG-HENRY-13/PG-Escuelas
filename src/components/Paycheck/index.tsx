import "../../styles/Paycheck.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, updateFormUser } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Html from "react-pdf-html";

export default function Paycheck(): JSX.Element {
  let { cuil } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => {
    return state.usersState.userForm;
  });

  useEffect(() => {
    if (cuil) dispatch(loadUser(Number(cuil)) as any);
  }, []);

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
              <td colSpan={3}>{user.trabajos}</td>
              <th>Periodo</th>
              <td>XXXXX</td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>CUIL</th>
              <td colSpan={3}>{user.cuil}</td>
              <th colSpan={1}>Escalafon</th>
              <td colSpan={3}>{user.seniorityDate.split("T")[0]}</td>
              <th>Fecha de pago</th>
              <td>XXXXX</td>
              <th>Ingreso</th>
              <td>XXXXX</td>
            </tr>
          </thead>
          {/* --------------------------------------------------- */}
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
          {/* --------------------------------------------------- */}
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              SUELDO BASCIO
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              ANTIGUEDAD
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              ESTADO DOCENTE
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              BONIFICACION COMPENSATORIO
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              ADICIONAL REMUNERATIVO
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              OBRA SOCIAL
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              SUPLEMENTO POR CAPACITACION
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          <tr>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign" colSpan={6}>
              JUBILACION - APORTE PERSONAL
            </td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
            <td className="myAlign">XXXXX</td>
          </tr>
          {/* --------------------------------------------------- */}
          <tr>
            <td className="myAlign" colSpan={7}></td>
            <td colSpan={2} className="myAlign">
              XXXXX
            </td>
            <td className="myAlign"> XXXXX </td>
            <td className="myAlign"> XXXXX </td>
            <td className="myAlign"> XXXXX </td>
          </tr>
          <tr>
            <td className="myAlign" colSpan={10}></td>
            <td className="table-border">TOTAL</td>
            <td className="table-border"> XXXXX </td>
          </tr>
          {/* --------------------------------------------------- */}
          <tr>
            <td colSpan={2}>Ultimo aporte:</td>
            <td className="footer" colSpan={7}>
              XXXXX
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}>Periodo:</td>
            <td className="footer" colSpan={7}>
              XXXXX
            </td>
            <td>
              {/* indicado y segun la presente liquidacion dejando constancia de haber */}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}>Banco:</td>
            <td className="footer" colSpan={7}>
              XXXXX
            </td>
            <td>{/* recibido un duplicado de este recibo. */}</td>
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
              . . . . . . . . . . . . . . . . . . . . . . . .{" "}
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
      <button className="button-download" onClick={() => window.print()}>
        {console.log(window)} Descargar
      </button>
    </div>
  );
}
