import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import "../../styles/UserInfo.css";
import { fetchUsers, loadUser } from "../../redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";

export default function UserInfo(): JSX.Element {
  const dispatch = useDispatch();
  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });

  function putUserinState(cuil: number) {
    dispatch(loadUser(cuil) as any);
  }
  useEffect(() => {
    dispatch(fetchUsers()as any);
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th data-type="numeric">
              cuil <span className="resize-handle"></span>
            </th>
            <th data-type="any">
              boton <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Nombre <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Apellido <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              phoneNumber <span className="resize-handle"></span>
            </th>
            <th data-type="text-long">
              Cargo <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Dirección <span className="resize-handle"></span>
            </th>
            <th data-type="text-long">
              Correo Electronico <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Género<span className="resize-handle"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loadedUsers.map((e: any) => {
            return (
              <>
                <tr>
                  <td>{e.cuil}</td>{" "}
                  <button onClick={() => putUserinState(e.cuil)}>
                    details
                  </button>
                  <td>{e.name}</td>
                  <td>{e.lastName}</td>
                  <td>{e.phoneNumber}</td>
                  <td>{e.role}</td>
                  <td>{e.address}</td>
                  <td>{e.emailAddress}</td>
                  <td>{e.gender}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
