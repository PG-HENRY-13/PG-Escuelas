import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutAdmin from "./Layouts";
import Login from "./Login";
import NewAccount from "./NewAccount";
import UpdateUser from "./UpdateUser";
import UserInfo from "./UserInfo";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/admin' element={<LayoutAdmin/>}>
        <Route
          index
          element={
            <>
              <UserInfo />
            </>
          }
        />
        <Route path="createuser" element={<NewAccount />} />
        <Route path="updateuser" element={<UpdateUser />} />
        <Route path="userlist" element={<UserInfo />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
