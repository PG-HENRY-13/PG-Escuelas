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
import { loadUserAuth } from "../redux/actions/authActions";
import { stat } from "fs";
import UpdateMyInfo from "./UpdateMyInfo";
import Calculator from "./Calculator";
import FormContainer from "./ContingencyForms/FormContainer";
import SalaryList from "./SalaryList";
import ForgotPwd from "./ForgotPwd";
import ResetPwd from "./ResetPwd";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "react-toastify/dist/components";
import ContingenciesRecord from "./ContingenciesRecord";
import Paychecks from "./PayChecks";
import ContactForm from "./ContactForm";

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const userLogged = useSelector((state: any) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUserAuth() as any);
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPwd />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPwd />} />
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
            <Route
              path="paychecks"
              element={
                <div className="container">
                  <Paychecks />
                </div>
              }
            />
            <Route
              path="contact"
              element={
                <div className="container">
                  <ContactForm />
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
              path="contingencies/pending"
              element={
                <div className="container">
                  <ContingencyList />
                </div>
              }
            />
            <Route
              path="contingencies/record"
              element={
                <div className="container">
                  <ContingenciesRecord />
                </div>
              }
            />
            <Route
              path="contingencies/create"
              element={
                <div className="container">
                  <FormContainer />
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
            <Route
              path="salary"
              element={
                <div className="container">
                  <SalaryList />
                </div>
              }
            />
          </Route>
        ) : null}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

//ContingencyList
