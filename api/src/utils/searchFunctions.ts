import { sequelize } from "../db";
import { Contingencies } from "../models/Contingencies";
import { Job } from "../models/Job";
import { User } from "../models/User";
import { UsersJobs } from "../models/UsersJobs";
const { Op } = require("sequelize");

export async function getExtraHours(
  userCuil: string,
  jobId: string,
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
      // "userJob->userData",
      // "userJob->userData.cuil",
      // "userJob->jobData.id",
    ],
    where: {
      contingencyType: "horas extras",
      state: "Atendida",
      "$userJob.UserCuil$": userCuil,
      "$userJob.JobId$": jobId,
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', Number(month)),
        sequelize.fn('EXTRACT(YEAR from "date") =', Number(year)),
      ],
    },
    include: [
      {
        model: UsersJobs,
        required: true,
        attributes: ["UserCuil", "JobId"],
      },
    ],
  });
  return extraHours.reduce((acc: number, e: any) => {
    return acc + Number(e.dataValues.total_hours);
  }, 0);
}

export async function getMissedHours(
  userCuil: string,
  jobId: string,
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
    ],
    where: {
      state: "Rechazada",
      "$userJob.UserCuil$": userCuil,
      "$userJob.JobId$": jobId,
      [Op.or]: [
        { contingencyType: "llegada tarde" },
        { contingencyType: "retiro temprano" },
      ],
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', Number(month)),
        sequelize.fn('EXTRACT(YEAR from "date") =', Number(year)),
      ],
    },
    include: [
      {
        model: UsersJobs,
        required: true,
        attributes: ["UserCuil", "JobId"],
      },
    ],
  });
  return missedHours.reduce((acc: number, e: any) => {
    return acc + Number(e.dataValues.total_hours);
  }, 0);
}

export async function getAbsences(
  userCuil: string,
  jobId: string,
  date: string
) {
  const [month, year] = [...date.split("-")];

  const absences: any = await Contingencies.findAll({
    attributes: ["state", "absenceDays", "createdAt"],
    where: {
      contingencyType: "ausencia",
      "$userJob.UserCuil$": userCuil,
      "$userJob.JobId$": jobId,
      [Op.or]: [{ state: "Atendida" }, { state: "Rechazada" }],
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', Number(month)),
        sequelize.fn('EXTRACT(YEAR from "date") =', Number(year)),
      ],
    },
    include: [
      {
        model: UsersJobs,
        required: true,
        attributes: ["UserCuil", "JobId"],
      },
    ],
  });
  console.log(absences[0]?.dataValues);
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
