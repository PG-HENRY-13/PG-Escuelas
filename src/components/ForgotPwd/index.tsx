import axios from "axios";
import { URL_API } from "../../env";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loadUserAuth, signIn } from "../../redux/actions/authActions";
import "../../styles/Login.css";
import validate from "../NewAccount/validate";
import { toast } from "react-toastify";

export default function ForgotPwd(): JSX.Element {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.authState);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    cuil: "",
  });

  const [error, setError] = useState({
    cuil: "Ingrese un Cuil valido",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    axios
      .post(`${URL_API}login/forgotpwd`, { cuil: data.cuil })
      .then((response) => {
        toast.success('Correo enviado, revise su casilla');
        navigate('/')
      })
      .catch((error) => {
        var sp = document.getElementById("otro");
        if (sp) sp.innerHTML = 'Ingrese el CUIL correcto';
      });
  };

  return (
    <div className="login-container">
      <div className="login-container-inside">
        <h2 className="text-center">ACCESO CON CUIL</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">
              Ingrese número de CUIL:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="cuil"
              name="cuil"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <span className="err">{error.cuil}</span>
            <span id="otro"></span>
          </div>
          <div className="container mt-5">
            <button type="submit" className="btn btn-dark w-50">
              Enviar
            </button>
            <button type="button" className="btn btn-dark w-50" onClick={(e)=>{navigate('/')}}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
