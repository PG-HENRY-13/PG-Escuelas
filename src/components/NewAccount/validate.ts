import { User } from "../../redux/interfaces";

export default function validate(input: User) {
  let error: any = {};
  if (input.hasOwnProperty("cuil")) {
    if (
      !/^\d+$/.test(input.cuil) ||
      input.cuil.length > 11 ||
      input.cuil.length < 10
    )
      error.cuil = "Ingrese un Cuil valido";
  }
  if (input.hasOwnProperty("name")) {
    let algo = /^[A-Za-z]+$/;
    if (!/^[A-Za-z]+$/.test(input.name)) error.name = "Ingrese un nombre";
  }
  if (input.hasOwnProperty("lastName")) {
    if (!/^[A-Za-z]+$/.test(input.lastName))
      error.lastName = "Ingrese un apellido";
  }
  if (input.hasOwnProperty("password")) {
    if (input.password.length < 8)
      error.password = "Contraseña demasiado corta";
    else if (input.password.length > 12)
      error.password = "Contraseña demasiado larga";
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
      error.phoneNumber = "Ingrese un numero valido";
  }
  if (input.hasOwnProperty("emailAddress")) {
    if (
      !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        input.emailAddress
      )
    )
      error.emailAddress = "Ingrese una direccion de correo valida";
  }
  return error;
}