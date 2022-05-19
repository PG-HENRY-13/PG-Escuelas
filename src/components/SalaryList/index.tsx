import React, { useEffect, useState } from "react";
import { StoreState, User } from "../../redux/interfaces";
import {
  fetchAllPaychecks,
  fetchPaychecksByCuil,
  fetchUsers,
  loadUser,
  loadUserSalary,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";
import SalaryListEach from "./SalaryListEach";
import "../../styles/SalaryList.css";
// import { mapFinderOptions } from "sequelize/types/utils";
import axios from "axios";
import { URL_API } from "../../env";
import Calculator from "../Calculator";

export default function SalaryList(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buttonText, setbuttonText] = React.useState("Ver mas +");
  const [userCuil, setuserCuil] = React.useState("");
  const [closebutton, setclosebutton] = React.useState("Cerrar");

  const [cuils, setcuils] = React.useState<string[]>([]);

  //-------------------------------------------------------------------------------------------
  const paychecksByCuil: any[] = useSelector((state: any) => {
    return state.salaryState.paychecksByCuil;
  });
  const loadedUsersFromStore = useSelector((state: any) => {
    return state.usersState.users;
  });

  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchAllPaychecks() as any);
    dispatch(fetchPaychecksByCuil() as any);
    dispatch(fetchUsers() as any);
  }, []);

  useEffect(() => {
    setLoadedUsers(
      loadedUsersFromStore.map((obj: any) => ({ ...obj, show: false }))
    );
  }, [loadedUsersFromStore, paychecksByCuil]);

  function indexHandler(e: any) {
    console.log(e.target.value);
    setIndex(Number(e.target.value));
  }
  const [index, setIndex] = useState(1);

  //-------------------------------------------------------------------------------------------

  const handleFilter = (e: string) => {
    setSearchParams({ filter: e });
    setIndex(1);
  };

  const ChangeClass = (event: any, cuil: string) => {
    console.log("userCuil: ", cuil, "valor del evento: ", event.target.value);
    if (event.target.value === "Ver mas +") {
      setuserCuil(cuil);
      setLoadedUsers(
        loadedUsersFromStore.map((user: any) => {
          if (user.cuil == cuil) user.show = true;
          return user;
        })
      );
    } else {
      setuserCuil("");
      setLoadedUsers(
        loadedUsersFromStore.map((user: any) => {
          if (user.cuil == cuil) user.show = false;
          return user;
        })
      );
    }
  };

  const date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  var [today, settoday] = React.useState(yyyy + "-" + mm + "-" + dd);

  var month = ("0" + (date.getMonth() + 1)).slice(-2);

  var dateToSearch = date.getFullYear() + month;

  const [selected_date, setselected_date] = React.useState(dateToSearch);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var split = e.target.value.split("-");
    setselected_date(split[0] + split[1]);
    settoday(e.target.value);
    console.log(e.target.value.split("-"));
    cuils.splice(0, cuils.length);
  };

  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Salarios</h1>
      </div>
      <Filters />
      {/* <input
        type="date"
        id="datepicker"
        value={today}
        onChange={changeHandler}
      ></input> */}

      <div className="userlist-search-container">
        <h4 className="search-h4">Busqueda por nombre</h4>
        <input
          className="form-control"
          type="text"
          value={filter}
          placeholder="Buscar"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button className="salary-button">
          <Calculator></Calculator>
        </button>
      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th data-type="numeric">
                <span className="resize-handle">Cuil</span>
              </th>
              <th data-type="any">
                Detalles <span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                N y A<span className="resize-handle"></span>
              </th>

              <th data-type="text-short">
                Salario base<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                No Remunerativos<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Dias de Ausencia<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Deducciones por Ausencias<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Deducciones por Sindicato<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Salario total<span className="resize-handle"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loadedUsers
              .filter((user: User) => {
                if (!filter) return true;
                const Fullname =
                  user.name.toLowerCase() + " " + user.lastName.toLowerCase();
                const ReverseFullname =
                  user.lastName.toLowerCase() + " " + user.name.toLowerCase();
                return Fullname.includes(filter.toLocaleLowerCase())
                  ? user
                  : ReverseFullname.includes(filter.toLocaleLowerCase())
                  ? user
                  : false;
              })
              .filter(
                (e: any, i: number) => index * 10 - 10 <= i && i < index * 10
              )
              ?.map((user: any) => {
                return (
                  <>
                    <tr>
                      <td>{user.cuil}</td>{" "}
                      <td>
                        <button
                          id="userlist-button"
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            ChangeClass(event, user.cuil);
                          }}
                          value={
                            userCuil === user.cuil ? closebutton : buttonText
                          }
                        >
                          {userCuil === user.cuil ? closebutton : buttonText}
                        </button>
                      </td>
                      <td>
                        {user.name} {user.lastName}
                      </td>
                      {paychecksByCuil?.map((userPaychecks) => {
                        return userPaychecks[0]?.userCuil === user.cuil ? (
                          <>
                            <td>
                              $
                              {userPaychecks
                                .reduce((acc: number, pay: any) => {
                                  return acc + Number(pay.baseWage$);
                                }, 0)
                                .toFixed(2)}
                            </td>
                            <td>
                              $
                              {userPaychecks.reduce((acc: number, pay: any) => {
                                return acc + Number(pay.additionals$);
                              }, 0)}
                            </td>
                            <td>
                              {userPaychecks.reduce((acc: number, pay: any) => {
                                return (
                                  acc +
                                  Number(pay.unexcusedAbsences) +
                                  Number(pay.excusedAbsences)
                                );
                              }, 0)}
                            </td>
                            <td>
                              $
                              {userPaychecks.reduce((acc: number, pay: any) => {
                                return acc + Number(pay.absencesDeductions$);
                              }, 0)}
                            </td>
                            <td>
                              $
                              {userPaychecks
                                .reduce((acc: number, pay: any) => {
                                  return acc + Number(pay.unionDeductions$);
                                }, 0)
                                .toFixed(2)}
                            </td>
                            <td>
                              $
                              {userPaychecks
                                .reduce((acc: number, pay: any) => {
                                  return acc + Number(pay.totalAmount);
                                }, 0)
                                .toFixed(2)}
                            </td>
                          </>
                        ) : (
                          <></>
                        );
                      })}
                    </tr>
                    <td colSpan={8}>
                      <div className="subList">
                        {paychecksByCuil?.map((userPaychecks) => {
                          return userPaychecks[0]?.userCuil === user.cuil &&
                            user.show ? (
                            <SalaryListEach array={userPaychecks} />
                          ) : null;
                        })}
                      </div>
                    </td>
                  </>
                );
              })}
          </tbody>
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
              <button
                className="page-link"
                value={index}
                onClick={indexHandler}
              >
                {index}
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={(e) => setIndex(index + 1)}
                disabled={
                  index === Math.ceil(loadedUsers?.length / 10) ||
                  !loadedUsers?.length
                }
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                disabled={!loadedUsers?.length}
                onClick={() => setIndex(Math.ceil(loadedUsers?.length / 10))}
              >
                Ultimo
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
