import React from "react";
import {NavLink, Outlet} from 'react-router-dom'

export default function LayoutAdmin(): JSX.Element {
  return (
  <main>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className='nav-link' to='/'>Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to='/admin/createuser'>Crear Usuario Nuevo</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to='/admin/updateuser'>Actualizar usuario</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className='nav-link' to='/admin/userlist'>Ver lista de usuarios</NavLink>
          </li>
        </ul>
      </nav>
      <section>
          <Outlet/>
      </section>
  </main>
  )
  ;
}
