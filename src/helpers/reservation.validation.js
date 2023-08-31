import mongoose from "mongoose";
import ReservationModel from "../models/reservation.model.js";
import FieldsModel from "../models/fields.model.js";
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

async function isWithinOpeningHours(IdField, reservationDate) {
  const field = await FieldsModel.findById(IdField);
  if (!field) {
    return false;
  }

  const openingHour = field.openHour;
  const closingHour = field.closeHour;
  const reservationHour = reservationDate.getHours();

  return reservationHour >= openingHour && reservationHour < closingHour;
}

const ValidationDate = async (ReservationTime, IdField) => {
  const reservationDate = new Date(ReservationTime); // posible error de tipo date

  if (reservationDate <= zonedDate) {
    console.log("La fecha de reserva debe ser en el futuro.");
    return;
  }

  const isWithinHours = await isWithinOpeningHours(IdField, reservationDate);
  if (!isWithinHours) {
    console.log(
      "La reserva debe estar dentro del horario de apertura y cierre del complejo."
    );
    return;
  }

  const reservationExists = await isReservationExists(IdField, ReservationTime);
  if (reservationExists) {
    console.log("Esta reserva ya existe.");
    return false;
  }

  return true;
};

export default ValidationDate;
