import ReservationModel from "../models/reservation.model.js";
import fieldModel from "../models/fields.model.js";
import ValidationDate from "../helpers/reservation.validation.js";
import sportCenterModel from "../models/sportCenter.model.js";
import mongoose from "mongoose";
//CREATE O POST

const postReservation = async (req, res) => {
  try {
    const IdUser = await UserModel.findById(req.user.id);
    const IdField = await fieldModel.findById(req.body.IdField);
    if (IdUser) {
      if (IdField) {
        if (ValidationDate(req.body.ReservationTime)) {
          const reservation = new ReservationModel({
            IdUser: req.body.IdUser,
            IdSportCenter: req.body.IdSportCenter,
            IdField: req.body.IdField,
            ReservationTime: req.body.ReservationTime,
            Status: "confirmada",
          });
          await reservation.save();
          res.status(201).json(reservation);
        } else {
          res.status(400).json({ message: "Fecha no valida" });
        }
      } else {
        res.status(400).json({ message: "Cancha no existente" });
      }
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//GET's

const getAllReservation = async (req, res) => {
  try {
    if (req.user.isAdmin === true) {
      console.log("todas las reservaciones");
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
    if (req.user.isAdmin === false && req.user.isOwner === false) {
      const reservationUser = await ReservationModel.findById(req.user.id);
      if (reservationUser === null) {
        console.log("este usuario no tiene reservaciones");
      }
    }else {
      res.status(204).json({ message: "usted no tiene reserva" });
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
        if(fieldIds.lenght > 0){
          const reservations1 = await reservationModel.find({IdField : {$in: fieldIds}});// traer todas las reservaciones que coincidan con el id de la cancha.
        }
        res.status(203).json({ message: "usted no es owner" });
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

const getReservationByFieldId = async (req, res) => {
  try {
    const fieldId = req.params.fieldid;
    const reservations = await reservationModel.find({
      IdField: { $eq: fieldId },
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const reservation = await ReservationModel.findByIdAndDelete(id);
    if (reservation) {
      res.status(200).json({ message: "Reservation deleted" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

// PUT

const putReservation = async (req, res) => {
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
  getReservationByFieldId,
};
