import React, { useEffect } from "react";
import "../../styles/UserList.css";
import { fetchContingencies } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContingencyItem from "./contingencyItem";

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
              return (
                <ContingencyItem
                  fullName={e.fullName}
                  reason={e.reason}
                  contingencyType={e.contingencyType}
                  date={e.date}
                  CID={e.id}
                ></ContingencyItem>
              );
            })}
          </div>
        ) : (
          <h3>Sin contingencias que atender</h3>
        )}
      </div>
    </div>
  );
}
