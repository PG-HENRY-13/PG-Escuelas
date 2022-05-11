import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layouts.css";
import Logo from "../styles/img/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/actions/authActions";

export default function LayoutAdmin(): JSX.Element {
  const userLogged = useSelector((state: any) => state.authState)
  const dispatch =useDispatch();
  const navigate =  useNavigate();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    dispatch(signOut() as any)
    navigate('/')
  }

  return (
    <main>
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
            Inicio - <span >{userLogged.name + ' ' + userLogged.lastName}</span>
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
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/contingencies">
              Contingencias
            </NavLink>
          </li>

          <li className="nav-item close-session">
            <button className="btn btn-light" onClick={handleLogOut}>Cerrar Sesión</button>
          </li>
          {/* <li className="nav-logo-center">
            <NavLink className="nav-logo-link" to="/admin/">
              <img className="nav-logo" src={Logo} alt="logo"></img>
            </NavLink>
          </li> */}
          
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
