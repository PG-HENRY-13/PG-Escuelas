import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layouts.css";
export default function LayoutEmployee(): JSX.Element {
  const cuil = useSelector((state: any) => state.authState.id);
  return (
    <main>
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to={"/user/" + cuil}>
              Mi perfil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/news">
              Novedades
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
                <NavLink className="dropdown-item" to="/user/absenceReport">
                  Ausencia
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/user/reschedule">
                  Cambio de horario
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/paycheck">
              Recibo de sueldo
            </NavLink>
          </li>
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
