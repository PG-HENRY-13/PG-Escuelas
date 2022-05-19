import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import { fetchUsers, loadUser, loadUserSalary } from "../../redux/actions";
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

  interface Provider {
    cuil: string;
    r: number;
    n: number;
    a: number;
    de: number;
    s: number;
    data: Array<{
      jobId: number;
      jobName: number;
      baseWage$: number;
      additionals$: number;
      seniority$: number;
      overTimeAdditionals$: number;
      absencesDeductions$: number;
      underTimeDeductions$: number;
      unionDeductions$: number;
      baseWageCode: number;
      underTimeDeductionsCode: number;
      absencesDeductionsCode: number;
    }>;
  }

  const [concept, setconcept] = React.useState([
    {
      cuil: "",
      r: 0,
      n: 0,
      a: 0,
      de: 0,
      s: 0,
      data: [
        {
          jobId: 0,
          jobName: 0,
          baseWage$: 0,
          additionals$: 0,
          seniority$: 0,
          overTimeAdditionals$: 0,
          absencesDeductions$: 0,
          underTimeDeductions$: 0,
          unionDeductions$: 0,
          baseWageCode: 0,
          underTimeDeductionsCode: 0,
          absencesDeductionsCode: 0,
        },
      ],
    },
  ]);

  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });

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

  const calculateHandler = (
    cuil: string,
    data: Array<{
      jobId: number;
      jobName: number;
      baseWage$: number;
      additionals$: number;
      seniority$: number;
      overTimeAdditionals$: number;
      absencesDeductions$: number;
      underTimeDeductions$: number;
      unionDeductions$: number;
      baseWageCode: number;
      underTimeDeductionsCode: number;
      absencesDeductionsCode: number;
      cuil?: string;
    }>
  ) => {
    if (!cuils.includes(cuil)) {
      let r = 0; //Remunerativos
      let n = 0; //No Remunerativos
      let a = 0; // Asignaciones
      let de = 0; // Deducciones
      let s = 0; // Salario total
      data?.map((d) => {
        r += Number(d.additionals$) + Number(d.overTimeAdditionals$);
        n += Number(d.unionDeductions$); //ESTE CALCULO NO ES CORRECTO
        a += Number(d.additionals$) + Number(d.overTimeAdditionals$); //ESTE CALCULO NO ES CORRECTO
        de +=
          Number(d.absencesDeductions$) +
          Number(d.underTimeDeductions$) +
          Number(d.underTimeDeductions$);
        s += Number(d.baseWage$);
      });
      s = r - n + a - de;
      concept.push({ cuil, r, n, a, de, s, data });
    }
  };

  const submitHandler = async (cuil: string) => {
    if (!cuils.includes(cuil)) {
      const result = await axios.get(
        `${URL_API}salary/${cuil}/${selected_date}`
      );

      let data = result.data;
      if (data.length) {
        calculateHandler(cuil, data);
        cuils.push(cuil);
      } else {
        concept.map((c, i) => {
          if (c.cuil === cuil) {
            concept.splice(i, 1);
          }
        });
      }
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

  function useForceUpdate() {
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var split = e.target.value.split("-");

    setselected_date(split[0] + split[1]);
    settoday(e.target.value);
    cuils.splice(0, cuils.length);
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
        <button className="salary-button" onClick={forceUpdate}>
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
                {
                  submitHandler(e.cuil);
                }
                return (
                  <>
                    <tr>
                      <td>{e.cuil}</td>{" "}
                      <td>
                        <button
                          id="userlist-button"
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
                      {concept?.map((c) => {
                        return (
                          <>
                            {c.cuil === e.cuil ? (
                              <>
                                <td>{c.r.toFixed(2)}</td>
                                <td>{c.n.toFixed(2)}</td>
                                <td>{c.a.toFixed(2)}</td>
                                <td>{c.de.toFixed(2)}</td>
                                <td>{c.s.toFixed(2)}</td>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      })}
                    </tr>

                    <td colSpan={8}>
                      <div className="subList">
                        {concept?.map((c) => {
                          return (
                            <>
                              {c.cuil === userCuil && c.cuil === e.cuil ? (
                                <>
                                  <SalaryListEach
                                    array={c.data}
                                    cuil={c.cuil}
                                  />
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
