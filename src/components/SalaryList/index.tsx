import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import {
  fetchUsers,
  loadUser,
  loadUserSalary,
  fetchPaychecksPeriod,
  getGhostState,
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
  const date = new Date();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var dateToSearch = date.getFullYear() + month;
  const [selected_date, setselected_date] = React.useState(dateToSearch);


  const salarys = useSelector((state: any) => {
    return state.salaryState.paychecksPeriod;
  });


  const buttonActive = useSelector((state: any) => {
    return state.ghostState.value;
  });

  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });

  useEffect(() => {
    dispatch(fetchPaychecksPeriod(selected_date) as any);
    dispatch(getGhostState(false) as any);
  }, [selected_date, buttonActive]);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, []);

  const handleFilter = (e: string) => {
    setSearchParams({ filter: e });
  };

  const ChangeClass = (event: any, cuil: string) => {
    if (event.target.value === "Ver mas +") {
      setuserCuil(cuil);
    } else {
      setuserCuil("");
    }
  };

  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  var [today, settoday] = React.useState(yyyy + "-" + mm + "-" + dd);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var split = e.target.value.split("-");

    setselected_date(split[0] + split[1]);
    settoday(e.target.value);
  };

  

  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Salarios</h1>
      </div>
      <Filters />
      <input
        type="date"
        id="datepicker"
        value={today}
        onChange={changeHandler}
      ></input>

      <div className="userlist-search-container">
        <h4 className="search-h4">Busqueda por nombre</h4>
        <input
          className="form-control"
          type="text"
          value={filter}
          placeholder="Buscar"
          onChange={(e) => handleFilter(e.target.value)}
        />

        <Calculator></Calculator>
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
                Remunerativos<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                No Remunerativos<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Asignaciones<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Deducciones<span className="resize-handle"></span>
              </th>
              <th data-type="text-short">
                Salario Total<span className="resize-handle"></span>
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
              ?.map((e: any) => {
                return (
                  <>
                    <tr>
                      <td>{e.cuil}</td>{" "}
                      <td>
                        <button
                          className="btn bg-dark"
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            ChangeClass(event, e.cuil);
                          }}
                          value={userCuil === e.cuil ? closebutton : buttonText}
                        >
                          {userCuil === e.cuil ? closebutton : buttonText}
                        </button>
                      </td>
                      <td>
                        {e.name} {e.lastName}
                      </td>
                      
                      {salarys?.map((s: any,index:number,array:Array<any>) => {
                        array.reduce((a,i)=>{
                          if (s.userCuil === i.userCuil){

                          }
                        })
                        return (
                          
                          <>
                            {s.userCuil === e.cuil? (
                              
                              <>
                                <td>{s.additionals$}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </>
                            ) : null}
                          </>
                        );
                        
                      })}
                      
                    </tr>

                    <td colSpan={8}>
                      <div className="subList">
                        {salarys?.map((s: any) => {
                          return (
                            <>
                              {s.userCuil === e.cuil &&
                              userCuil === s.userCuil ? (
                                <>
                                  <SalaryListEach s={s} />
                                </>
                              ) : null}
                            </>
                          );
                        })}
                      </div>
                    </td>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
