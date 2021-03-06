import { sequelize } from "./src/db";
import app from "./src/app";
import { Job } from "./src/models/Job";
import { User } from "./src/models/User";

enum GenderType {
  Male = "masc",
  Female = "fem",
  Other = "otro",
}

enum RoleType {
  Admin = "admin",
  Employee = "empleado",
  Manager = "gerente",
}

sequelize
  .sync({ force: true, logging: false })
  .then(() => {
    console.log("base de datos conectada! :D");
    app.listen(3001, function () {
      console.log("App is listening on port 3001!");
    });
  })
  .then(async () => {
    await Job.bulkCreate([
      { id: "1012", name: "profe" },
      { id: "1013", name: "profe inicial" },
      { id: "1014", name: "profe primario" },
      { id: "1015", name: "profe secundario" },
      { id: "1016", name: "profe ingles" },
      { id: "1017", name: "profe matematicas" },
      { id: "1018", name: "profe asistente" },
      { id: "2012", name: "profe suplente" },
      { id: "3012", name: "profe gimnasia" },
    ]);
    await User.bulkCreate([
      {
        cuil: "23042275281",
        name: "Carlos Salvador",
        lastName: "Bilardo",
        password:
          "$2b$10$x0/2y8nbrC55hqKq3jxuBuMt0C1QBXwoUveetxb6U2kuGAxmdWbQ6", //12345
        address: "Kiricocho 13",
        phoneNumber: "01113131313",
        emailAddress: "elDoctor@gmail.com",
        seniorityDate: "2022-04-29 04:50:12.390 +00:00",
        gender: GenderType.Male,
        role: RoleType.Admin,
      },
      {
        cuil: "20042235281",
        name: "Horacio",
        lastName: "Salazar",
        password:
          "$2b$10$x0/2y8nbrC55hqKq3jxuBuMt0C1QBXwoUveetxb6U2kuGAxmdWbQ6",
        address: "sí tiene 8",
        phoneNumber: "01113131313",
        emailAddress: "elDoctor@gmail.com",
        seniorityDate: "2022-04-29 04:50:12.390 +00:00",
        gender: GenderType.Male,
        role: RoleType.Employee,
      },
    ]);
  })
  .catch((err) => console.error(err.message));
