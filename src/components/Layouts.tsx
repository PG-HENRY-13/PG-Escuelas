import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layouts.css";
import Logo from "../styles/img/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/actions/authActions";

export default function LayoutAdmin(): JSX.Element {
  const userLogged = useSelector((state: any) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    dispatch(signOut() as any);
    navigate("/");
  };

  return (
    <main>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/createuser">
              Crear Usuario Nuevo
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/userlist">
              Ver lista de usuarios
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Contingencias
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/admin/contingencies/pending"
                >
                  Pendientes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/admin/contingencies/record"
                >
                  Historial
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/admin/contingencies/create"
                >
                  Crear
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/salary">
              Salario
            </NavLink>
          </li>
        </ul>
        <form className="d-flex">
          <button className="btn btn-light" onClick={handleLogOut}>
            Cerrar Sesión
          </button>
        </form>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
