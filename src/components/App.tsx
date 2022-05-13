import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import AssignJobs from "./AssignJobs/AssignJobs";
import LayoutAdmin from "./Layouts";
import LoadUsersWithExcel from "./LoadUsersWithExcel";
import LayoutEmployee from "./LayoutEmployee";
import Login from "./Login";
import NewAccount from "./NewAccount";
import News from "./News";
import UpdateUser from "./UpdateUser";
import UploadExcelFile from "./UploadExcelFile";
import UserDetails from "./UserDetails";
import UserList from "./UserList";
import AbsenceForm from "./ContingencyForms/AbsenceForm";
import ScheduleForm from "./ContingencyForms/ScheduleForm";
import ContingencyList from "./ContingencyList";
import UserSalary from "./UserSalary";
import Paycheck from "./Paycheck";
import { ToastContainer } from "react-toastify";
import { loadUserAuth } from "../redux/actions/authActions";
import { stat } from "fs";
import UpdateMyInfo from "./UpdateMyInfo";
import Calculator from "./Calculator";

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const userLogged = useSelector((state: any) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUserAuth() as any);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {userLogged.role === "empleado" ? (
        <Route path="/user" element={<LayoutEmployee />}>
          <Route index element={<News />} />
          <Route
            path=":cuil"
            element={
              <div className="container">
                <UserDetails />
              </div>
            }
          />
          <Route
            path={"updateuser/" + userLogged.id}
            element={
              <div className="container">
                <UpdateMyInfo />
              </div>
            }
          />
          <Route
            path="absenceReport"
            element={
              <div className="container">
                <AbsenceForm />
              </div>
            }
          />
          <Route path="reschedule" element={<ScheduleForm />} />
          <Route path="news" element={<News />} />
          <Route
            path="paycheck"
            element={
              <div className="container">
                <Paycheck />
              </div>
            }
          />
        </Route>
      ) : null}
      {userLogged.role === "admin" ? (
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
            path="excel/upload"
            element={
              <div className="container login-container login-container-900">
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
                <Calculator />
              </div>
            }
          />
          <Route
            path="contingencies"
            element={
              <div className="container">
                <ContingencyList />
              </div>
            }
          />
          <Route
            path="salary/:cuil"
            element={
              <div>
                <UserSalary />
              </div>
            }
          />
        </Route>
      ) : null}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

//ContingencyList
