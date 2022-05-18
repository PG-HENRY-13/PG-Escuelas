import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EMAIL_SUPPORT, URL_API } from "../../env";
import validate from "../NewAccount/validate";
import "../../styles/Contact.css";

export default function ContactForm(): JSX.Element {
  const userLogged = useSelector((state: any) => state.authState);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    name: userLogged.name,
    emailAddress: userLogged.email,
    message: "",
  });
  const [error, setError] = useState({
    name: "El nombre debe tener 2 a 12 caracteres",
    emailAddress: "Ingrese un email válido",
    message: "Debe ingresar un mensaje",
  });

  useEffect(() => {
    if (error.name || error.emailAddress || error.message) setDisabled(true);
    else setDisabled(false);
  }, [error]);

  const handleChanges = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(`${URL_API}mail`);
    axios
      .post(`${URL_API}mail`, {
        mail: EMAIL_SUPPORT,
        type: "contact_from_user",
        body: `
      Nombre: ${data.name} 
      Email: ${data.emailAddress}
      Mensaje: ${data.message}`,
      })
      .then((response) => {
        toast.success("Mensaje enviado correctamente");
      })
      .catch((err) => {
        toast.error("Ocurrió un error al enviar el email");
      });
    setData({ ...data, message: "" });
  };

  return (
    <div
      className="container w-50 py-4 card mt-3 shadow-lg"
      style={{ backgroundColor: "#283845" }}
    >
      {/* <!-- Bootstrap 5 starter form --> */}
      <form
        name="contactForm"
        // data-sb-form-api-token="API_TOKEN"
        onSubmit={handleOnSubmit}
      >
        {/* <!-- Name input --> */}
        <div className="mb-3">
          <label className="form-label fs-2 text-uppercase ">Mi nombre</label>
          <input
            onChange={handleChanges}
            className="form-control  w-75 mx-auto"
            name="name"
            type="text"
            placeholder={data.name}
            value={data.name}
            disabled
          />
          <div className="invalid-feedback" data-sb-feedback="name:required">
            El nombre es requerido.
          </div>
        </div>

        {/* <!-- Email address input --> */}
        <div className="mb-3 ">
          <label className="form-label fs-2 text-uppercase">E-mail</label>
          <input
            onChange={handleChanges}
            value={data.emailAddress}
            className="form-control w-75 mx-auto"
            name="emailAddress"
            type="email"
            placeholder="Email Address"
            disabled
          />
          <div
            className="invalid-feedback"
            data-sb-feedback="emailAddress:required"
          >
            El email es requeridO.
          </div>
          <div className="invalid-feedback ">El email es inválido</div>
        </div>

        {/* <!-- Message input --> */}
        <div className="mb-3">
          <label className="form-label fs-2 text-uppercase">Mensaje</label>
          <textarea
            onChange={handleChanges}
            value={data.message}
            className="form-control w-75 mx-auto"
            name="message"
            placeholder="Message"
          ></textarea>
          <div className="invalid-feedback" data-sb-feedback="message:required">
            El mensaje es requerido
          </div>
        </div>

        {/* <!-- Form submissions success message --> */}
        <div className="d-none" id="submitSuccessMessage">
          <div className="text-center mb-3">
            El mensaje fue enviado correctamente
          </div>
        </div>

        {/* <!-- Form submissions error message --> */}
        <div className="d-none" id="submitErrorMessage">
          <div className="text-center text-danger mb-3">
            Error al enviar el mensaje
          </div>
        </div>

        {/* <!-- Form submit button --> */}
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
  );
}
