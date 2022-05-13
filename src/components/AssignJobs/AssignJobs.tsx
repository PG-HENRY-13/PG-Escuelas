import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignJobToUser, updateFormUser } from "../../redux/actions";
import { Job, StoreState, User } from "../../redux/interfaces";
import { JobAssing } from "../../redux/interfaces";
import "../../styles/AssignJobs.css";
export default function AssignJobs(props: JobAssing): JSX.Element {
  const dispatch = useDispatch();

  const loadedUser = useSelector((state: any) => {
    return state.usersState.userForm;
  });
  const jobs = useSelector((state: any) => {
    return state.jobsState.jobs;
  });

  const [input, setInput] = useState({
    name: jobs[0].name,
    id: jobs[0].id,
  });

  useEffect(() => {}, [input]);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setInput({
      name: e.target.value.split(",")[0],
      id: e.target.value.split(",")[1],
    });
  };

  return (
    <div>
      <div className="form-container-jobs">
        <br />
        <label className="na-title">Asignando cargos a {props.name}</label>
        <select
          className="form-select"
          onChange={changeHandler}
          name="jobId"
          id="job"
        >
          {jobs.map((job: Job) => {
            return <option value={[job.name, job.id]}>{job.name}</option>;
          })}
        </select>
      </div>
      <br />
      <button
        className="button"
        onClick={(e) => {
          let tempJobs = [...loadedUser.jobs];
          if (tempJobs.filter((j) => j.id === input.id).length > 0)
            alert("El usuario ya posee este trabajo");
          else {
            dispatch(
              updateFormUser({
                ...loadedUser,
                jobs: [...loadedUser.jobs, input],
              })
            );
            props.setDisabled();

          }
        }}
      >
        Asignar Cargo
      </button>
      <div>
        {loadedUser.jobs?.map((job: Job) => {
          return (
            <div>
              <span>{job.name}</span>
              <button
                className="button"
                name={job.name}
                value={job.id}
                hidden={!props.removableJobs}
                onClick={(e) => {
                  let tempJobs = [...loadedUser.jobs];
                  return dispatch(
                    updateFormUser({
                      ...loadedUser,
                      jobs: tempJobs.filter((j) => j.id !== job.id),
                    })
                  );
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
