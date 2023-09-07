import ReservationModel from "../models/reservation.model.js";
import fieldModel from "../models/fields.model.js";
import ValidationDate from "../helpers/reservation.validation.js";
import {ExpirationFunction , currentSecund } from "../helpers/reservation.validation.js"
import sportCenterModel from "../models/sportCenter.model.js";
import cron from "node-cron";
import mongoose from "mongoose";
//CREATE O POST

const postReservation = async (req, res) => {
  try {
    const IdUser = req.user.id
    const IdField = await fieldModel.findById(req.body.IdField);
    const date = new Date (req.body.ReservationTime);
    date.setHours(date.getHours() - 3);
    if (IdUser) {
      if (IdField) {
        const isValid = await ValidationDate(date , IdField);
        if (isValid) {
          const expiration = await ExpirationFunction(date);
          const reservation = new ReservationModel({
            IdUser: req.body.IdUser,
            IdSportCenter: req.body.IdSportCenter,
            IdField: req.body.IdField,
            ReservationTime: date,
            expirationDate: expiration
          });
          await reservation.save();
          res.status(201).json(reservation);
        } else {
          res.status(400).json({ message: "Reserva Existente o Fecha incorrecta" });
        }
      } else {
        res.status(400).json({ message: "Cancha no existente" });
      }
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//GET's

const getAllReservation = async (req, res) => {
  try {
    if (req.user.isAdmin === true) {
      const allReservation = await ReservationModel.find();
      res.status(200).json(allReservation);
    } else {
      res.status(403).json({ message: "usted no es administrador" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get User

const getUserReservation = async (req, res) => {
  try{
    if (!req.user.isAdmin  && !req.user.isOwner) {
      const idUser = req.user.id;
      const reservationUser = await ReservationModel.find({IdUser : idUser});
      if (reservationUser) {
        res.json(reservationUser);
      }else{
        res.status(200).json({ message: "usted no tiene reserva" });
      }
    }else {
      res.status(304).json({ message: "usted no es usuario" });
    }

  }catch(error){
    res.status(404).json({ message: error.message });
  }
};
// get Owner
const getOwnerReservation = async (req, res) => {
  const user = new mongoose.Types.ObjectId(req.user.id)
  try{
    if (req.user.isOwner === true) {
      const sportCenters= await sportCenterModel.findOne({ownerId : user});
      if(sportCenters){
        const fields = await fieldModel.find({idSportCenter : sportCenters._id})
        const fieldIds = fields.map(field => field.id);
        if(fieldIds.length > 0){
          const reservations = [];
          for (const id of fieldIds) {
            const reservation = await ReservationModel.findOne({IdField : id});
            if (reservations) {
              reservations.push(reservation);
            }
          }
          if(reservations.length > 0){
            res.status(200).json(reservations)
          }
        }else{
          res.status(204).json({ message : "no tiene reservas"});
        }
      }else {
        res.status(204).json({ message: "no existe el complejo" });
      }
    } else {
      res.status(204).json({ message: "usted no es owner" });
    };
  }catch(error){
    console.log(error);
    res.status(404).json({ message: error.message });
    
  }
};


const getReservationIdReservation = async (req, res) => {
  const id = req.user.id;
  const reservation = await ReservationModel.findById(id);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ message: error.message });
  }
};

const cancelledReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const reservationId = req.params.id;
    const reservation = await ReservationModel.findById(reservationId);
    console.log(reservation);
    if (reservation.IdUser == userId || req.user.isOwner === true || req.user.isAdmin === true ) {
      reservation.Status = "cancelada";
      await reservation.save();
      res.status(200).json({ message: "Reservation cancelada" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


cron.schedule('*/1 * * * *', async (res) => {
    try {
      const reservationToDelete = await ReservationModel.find({Status : "cancelada"});
      if(reservationToDelete.length > 0 ){
        for(const statusDelete of reservationToDelete){
          const StringExpiration = statusDelete.expirationDate;
          const idDelete = reservationToDelete.map(reservationDelete => reservationDelete.id);
          const timeExpiration = Number(StringExpiration.getTime());
          if(timeExpiration < currentSecund){
            for(const id of idDelete){
              const deletes = await ReservationModel.findByIdAndDelete(id);
              console.log(deletes);
              if(deletes){
                res.status(200).json({ message: "Reserva eliminada" });
              };
            };
        };
          };
      } else {
          console.log("No hay reserva con status cancelada")  ;
        }
    } catch(error){
      res.status(500).json({ message: error.message });
    }
});





export default {
  postReservation,
  getAllReservation,
  getUserReservation,
  getOwnerReservation,
  getReservationIdReservation,
  cancelledReservation,
};
