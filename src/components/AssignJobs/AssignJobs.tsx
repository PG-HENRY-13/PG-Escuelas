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

  // useEffect(() => {
  //   console.log("usefect");
  //   dispatch(fetchJobs() as any);
  //   // eslint-disable-next-line
  // }, []);

  console.log("jobs es el state, ", jobs);

  return (
    <div>
      <select name="job" id="job">
        {jobs.map((job: Job) => {
          return <option value="job.id">{job.name}</option>;
        })}
      </select>
      <button
        onClick={(e) => dispatch(assignJobToUser(loadedUser.user, 12) as any)}
      >
        Assign Job
      </button>
    </div>
  );
}
