import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import { fetchUsers, loadUser, loadUserSalary } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";
import SalaryListEach from "./SalaryListEach";
import "../../styles/SalaryList.css"
import { mapFinderOptions } from "sequelize/types/utils";

export default function SalaryList(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buttonText, setbuttonText] = React.useState("Ver mas +");
  const [userCuil, setuserCuil] = React.useState("");
  const [closebutton, setclosebutton] = React.useState("Cerrar");
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

  const month = new Date().getMonth()
  console.log(month)

  var array =[
    {
        jobId: 1012,
        jobName: "profe",
        baseWage$: 50070,
        additionals$: 14881.98,
        seniority$: 0,
        overTimeAdditionals$: 0,
        absencesDeductions$: 0,
        underTimeDeductions$: 0,
        unionDeductions$: 1001.4,
        baseWageCode: 100,
        underTimeDeductionsCode: 3779,
        absencesDeductionsCode: 1226
    },
    {
        jobId: 1013,
        jobName: "profe inicial",
        baseWage$: 53574.89444444444,
        additionals$: 14881.985555555,
        seniority$: 0,
        overTimeAdditionals$: 0,
        absencesDeductions$: 0,
        underTimeDeductions$: 0,
        unionDeductions$: 1071.49,
        baseWageCode: 107,
        underTimeDeductionsCode: 3779,
        absencesDeductionsCode: 219
    },
    {
        jobId: 1014,
        jobName: "profe primario",
        baseWage$: 53574.89,
        additionals$: 15287.5955555555,
        seniority$: 0,
        overTimeAdditionals$: 0,
        absencesDeductions$: 0,
        underTimeDeductions$: 0,
        unionDeductions$: 1071.49,
        baseWageCode: 107,
        underTimeDeductionsCode: 3779,
        absencesDeductionsCode: 219
    }
  ]



  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Salarios</h1>
      </div>
      <Filters />
      <div className="userlist-search-container">
        <h4 className="search-h4">Busqueda por nombre</h4>
        <input
          className="form-control"
          type="text"
          value={filter}
          placeholder="Buscar"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button className="salary-button">CALCULAR SALARIO BULK</button>
        </div>
        
     
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
            {/* ACA VAN TODOS LOS DATOS A MOSTRAR */}
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
            .map((e: any) => {
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
                    
                    
                    <td>20202</td>
                    <td>10202</td>
                    <td>816</td>
                    <td>14162</td>
                    <td>84626</td>
                  </tr>

                  <td colSpan={8}>
            
                    <div className="subList">
                      {userCuil === e.cuil ? <SalaryListEach array={array} /> : null}
                    </div>
                    
                  </td>
                  
                </>
                
              );
           
            })}
            
        </tbody>
      </table>
    </div>
  );
}
