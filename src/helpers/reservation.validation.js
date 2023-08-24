import mongoose from "mongoose";
import ReservationModel from "../models/reservation.model.js";
import SportCenterModel from "../models/complexModel.js";
import { zonedTimeToUtc, format } from "date-fns-tz";

const timeZone = "America/Argentina/Buenos_Aires";
const currentDate = new Date();
const zonedDate = zonedTimeToUtc(currentDate, timeZone);

const pattern = "d/M/yyyy HH:mm:ss (z)";

const formattedDate = format(zonedDate, pattern, { timeZone });
console.log(formattedDate);

async function isReservationExists(IdField, ReservationTime) {
  const existingReservation = await ReservationModel.findOne({
    IdField,
    ReservationTime,
  });
  return existingReservation !== null;
}

async function isWithinOpeningHours(IdSportCenter, reservationDate) {
  const sportCenter = await SportCenterModel.findById(IdSportCenter);
  if (!sportCenter) {
    return false;
  }

  const openingHour = sportCenter.openHour;
  const closingHour = sportCenter.closeHour;
  const reservationHour = reservationDate.getHours();

  return reservationHour >= openingHour && reservationHour < closingHour;
}

const ValidationDate = async (ReservationTime, IdField, IdSportCenter) => {
  const reservationDate = new Date(ReservationTime);

  if (reservationDate <= zonedDate) {
    console.log("La fecha de reserva debe ser en el futuro.");
    return;
  }

  const isWithinHours = await isWithinOpeningHours(
    IdSportCenter,
    reservationDate
  );
  if (!isWithinHours) {
    console.log(
      "La reserva debe estar dentro del horario de apertura y cierre del complejo."
    );
    return;
  }

  const reservationExists = await isReservationExists(IdField, ReservationTime);
  if (reservationExists) {
    console.log("Esta reserva ya existe.");
    return;
  }

  return true;
};

export default ValidationDate;
