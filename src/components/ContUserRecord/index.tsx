import React, { useEffect, useState } from "react";
import "../../styles/UserList.css";
import {
  fetchContingencies,
  fetchUserContingencies,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function UserContingenciesRecord(): JSX.Element {
  const dispatch = useDispatch();
  const cuil = useSelector((state: any) => {
    return state.authState.id;
  });
  const loadedContingencies = useSelector((state: any) => {
    return state.usersState.contingencies;
  });

  useEffect(() => {
    dispatch(fetchUserContingencies(cuil) as any);
  }, [cuil]);

  const [index, setIndex] = useState(1);

  function indexHandler(e: any) {
    console.log(e.target.value);
    setIndex(Number(e.target.value));
  }

  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Historial de contingencias</h1>
      </div>
      <table className="table table-size">
        {
          <thead>
            <tr>
              <th data-type="numeric">
                Estado <span className="resize-handle"></span>
              </th>
              <th data-type="numeric">
                Tipo <span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Cargo <span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Fecha <span className="resize-handle"></span>
              </th>
              <th data-type="text-long">
                Horas <span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Ausencias<span className="resize-handle"></span>
              </th>
            </tr>
          </thead>
        }
        <tbody>
          {loadedContingencies
            .filter(
              (e: any, i: number) => index * 10 - 10 <= i && i < index * 10
            )
            .map((e: any) => {
              return (
                <>
                  <tr>
                    <td>{e.state}</td>
                    <td>
                      {e.contingencyType.charAt(0).toUpperCase() +
                        e.contingencyType.slice(1)}
                    </td>
                    <td>
                      {e.userJob?.jobData.name.charAt(0).toUpperCase() +
                        e.userJob?.jobData.name.slice(1)}
                    </td>
                    <td>{e.date.slice(0, -14)}</td>
                    <td>{e.hoursNumber ? e.hoursNumber : "N/A"}</td>
                    <td>{e.absenceDays ? e.absenceDays : "N/A"}</td>
                  </tr>
                </>
              );
            })}
        </tbody>{" "}
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => setIndex(1)}>
              Primero
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={(e) => setIndex(index - 1)}
              disabled={!(index - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" value={index} onClick={indexHandler}>
              {index}
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={(e) => setIndex(index + 1)}
              disabled={
                index === Math.ceil(loadedContingencies?.length / 10) ||
                !loadedContingencies?.length
              }
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              disabled={!loadedContingencies?.length}
              onClick={() =>
                setIndex(Math.ceil(loadedContingencies?.length / 10))
              }
            >
              Ultimo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
