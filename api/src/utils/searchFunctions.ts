import { sequelize } from "../db";
import { Contingencies } from "../models/Contingencies";
import { Job } from "../models/Job";
import { User } from "../models/User";
import { UsersJobs } from "../models/UsersJobs";
const { Op } = require("sequelize");

export async function getExtraHours(
  jobId: string,
  userCuil: string,
  date: string
) {
  const [month, year] = [...date.split("-")];
  const extraHours: any = await Contingencies.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("hoursNumber")), "total_hours"],
    ],
    group: [
      // "hoursNumber",
      "Contingencies.id",
      "userJob.UserCuil",
      "userJob.JobId",
      "userJob->userData.cuil",
      "userJob->jobData.id",
    ],
    where: {
      contingencyType: "horas extras",
      state: "Atendida",
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', Number(month)),
        sequelize.fn('EXTRACT(YEAR from "date") =', Number(year)),
      ],
    },
    include: [
      {
        model: UsersJobs,
        include: [
          {
            model: User,
            attributes: [],
            where: {
              cuil: userCuil,
            },
          },
          {
            model: Job,
            // attributes: ["name"],
            attributes: [],
            where: {
              id: jobId,
            },
          },
        ],
        attributes: [],
      },
    ],
  });
  return extraHours.reduce((acc: number, e: any) => {
    return acc + Number(e.dataValues.total_hours);
  }, 0);
}

export async function getMissedHours(
  jobId: string,
  userCuil: string,
  date: string
) {
  const [month, year] = [...date.split("-")];
  const missedHours: any = await Contingencies.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("hoursNumber")), "total_hours"],
    ],
    group: [
      // "hoursNumber",
      "Contingencies.id",
      "userJob.UserCuil",
      "userJob.JobId",
      "userJob->userData.cuil",
      "userJob->jobData.id",
    ],
    where: {
      [Op.or]: [
        { contingencyType: "llegada tarde" },
        { contingencyType: "retiro temprano" },
      ],
      state: "Atendida",
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', Number(month)),
        sequelize.fn('EXTRACT(YEAR from "date") =', Number(year)),
      ],
    },
    include: [
      {
        model: UsersJobs,
        include: [
          {
            model: User,
            attributes: [],
            where: {
              cuil: userCuil,
            },
          },
          {
            model: Job,
            // attributes: ["name"],
            attributes: [],
            where: {
              id: jobId,
            },
          },
        ],
        attributes: [],
      },
    ],
  });
  return missedHours.reduce((acc: number, e: any) => {
    return acc + Number(e.dataValues.total_hours);
  }, 0);
}

export async function getAbsences(
  jobId: string,
  userCuil: string,
  date: string
) {
  const [month, year] = [...date.split("-")];

  const absences: any = await Contingencies.findAll({
    attributes: ["state", "absenceDays", "createdAt"],
    group: [
      "Contingencies.id",
      "userJob.UserCuil",
      "userJob.JobId",
      "userJob->userData.cuil",
      "userJob->jobData.id",
    ],
    where: {
      contingencyType: "ausencia",
      [Op.or]: [{ state: "Atendida" }, { state: "Rechazada" }],
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', Number(month)),
        sequelize.fn('EXTRACT(YEAR from "date") =', Number(year)),
      ],
    },
    include: [
      {
        model: UsersJobs,
        include: [
          {
            model: User,
            attributes: [],
            where: {
              cuil: userCuil,
            },
          },
          {
            model: Job,
            attributes: [],
            where: {
              id: jobId,
            },
          },
        ],
      },
    ],
  });
  let totalAbsences = {
    excusedAbsences: 0,
    unexcusedAbsences: 0,
  };
  absences.map((e: any) => {
    e.dataValues.state === "Atendida"
      ? (totalAbsences.excusedAbsences += e.dataValues.absenceDays)
      : (totalAbsences.unexcusedAbsences += e.dataValues.absenceDays);
  });
  return totalAbsences;
}
