import React, { useEffect } from "react";
import "../../styles/UserList.css";
import { fetchContingencies } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContingencyItem from "./contingencyItem";
import { Contingency } from "../../redux/interfaces";

export default function ContingencyList(): JSX.Element {
  const dispatch = useDispatch();
  const loadedContingencies = useSelector((state: any) => {
    return state.usersState.contingencies;
  });

  useEffect(() => {
    dispatch(fetchContingencies() as any);
  }, []);
  useEffect(() => {
    console.log(loadedContingencies);
  }, [loadedContingencies]);

  return (
    <div className="userlist-filter-container">
      <div>
        <h1>Listado de contingencias</h1>
        {loadedContingencies.length ? (
          <div>
            {loadedContingencies?.map((e: any) => {
              console.log(e);
              return (
                <ContingencyItem
                  fullName={
                    e.userJob?.userData.name +
                    " " +
                    e.userJob?.userData.lastName
                  }
                  reason={e.reason}
                  contingencyType={e.contingencyType}
                  date={e.date}
                  CID={e.id}
                  state={e.state}
                  hasNotice={e.hasNotice}
                  job={e.userJob?.jobData.name}
                  substitute={e.substitute}
                  endDate={e.endDate}
                  hours={e.hoursNumber}
                ></ContingencyItem>
              );
            })}
          </div>
        ) : (
          <div className="na-title">
            <h3>Sin contingencias que atender</h3>
          </div>
        )}
      </div>
    </div>
  );
}
