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
      <p>Asignando cargos a {loadedUser.name}</p>
      <select onChange={changeHandler} name="jobId" id="job">
        {jobs.map((job: Job) => {
          return <option value={job.id}>{job.name}</option>;
        })}
      </select>
      <button
        onClick={(e) => {
          console.log("despachando con ", loadedUser.cuil, " y ", input.jobId);
          dispatch(assignJobToUser(loadedUser.cuil, input.jobId) as any);
        }}
      >
        Assign Job
      </button>
    </div>
  );
}
