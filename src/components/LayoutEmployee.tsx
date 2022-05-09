import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/LayoutUser.css";
export default function LayoutEmployee(): JSX.Element {
  return (
    <main>
      <nav className="menu">
        <section className="menu__container">
          <ul className="menu__links">
            <li className="menu__item">
              <NavLink className="menu__link" to="/admin/createuser">
                Mi perfil
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink className="menu__link" to="/user/news">
                Novedades
              </NavLink>
            </li>
            <li className="menu__item menu__item--show">
              <a href="#" className="menu__link">
                Contingencias
              </a>
              <ul className="menu_nesting">
                <li className="menu_inside">
                  <NavLink
                    className="menu__link menu__link--inside"
                    to="/user/absenceReport"
                  >
                    Ausencia
                  </NavLink>
                </li>
                <li className="menu_inside">
                  <NavLink
                    className="menu__link menu__link--inside"
                    to="/user/reschedule"
                  >
                    Cambio de horario
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
