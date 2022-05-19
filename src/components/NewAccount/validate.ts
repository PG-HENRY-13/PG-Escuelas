import { User, UserForm } from "../../redux/interfaces";

export default function validate(input: any) {
  let error: any = {};
  if (input.hasOwnProperty("cuil")) {
    if (
      !/^\d+$/.test(input.cuil) ||
      input.cuil.length > 11 ||
      input.cuil.length < 11
    )
      error.cuil = "Ingrese un Cuil valido";
  }
  var namePattern = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/;
  if (input.hasOwnProperty("name")) {
    if (!namePattern.test(input.name)) error.name = "Ingrese un nombre válido";
  }
  if (input.hasOwnProperty("lastName")) {
    if (!namePattern.test(input.lastName))
      error.lastName = "Ingrese un apellido válido";
  }
  if (input.hasOwnProperty("password")) {
    if (input.password.length < 5)
      error.password = "Contraseña demasiado corta";
    else if (input.password.length > 12)
      error.password = "Contraseña demasiado larga";
  }
  if (input.hasOwnProperty("password2")) {
    if (input.password !== input.password2)
      error.password2 = "Las contraseñas deben coincidir";
  }
  if (input.hasOwnProperty("address")) {
    if (!input.address.length) error.address = "Ingrese una direccion valida";
  }
  if (input.hasOwnProperty("phoneNumber")) {
    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        input.phoneNumber
      )
    )
      error.phoneNumber = "Ingrese un número valido";
  }
  if (input.hasOwnProperty("seniorityDate")) {
    if (input.seniorityDate === "")
      error.seniorityDate = "Ingrese fecha de escalafón";
  }
  if (input.hasOwnProperty("emailAddress")) {
    if (
      !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        input.emailAddress
      )
    )
      error.emailAddress = "Ingrese una dirección de correo válida";
  }
  if (input.hasOwnProperty("message")) {
    if (input.message.length < 1)
      error.message = "Ingrese una dirección de correo válida";
  }
  if (input.hasOwnProperty("text")) {
    if (input.text.length < 1)
      error.text = "Ingrese el texto";
      if (input.text.length > 253) error.text = "El texto es muy extenso";
  }
  return error;
}
