import { sequelize } from "./src/db";
import app from "./src/app";
import { Job } from "./src/models/Job";

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
  })
  .catch((err) => console.error(err));
