import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layouts.css";
import Logo from "../styles/img/Logo.png";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/actions/authActions";

export default function LayoutAdmin(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    dispatch(signOut() as any);
    navigate("/");
  };

  return (
    <main>
      {/* <nav classNameName="navbar navbar-expand-lg">
        <ul classNameName="navbar-nav">
          <li classNameName="nav-item">
            <NavLink classNameName="nav-link" to="/admin/">
              <img classNameName="nav-logo" src={Logo} alt="logo"></img>
            </NavLink>
          </li>
          <li classNameName="nav-item">
            <NavLink classNameName="nav-link" to="/admin/createuser">
              Crear Usuario Nuevo
            </NavLink>
          </li>
          <li classNameName="nav-item">
            <NavLink classNameName="nav-link" to="/admin/userlist">
              Ver lista de usuarios
            </NavLink>
          </li>
          <li classNameName="nav-item">
            <NavLink classNameName="nav-link" to="/admin/contingencies">
              Contingencias
            </NavLink>
          </li>

          <li classNameName="nav-item">
            <NavLink classNameName="nav-link" to="/admin/salary">
              Salario
            </NavLink>
          </li>
          </ul>
        
          
          <nav classNameName="dflex">
            <li classNameName="nav-item">
            <button classNameName="button-close-session" onClick={handleLogOut}>
              Cerrar Sesión
            </button>
            </li>
            
        </nav>
      
     
     </nav> */}

<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
  <NavLink className="nav-link" to="/admin/">
              <img className="nav-logo" src={Logo} alt="logo"></img>
    </NavLink>

    <div className="collapse navbar-collapse" id="navbarScroll">
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
        <li className="nav-item">
        <NavLink className="nav-link" to="/admin/contingencies">
              Contingencias
            </NavLink>
          
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/admin/salary">
              Salario
            </NavLink>
        </li>
      </ul>
      <form className="d-flex">
      <button className="button-close-session" onClick={handleLogOut}>
              Cerrar Sesión
            </button>
        
      </form>
    </div>
  </div>
</nav>
    
      <section>
        <Outlet />
      </section>
    </main>
  );
}
