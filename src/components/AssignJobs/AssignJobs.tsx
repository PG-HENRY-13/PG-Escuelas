import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Action } from "redux";
import {
  assignJobToUser,
  deleteUsers,
  fetchJobs,
  fetchUsers,
} from "../../redux/actions";
import { Job, StoreState, User } from "../../redux/interfaces";
import "../../styles/AssingJobs.css"


export default function AssignJobs(): JSX.Element {
  const dispatch = useDispatch();
  const loadedUser = useSelector((state: any) => {
    return state.usersState.user;
  });
  const jobs = useSelector((state: any) => {
    return state.jobsState.jobs;
  });

  const [input, setInput] = useState({
    cuil: "",
    jobId: jobs[0].id,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   console.log("usefect");
  //   dispatch(fetchJobs() as any);
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      <div className="form-jobs">
        <br />
        <label className='jobs-label'>Asignando cargos a {loadedUser.name}</label>
        <div className="form-select-container">
        <select className="form-select" onChange={changeHandler} name="jobId" id="job">
          {jobs.map((job: Job) => {
            return <option value={job.id}>{job.name}</option>;
          })}
        </select>
        </div>
      <br />
      
      <div className="button-container">
      <button
        className="button"
        onClick={(e) => {
          dispatch(assignJobToUser(loadedUser.cuil, input.jobId) as any);
        }}
      >
        Asignar Cargo
      </button>
      </div>
      </div>
    </div>
  );
}
