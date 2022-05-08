import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layouts.css";
import Logo from "../styles/img/Logo.png"


export default function LayoutAdmin(): JSX.Element {
  return (
    <main>
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
          </li>
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

          <li className="nav-logo-center">
            <NavLink className="nav-logo-link" to="/admin/">
              <img className="nav-logo" src={Logo} alt="logo"></img>
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
