import mongoose from "mongoose";
import ReservationModel from "../models/reservation.model.js";
import FieldsModel from "../models/fields.model.js";
import { zonedTimeToUtc, format } from "date-fns-tz";

const timeZone = "America/Argentina/Buenos_Aires";
const currentDate = new Date();
const zonedDate = zonedTimeToUtc(currentDate, timeZone);
const dateTime = format(zonedDate, "yyyy-MM-dd HH:mm", { timeZone });
export const currentSecund = currentDate.getTime() - 3600000 * 3;

async function isReservationExists(IdField, reservationDate) {
  const existingReservation = await ReservationModel.findOne({
    IdField: IdField,
    ReservationTime: reservationDate,
    Status : "pendiente" || "confirmada",
  });
  return existingReservation;
}

async function isWithinOpeningHours(IdField, reservationDate) {
  const field = await FieldsModel.findById(IdField);
  console.log("field: "+ field);
  if (!field) {
    return false;
  }

  const reservation = Number(reservationDate.getHours());

  const openingHour = field.openHour;
  const closingHour = field.closeHour;
  const reservationHour = reservation + 3;
  console.log("openingHour: " + openingHour);
  console.log("closingHour: " + closingHour);
  console.log("reservationHour: " + reservationHour);

  return reservationHour >= openingHour && reservationHour < closingHour;
}

const ValidationDate = async (ReservationTime, IdField) => {
  console.log("Reservation Time: " + ReservationTime);
  console.log("Id Field: " + IdField);
  const reservationDate = ReservationTime;
  const time = reservationDate.getTime();

  if (time <= currentSecund) {
    return false;
  }

  const isWithinHours = await isWithinOpeningHours(IdField, reservationDate);
  console.log("isWithinHours " + isWithinHours);
  if (!isWithinHours) {
    return false;
  }

  const reservationExists = await isReservationExists(IdField, reservationDate);
  console.log("reservationExists " + reservationExists);
  if (reservationExists) {
    return false;
  }

  return true;
};

export const ExpirationFunction = (dateExpiration) => {
  const dosSemanasDespues = new Date(dateExpiration);
  dosSemanasDespues.setDate(dosSemanasDespues.getDate() + 14);

  return dosSemanasDespues;
};

export const cancelled = (date) => {
  const cincoDias = new Date(date);
  cincoDias.setDate(cincoDias.getDate() + 5);
  return cincoDias;
};

export default ValidationDate;
