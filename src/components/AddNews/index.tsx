import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { URL_API } from "../../env";
import validate from "../NewAccount/validate";
import "../../styles/Contact.css";
import News from "../News";

export default function AddNews(): JSX.Element {
  const userLogged = useSelector((state: any) => state.authState);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    name: userLogged.name,
    title: "",
    text: "",
  });
  const [error, setError] = useState({
    name: "El nombre debe tener 2 a 12 caracteres",
    title: "Ingrese un título válido",
    text: "Debe ingresar un mensaje",
  });

  useEffect(() => {
    if (error.name || error.title || error.text) setDisabled(true);
    else setDisabled(false);
  }, [error]);

  const handleChanges = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(`${URL_API}news`);
    axios
      .post(`${URL_API}news`, {
        cuil: userLogged.id,
        title: data.title,
        text: data.text,
      })
      .then((response) => {
        toast.success("Novedad creada correctamente");
      })
      .catch((err) => {
        toast.error("Ocurrió un error al crear la news");
      });
    setData({ ...data, text: "" });
  };

  return (
    <div>
      <div
        className="container w-50 py-4 card mt-3 shadow-lg"
        style={{ backgroundColor: "#B8B08D" }}
      >
        <label className="form-label fs-2 text-uppercase ">Crear novedades</label>
        <form name="contactForm" onSubmit={handleOnSubmit}>
          <div className="mb-3 ">
            <label className="form-label fs-4 text-uppercase">Título</label>
            <input
              onChange={handleChanges}
              value={data.title}
              className="form-control w-75 mx-auto"
              name="title"
              type="text"
              placeholder="Título"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fs-4 text-uppercase">Texto</label>
            <textarea
              onChange={handleChanges}
              value={data.text}
              className="form-control w-75 mx-auto"
              name="text"
              placeholder="Texto"
            ></textarea>
          </div>
          <div className="d-none" id="submitSuccessMessage">
            <div className="text-center mb-3">
              El mensaje fue enviado correctamente
            </div>
          </div>
          <div className="d-none" id="submitErrorMessage">
            <div className="text-center text-danger mb-3">
              Error al enviar el mensaje
            </div>
          </div>
          <div className="d-grid">
            <button
              disabled={disabled}
              className="btn btn-light btn-lg w-75 mx-auto mb-3"
              name="submitButton"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
        <News/>
    </div>
  );
}
