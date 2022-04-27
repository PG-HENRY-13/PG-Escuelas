import { User } from "../../redux/interfaces";

export default function validate(input: User) {
  let error: any = {};
  if (input.hasOwnProperty("cuil")) {
    if (/^\d+$/.test(input.cuil)) error.cuil = "Ingrese un Cuil valido";
  }
  if (input.hasOwnProperty("name")) {
    let algo = /^[A-Za-z]+$/;
    if (!/^[A-Za-z]+$/.test(input.name)) error.name = "Ingrese un nombre";
  }
  if (input.hasOwnProperty("lastName")) {
    if (!/^[A-Za-z]+$/.test(input.lastName)) error.name = "Ingrese un apellido";
  }
  if (input.hasOwnProperty("password")) {
    let test = Number(input.password);
    if (isNaN(test))
      error.healthScore = "Input must be a numeric value between 1 and 100";
    else if (test > 100 || test < 1)
      error.healthScore = "Only numbers between 1 and 100";
  }
  if (input.hasOwnProperty("addres")) {
    if (!input.name.length) error.name = "Recipes must have a name";
  }
  if (input.hasOwnProperty("phoneNumber")) {
    if (!input.name.length) error.name = "Recipes must have a name";
  }
  if (input.hasOwnProperty("emailAddress")) {
    if (!input.name.length) error.name = "Recipes must have a name";
  }
  return error;
}
