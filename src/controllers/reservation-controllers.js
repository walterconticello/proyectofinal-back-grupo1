import ReservationModel from "../models/reservation.model.js";
// const UserModel = require("../models/user.model"); aqui iria el modelo de usuarios
import isValidObjectId from "../helpers/reservation.validation.js";
//CREATE O POST

const postReservation = async (req, res) => {
  try {
    if (
      !isValidObjectId(req.body.IdUser) ||
      !isValidObjectId(req.body.IdSportCenter) ||
      !isValidObjectId(req.body.IdField)
    ) {
      return res
        .status(400)
        .json({ message: "El id proporcionado no es válido" });
    }

    const IdUser = await UserModel.findById(req.body.IdUser);
    // const IdSportCenter = await X.findById(req.body.IdSportCenter); Hay que remplazar X por el modelo de complejo
    // const IdField = await X.findById(req.body.IdField); // Remplazar por el de Canchas
    // const ReservationTime = awat x.findOnet(req.body.ReservationTime) este buscara que no existan horarios coincidentes

    if (!IdUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.body.IdUser === IdUser._id.toString()) {
      //va otro IF y luego otro
      const reservation = new ReservationModel({
        IdUser: req.body.IdUser,
        IdSportCenter: req.body.IdSportCenter,
        IdField: req.body.IdField,
        ReservationTime: req.body.ReservationTime,
      });
      await reservation.save();
      res.status(201).json(reservation);
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//GET's

const getReservation = async (req, res) => {
  try {
    const allReservation = await ReservationModel.find();
    res.status(200).json(allReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReservationIdReservation = async (req, res) => {
  const id = req.params.id;
  const reservation = await ReservationModel.findById(id);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ message: "Reservation not found" });
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
    console.log(err);
  }
};

// PUT

const putReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await ReservationModel.findById(id);
    if (reservation) {
      // if(req.body.IdField &&  req.body.ReservationTime){
      reservation.IdField = req.body.IdField;
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
  getReservation,
  getReservationIdReservation,
  deleteIdReservation,
  putReservation,
};
