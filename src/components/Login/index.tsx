import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loadUserAuth, signIn } from "../../redux/actions/authActions";
import "../../styles/Login.css";
import validate from "../NewAccount/validate";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.authState);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    cuil: "",
    password: "",
  });

  const [error, setError] = useState({
    cuil: "Ingrese un Cuil valido",
    password: "Al menos 8 caracteres",
  });

  useEffect(() => {
    if (auth.userLoded) {
      if (auth.role === "admin") navigate("/admin");
      else navigate("/user");
    }
  })
  const handleChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(signIn(data) as any);
    dispatch(loadUserAuth() as any);
    console.log (auth)
   
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
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
            />
            <span className="err">{error.password}</span>
          </div>

          <button type="submit" className="button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
