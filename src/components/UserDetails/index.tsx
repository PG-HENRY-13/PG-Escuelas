import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteUsers, fetchUser, userUpdate } from "../../redux/actions";
import { useState, useEffect } from "react";
import validate from "../NewAccount/validate";

export default function UserDetails(): JSX.Element {
  let today = new Date();
  let date =
    today.getFullYear().toString().padStart(4, "0") +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const dispatch = useDispatch();
  const userToUpdate = useSelector((state: any) => {
    return state.usersState.user;
  });

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    cuil: "",
    name: "",
    lastName: "",
    password: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "otro",
    role: "empleado",
    seniorityDate: date,
  });

  const [error, setError] = React.useState({
    cuil: "Ingrese un Cuil valido",
    name: "Ingrese un nombre",
    lastName: "Ingrese un apellido",
    password: "Al menos 8 caracteres",
    address: "Ingrese una direccion",
    phoneNumber: "Ingrese un numero valido",
    emailAddress: "Ingrese una direccion de correo valida",
  });

  useEffect(() => {
    if (
      error.cuil ||
      error.name ||
      error.lastName ||
      error.password ||
      error.address ||
      error.phoneNumber ||
      error.emailAddress
    )
      setDisabled(true);
    else setDisabled(false);
  }, [error]);

  useEffect(() => {
    setData(userToUpdate);
  }, [userToUpdate]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(userUpdate(data) as any);
  }

  const handlerClickSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (data.cuil) {
      dispatch(fetchUser(data.cuil) as any);
      setDisabled(false);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={submit}>
        <div>
          <label>Cuil:</label>
          <input name="cuil" value={data.cuil} onChange={changeHandler}></input>
          <span className="err">{error.cuil}</span>
          <button onClick={handlerClickSearch}>Consultar</button>
          <br></br>
          <label>Nombre:</label>
          <input name="name" value={data.name} onChange={changeHandler}></input>
          <span className="err">{error.name}</span>
          <br></br>
          <label>Apellido:</label>
          <input
            name="lastName"
            value={data.lastName}
            onChange={changeHandler}
          ></input>
          <span className="err">{error.lastName}</span>
          <br></br>
          <label>Contraseña:</label>
          <input
            name="password"
            value={data.password}
            onChange={changeHandler}
          ></input>
          <span className="err">{error.password}</span>
          <br></br>
          <label>Escalafon:{data.seniorityDate.split("T")[0]}</label>
          <input
            type="date"
            name="seniorityDate"
            value={data.seniorityDate}
            onChange={changeHandler}
          ></input>
          <br></br>
          <label>Direccion:</label>
          <input
            name="address"
            value={data.address}
            onChange={changeHandler}
          ></input>
          <span className="err">{error.address}</span>
          <br></br>
          <label>Numero de telefono:</label>
          <input
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={changeHandler}
          ></input>
          <span className="err">{error.phoneNumber}</span>
          <br></br>
          <label>eMail:</label>
          <input
            name="emailAddress"
            value={data.emailAddress}
            onChange={changeHandler}
          ></input>
          <span className="err">{error.emailAddress}</span>
          <br></br>
          <label>Genero: {data.gender}</label>
          <select
            name="gender"
            onChange={selectHandler}
            defaultValue={data.gender}
          >
            <option value={data.gender}>Elegir</option>
            <option value="otro">Sin especificar</option>
            <option value="fem">Femenino</option>
            <option value="masc">Masculino</option>
          </select>
          <br></br>
          <label>Rol: {data.role}</label>
          <select name="role" onChange={selectHandler} defaultValue={data.role}>
            <option value={data.role}>Elegir</option>
            <option value="empleado">Empleado</option>
            <option value="admin">Admin</option>
            <option value="gerente">Gerente</option>
          </select>
          <br></br>
          <button disabled={disabled} className="barBtn" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
