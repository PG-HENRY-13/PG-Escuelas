import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../redux/actions/authActions";
import "../styles/Layouts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserClock ,faFile ,faReceipt ,faUserLargeSlash ,faUser, faAngleDown ,faNewspaper,faMessage} from "@fortawesome/free-solid-svg-icons";

export default function LayoutEmployee(): JSX.Element {
  const userLogged = useSelector((state: any) => state.authState);
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
      <nav
        className="navbar navbar-expand-sm"
        style={{ backgroundColor: "#23282B" }}
      >
        
        <ul className="navbar-nav" >
          <li className="nav-item">
          
            <NavLink className="nav-link" to={"/user/" + cuil}>
            <div className="container-fluid">
            <FontAwesomeIcon
                    icon={faUser}
                    
                    className="navbar-brand"
                  />
              Mi perfil -{" "}
              <span>{userLogged.name + " " + userLogged.lastName}</span>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
          
            <NavLink className="nav-link" to="/user/news">
            <FontAwesomeIcon
                    icon={faNewspaper}
                    
                    className="navbar-brand"
                  />
              Novedades
            </NavLink>
          </li>
          <li className="nav-item dropdown ">
          
            <a
              href="#"
              className="nav-link "
              
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon
                    icon={faAngleDown}
                    size="5x"
                    className="navbar-brand"
                  />
              Contingencias
            </a>
            
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
           
            
              <li>
                <NavLink className="dropdown-item" to="/user/absenceReport">
                <FontAwesomeIcon
                    icon={ faUserLargeSlash}
                  
                    className="navbar-brand"
                  />
                  Ausencia
                </NavLink>
              </li>
              <li>
              
                <NavLink className="dropdown-item" to="/user/reschedule">
                <FontAwesomeIcon
                    icon={faUserClock}
                  
                    className="navbar-brand"
                  />
                  Cambio de horario
                </NavLink>
              </li>
              <li>
              
                <NavLink className="dropdown-item" to="/user/record">
                <FontAwesomeIcon
                    icon={faFile}
                    
                    className="navbar-brand"
                  />
                  Mi historial
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
          
          
            <NavLink className="nav-link" to="/user/paychecks">
            <FontAwesomeIcon
                    icon={faReceipt}
                   
                    className="navbar-brand"
                  />
              Recibo de sueldo
            </NavLink>
          </li>
          <li className="nav-item">
          
            <NavLink className="nav-link" to="/user/contact">
            <FontAwesomeIcon
                    icon={faMessage}
    
                    className="navbar-brand"
                  />
              Contacto
            </NavLink>
          </li>
          <li className="nav-item close-session ">
          
          
              
            <button
              className="btn mt-2"
              style={{ backgroundColor: "#1B2023" }}
              onClick={handleLogOut}
            >
              Cerrar Sesión
            </button>
            
          </li>
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}

