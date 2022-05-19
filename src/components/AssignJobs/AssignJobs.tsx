import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
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

  useEffect(() => {
    // console.log(input);
  }, [input]);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setInput({
      name: e.target.value.split(",")[0],
      id: e.target.value.split(",")[1],
    });
  };

  return (
    <div className="row g-3">
      <div className="form-floating  col-md-4">
        <div className="form-floating">
          <select
            className="form-select"
            defaultValue="otro"
            onChange={changeHandler}
            name="jobId"
            id="job"
          >
            {jobs.map((job: Job) => {
              return <option value={[job.name, job.id]}>{job.name}</option>;
            })}
          </select>
          <label htmlFor="floatingSelectGrid">Asignar cargos</label>
        </div>
        <button
          className="btn btn-dark p-3 col-md-12"
          onClick={(e) => {
            e.preventDefault();
            let tempJobs = [...loadedUser.jobs];
            if (tempJobs.filter((j) => j.id === input.id).length > 0)
              toast.error("El usuario ya posee este trabajo");
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
      </div>
      <div className="form-floating  col-md-7 list-container-jobs">
        <ul className="list-group-light">
          {loadedUser.jobs?.map((job: Job) => {
            return (
              <div className="row g-2">
                <div className="form-floating  col-md-11">
                  <li className="list-group-item">{job.name}</li>
                </div>
                <div className="form-floating  col-md-1">
                  <button
                    className="btn-danger btn btn-xs btn-default"
                    name={job.name}
                    value={job.id}
                    hidden={!props.removableJobs}
                    onClick={(e) => {
                      e.preventDefault();
                      let tempJobs = [...loadedUser.jobs];
                      return dispatch(
                        updateFormUser({
                          ...loadedUser,
                          jobs: tempJobs.filter((j) => j.id !== job.id),
                        })
                      );
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="col-md-12">
        {/* <button
          className="btn-dark"
          onClick={(e) => {
            e.preventDefault();
            let tempJobs = [...loadedUser.jobs];
            if (tempJobs.filter((j) => j.id === input.id).length > 0)
              toast.error("El usuario ya posee este trabajo");
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
        </button> */}
      </div>
    </div>
  );
}
