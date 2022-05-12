import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../redux/actions/authActions";
import "../styles/Layouts.css";
export default function LayoutEmployee(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    dispatch(signOut() as any);
    navigate("/");
  };

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
          <li className="nav-item close-session">
            <button onClick={handleLogOut}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
