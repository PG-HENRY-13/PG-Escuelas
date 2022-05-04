import React from "react";
import { StoreState, User, JobsStoreState } from "../../redux/interfaces";
import "../../styles/UserInfo.css";
import { fetchUsers } from "../../redux/actions";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { filterRoles, filterJobs, fetchJobs } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FilterUser(): JSX.Element {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (e: string) => {
    setSearchParams({ role: e });
    dispatch(filterRoles(e) as any);
  };

  const handleFilterJobs = (e: string) => {
    setSearchParams({ job: e });
    dispatch(filterJobs(e) as any);
  };

  const jobs = useSelector((state: any) => {
    const jobs = state.jobsState.jobs;
    return jobs;
  });

  return (
    <div>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="">Todos</option>
        <option value="admin">Admin</option>
        <option value="empleado">Empleado</option>
        <option value="gerente">Gerente</option>
      </select>
      <select onChange={(e) => handleFilterJobs(e.target.value)}>
        <option value="">Todos</option>
        {jobs.map((jobs: any) => {
          return <option value={jobs.id}>{jobs.name}</option>;
        })}
      </select>
    </div>
  );
}
