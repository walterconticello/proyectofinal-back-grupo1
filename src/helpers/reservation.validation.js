import mongoose from "mongoose";
import ReservationModel from "../models/reservation.model.js";
import FieldsModel from "../models/fields.model.js";
import { zonedTimeToUtc, format } from "date-fns-tz";

const timeZone = "America/Argentina/Buenos_Aires";
const currentDate = new Date();
const zonedDate = zonedTimeToUtc(currentDate, timeZone);
const dateTime = format(zonedDate, 'yyyy-MM-dd HH:mm', { timeZone}) 
export const currentSecund = currentDate.getTime() - (3600000 * 3);


async function isReservationExists(IdField, reservationDate) {
  const existingReservation = await ReservationModel.findOne({ IdField:IdField,ReservationTime:reservationDate
  });
  console.log(existingReservation);
  return existingReservation !== null;
}

async function isWithinOpeningHours(IdField, reservationDate) {
  const field = await FieldsModel.findById(IdField);
  if (!field) {
    return false;
  }

  const reservation = Number(reservationDate.getHours());

  const openingHour = field.openHour;
  const closingHour = field.closeHour;
  const reservationHour = reservation + 3;
  

  return reservationHour >= openingHour && reservationHour < closingHour;
}

const ValidationDate = async (ReservationTime, IdField) => {
  const reservationDate = ReservationTime; 
  const time = reservationDate.getTime();
  console.log(time);

  if (time <= currentSecund) {
    console.log("La fecha de reserva debe ser en el futuro.");
    return false;
  }

  const isWithinHours = await isWithinOpeningHours(IdField, reservationDate);
  if (!isWithinHours) {
    console.log(
      "La reserva debe estar dentro del horario de apertura y cierre del complejo."
    );
    return false;
  }

  const reservationExists = await isReservationExists(IdField, reservationDate);
  if (reservationExists) {
    console.log("Esta reserva ya existe.");
    return false;
  }

  return true; // Solo si todas las validaciones pasan, se retorna true.
};

export const ExpirationFunction = (dateExpiration) =>{

  const dosSemanasDespues = new Date(dateExpiration); 
  console.log("dos semanas: " + dosSemanasDespues)
  dosSemanasDespues.setDate(dosSemanasDespues.getDate() + 14);

  return dosSemanasDespues;
};

export const cancelled = (date) => {
  const cincoDias = new Date(date);
  console.log(cincoDias);
  cincoDias.setDate(cincoDias.getDate() + 5);
  return cincoDias;
};

export default ValidationDate;
