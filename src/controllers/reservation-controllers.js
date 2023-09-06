import ReservationModel from "../models/reservation.model.js";
import fieldModel from "../models/fields.model.js";
import ValidationDate from "../helpers/reservation.validation.js";
import {ExpirationFunction} from "../helpers/reservation.validation.js"
import sportCenterModel from "../models/sportCenter.model.js";
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
        console.log(fieldIds);
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
          res.status(200).json({ message : "no tiene reservas"});
        }else{
          res.status(200).json({ message : "no tiene reservas"});
        }
      }else {
        res.status(400).json({ message: "no existe el complejo" });
      }
    } else {
      res.status(203).json({ message: "usted no es owner" });
    };
  }catch(error){
    res.status(404).json({ message: error.message });
  }
};


const getReservationIdReservation = async (req, res) => {
  const id = req.params.id;
  const reservation = await ReservationModel.findById(id);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ message: error.message });
  }
};

const cancelledReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await ReservationModel.findById(reservationId);
    if (reservation) {
      reservation.status = "cancelada";
      await reservation.save();
      res.status(200).json({ message: "Reservation cancelada" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIdReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await ReservationModel.findByIdAndDelete(id); //iria un findByDelete // aqui tengo que hacer que se eliminen si el owner o admin quieren y que se eliminen una vez pasada la fecha de expiracion. Esto sera un arreglo de Reservas Vencidas y se iran eliminando a medida que pase recorre el arreglo.
    if (reservation) {
      res.status(200).json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

// PUT

const putReservation = async (req, res) => { //Cambiar el estado.
  try {
    const id = req.user.id;
    const reservation = await ReservationModel.findById(id);
    if (reservation) {
      reservation.ReservationTime = req.body.ReservationTime;
      await reservation.save();
      res.status(200).json(reservation);
      // }else{
      //     res.status(404).json({ error: "Cancha  o horario no disponible" });
      // }
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  postReservation,
  getAllReservation,
  getUserReservation,
  getOwnerReservation,
  getReservationIdReservation,
  deleteIdReservation,
  putReservation,
  cancelledReservation,
};
