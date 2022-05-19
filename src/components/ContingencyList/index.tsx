import React, { useEffect } from "react";
import "../../styles/UserList.css";
import { fetchContingencies } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContingencyItem from "./contingencyItem";
import { Contingency } from "../../redux/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ContingencyList(): JSX.Element {
  const dispatch = useDispatch();
  const loadedContingencies = useSelector((state: any) => {
    return state.usersState.contingencies;
  });

  useEffect(() => {
    dispatch(fetchContingencies() as any);
  }, []);
  useEffect(() => {
    // console.log(loadedContingencies);
  }, [loadedContingencies]);

  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center h-100 ">
          <div className="col col-lg-9 mb-4 mb-lg-0 ">
            <div className="card m-3 shadow-lg ">
              <div className="row g-0 ">
                <div
                  className="col-md-4 gradient-custom text-center mb-0 p-4"
                  style={{ backgroundColor: "#728187" }}
                >
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    size="5x"
                    className="img-fluid my-5"
                  />
                </div>
                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                <div className="userlist-filter-container">
                <div className="card-body p-3">
                    <h1>Contingencias pendientes</h1>
                    <hr className="mt-0 mb-4" />
                    {loadedContingencies.filter(
                      (e: any) => e.state === "Pendiente"
                    ).length ? (
                      <div>
                        {loadedContingencies?.map((e: any) => {
                          if (e.state === "Pendiente")
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
                        <h3>Sin contingencias por atender</h3>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
