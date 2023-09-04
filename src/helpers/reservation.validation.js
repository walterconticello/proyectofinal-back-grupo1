import mongoose from "mongoose";
import ReservationModel from "../models/reservation.model.js";
import FieldsModel from "../models/fields.model.js";
import { zonedTimeToUtc, format } from "date-fns-tz";

const timeZone = "America/Argentina/Buenos_Aires";
const currentDate = new Date();
const zonedDate = zonedTimeToUtc(currentDate, timeZone);

 const dates = format(zonedDate, 'yyyy-MM-dd HH:mm:ssxxx', { timeZone}) 
const pattern = 'yyyy-MM-dd HH:mm:ss zzz';
const formattedDate = format(zonedDate, pattern, { timeZone });
const date = new Date(dates); // exportar

console.log(date);
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
  const reservationDate = new Date(ReservationTime);
  

  if (reservationDate <= date) {
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

  const reservationExists = await isReservationExists(IdField, ReservationTime);
  if (reservationExists) {
    console.log("Esta reserva ya existe.");
    return false;
  }

  return true; // Solo si todas las validaciones pasan, se retorna true.
};

export const ExpirationFunction = (Date) =>{

  const dosSemanasDespues = date;
  dosSemanasDespues.setDate(dosSemanasDespues.getDate() + 14);
  console.log(dosSemanasDespues);
  return dosSemanasDespues
}

export const cancelled = (Date) =>{

  const cincoDias = date;
  cincoDias.setDate(cincoDias.getDate() + 5);
  console.log(dosSemanasDespues);
  return cincoDias;
}

export default ValidationDate;