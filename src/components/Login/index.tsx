import { NavLink } from "react-router-dom";

export default function Login(): JSX.Element {
  return (
    <div className="container w-25">
      <h2 className="text-center">Ingrese CUIL y Contraseña</h2>
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
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <NavLink to="/admin">
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </NavLink>
      </form>
    </div>
  );
}
