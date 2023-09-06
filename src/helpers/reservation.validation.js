import mongoose from "mongoose";
import ReservationModel from "../models/reservation.model.js";
import FieldsModel from "../models/fields.model.js";
import { zonedTimeToUtc, format } from "date-fns-tz";

const timeZone = "America/Argentina/Buenos_Aires";
const currentDate = new Date();
const zonedDate = zonedTimeToUtc(currentDate, timeZone);

 const date = format(zonedDate, 'yyyy-MM-dd HH:mm', { timeZone}) 


async function isReservationExists(IdField, reservationDate) {
  const existingReservation = await ReservationModel.findOne({ //Esta andando mal es
    IdField,
    reservationDate,
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
  const reservationDate = ReservationTime; 

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

  const reservationExists = await isReservationExists(IdField, reservationDate);
  if (reservationExists) {
    console.log("Esta reserva ya existe.");
    return false;
  }

  return true; // Solo si todas las validaciones pasan, se retorna true.
};

export const ExpirationFunction = (date) =>{

  const dosSemanasDespues = new Date(date); 
  console.log("dos semanas: " + dosSemanasDespues)
  dosSemanasDespues.setDate(dosSemanasDespues.getDate() + 14);

  return dosSemanasDespues
}

export const cancelled = (date) =>{

  const cincoDias = new Date(date);
  console.log(cincoDias);
  cincoDias.setDate(cincoDias.getDate() + 5);
  return cincoDias;
}

export default ValidationDate;