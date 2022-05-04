import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignJobToUser } from "../../redux/actions";
import { Job, StoreState, User } from "../../redux/interfaces";
import { JobAssing } from "../../redux/interfaces";

export default function AssignJobs(props: JobAssing): JSX.Element {
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

  return (
    <div>
      <div className="form-group">
        <br />
        <label className="col-sm-2 control-label">
          Asignando cargos a {props.name}
        </label>
        <select onChange={changeHandler} name="jobId" id="job">
          {jobs.map((job: Job) => {
            return <option value={job.id}>{job.name}</option>;
          })}
        </select>
      </div>
      <br />
      <button
        onClick={(e) => {
          dispatch(assignJobToUser(props.cuil, input.jobId) as any);
        }}
      >
        Asignar Cargo
      </button>
    </div>
  );
}
