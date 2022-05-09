import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import AssignJobs from "./AssignJobs/AssignJobs";
import LayoutAdmin from "./Layouts";
import LoadUsersWithExcel from "./LoadUsersWithExcel";
import Login from "./Login";
import NewAccount from "./NewAccount";
import News from "./News";
import UpdateUser from "./UpdateUser";
import UploadExcelFile from "./UploadExcelFile";
import UserDetails from "./UserDetails";
import UserList from "./UserList";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<News />} />
        <Route
          path="createuser"
          element={
            <div className="container">
              <NewAccount />
            </div>
          }
        />
        <Route
          path="updateuser/:cuil"
          element={
            <div className="container">
              <UpdateUser />
            </div>
          }
        />
        <Route
          path="userlist/:cuil"
          element={
            <div className="container">
              <UserDetails />
            </div>
          }
        />
        <Route
          path="waging/upload"
          element={
            <div className="container">
              <UploadExcelFile />
              <LoadUsersWithExcel />
            </div>
          }
        />
        <Route
          path="userlist"
          element={
            <div className="container">
              <UserList />
            </div>
          }
        />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
