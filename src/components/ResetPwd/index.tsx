import axios from "axios";
import { URL_API } from "../../env";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchUser, userUpdate } from "../../redux/actions";
import { loadUserAuth, signIn } from "../../redux/actions/authActions";
import "../../styles/Login.css";
import validate from "../NewAccount/validate";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export default function ResetPwd(): JSX.Element {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.usersState.user);
  const [data, setData] = useState({
    password: "",
    password2: "",
  });

  const [error, setError] = useState({
    password: "Al menos 8 caracteres",
    password2: "Al menos 8 caracteres",
  });

  useEffect(() => {
    id && dispatch(fetchUser(id) as any);
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    axios
      .get(`${URL_API}login/resetpassword/${id}/${token}`)
      .then((response) => {
        axios
          .put(`${URL_API}login/changepwd`, {
            cuil: user.cuil,
            password: data.password,
          })
          .then((response) => {
            toast.success('Contraseña cambiada correctamente')
          })
          .catch((error) => {
            toast.error('Ocurrió un error al cambiar contraseña')
          });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-container-inside">
        <h2 className="text-center">Cree una nueva contraseña</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">
              Ingrese contraseña nueva:{" "}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <span className="err">{error.password}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Repita la contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              onChange={handleChange}
            />
            <span className="err">{error.password2}</span>
          </div>

          <button type="submit" className="button">
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}
