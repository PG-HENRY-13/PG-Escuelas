import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layouts.css";
export default function LayoutEmployee(): JSX.Element {
  return (
    <main>
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/createuser">
              Mi perfil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/news">
              Novedades
            </NavLink>
          </li>
          <li className="nav-item">
            <span className="nav-link">Contingencias</span>
            <ul>
              <li>
                <NavLink className="nav-link" to="/user/absenceReport">
                  Ausencia
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/user/reschedule">
                  Cambio de horario
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
