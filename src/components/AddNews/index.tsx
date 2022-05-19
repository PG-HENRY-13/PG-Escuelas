import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { URL_API } from "../../env";
import validate from "../NewAccount/validate";
import "../../styles/Contact.css";
import News from "../News";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

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
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center h-100 ">
          <div className="col col-lg-9 mb-4 mb-lg-0 ">
            <div className="card m-3 shadow-lg ">
              <div className="row g-0 ">
                <div
                  className="col-md-4 gradient-custom text-center mb-0 p-4"
                  style={{ backgroundColor: "#728187" }}
                >
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    size="5x"
                    className="img-fluid my-5"
                  />

                  <div></div>
                </div>

                <div
                  className="col-md-8"
                  style={{ backgroundColor: "#faf9f9" }}
                >
                  <div className="card-body p-4">
                    <form
                      className="mt-0 mb-4"
                      id="miForm"
                      onSubmit={handleOnSubmit}
                    >
                      <div className="row">
                        <div className="card-body p-3">
                          <h4 className="form-label fs-2">Crear novedades</h4>
                          <hr className="mt-0 mb-4" />
                          <label className="form-label fs-4 ">Título</label>
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
                          <label className="form-label fs-4 ">Texto</label>
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
                            className="btn btn-dark p-3 mt-4"
                            name="submitButton"
                            type="submit"
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        <News />
      </div>
    </section>
  );
}
