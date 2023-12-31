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
  if (!field) {
    return false;
  }

  const reservation = Number(reservationDate.getHours());

  const openingHour = field.openHour;
  const closingHour = field.closeHour;

  let reservationHour = reservation - 3;
  if(reservationHour === 0) reservationHour = 24;
  if(reservationHour === -1) reservationHour = 23;
  if(reservationHour === -2) reservationHour = 22;
  if(reservationHour === -3) reservationHour = 21;

  return reservationHour >= openingHour && reservationHour < closingHour;
}

const ValidationDate = async (ReservationTime, IdField) => {
  const reservationDate = ReservationTime;
  const time = reservationDate.getTime();

  if (time <= currentSecund) {
    return false;
  }

  const isWithinHours = await isWithinOpeningHours(IdField, reservationDate);
  if (!isWithinHours) {
    return false;
  }

  const reservationExists = await isReservationExists(IdField, reservationDate);
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
