import "../../styles/Paycheck.css";

export default function Paycheck(): JSX.Element {
  return (
    <div className="paycheck-container">
      <table className="empDetail">
        <thead>
          <tr>
            <th>Nombre</th>
            <td colSpan={3}>XXXXX</td>
            <th colSpan={1}>Cargo</th>
            <td colSpan={3}>XXXXX</td>
            <th>Periodo</th>
            <td>XXXXX</td>
            <th>Escalafon</th>
            <td>XXXXX</td>
          </tr>
          <tr>
            <th>CUIL</th>
            <td colSpan={3}>XXXXX</td>
            <th colSpan={1}>Dias</th>
            <td colSpan={3}>XXXXX</td>
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
  );
}
