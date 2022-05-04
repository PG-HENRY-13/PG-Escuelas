import { NavLink } from "react-router-dom";
import "../../styles/Login.css";

export default function Login(): JSX.Element {
  return (
    <div className="login-container">
    <div className="login-container-inside">
      <h2 className="text-center">ACCESO CON CUIL</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="user" className="form-label">
            Ingrese número de CUIL:{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="user"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <NavLink to="/admin">
          <button type="submit" className="button">
            Ingresar
          </button>
        </NavLink>
      </form>
    </div>
    </div>
  );
}
