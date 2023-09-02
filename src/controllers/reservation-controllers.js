import ReservationModel from "../models/reservation.model.js";
import fieldModel from "../models/fields.model.js";
import ValidationDate from "../helpers/reservation.validation.js";
import sportCenterModel from "../models/sportCenter.model.js";
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

const getReservation = async (req, res) => {
  try {
    if(req.user.isAdmin === false && req.user.isOwner === false){
      const reservationUser = await ReservationModel.findById(req.user.id);
      if(reservationUser === null){
        console.log("este usuario no tiene reservaciones");
      }
    };

    if(req.user.isOwner === true){
      const reservationOwner = await fieldModel.find({ownerId : req.user.id});
      console.log(reservationOwner);
      if(reservationOwner === null){
        console.log("no tiene reserva");
        // res.status(204).json({ message : "no tiene ninguna reserva" });
      };
    }else{
      res.status(403).json({ message : "usted no es owner" });
    };

    if(req.user.isAdmin === true){
      console.log("todas las reservaciones")
    const allReservation = await ReservationModel.find();
    res.status(200).json(allReservation);
  }else{
      res.status(403).json({ message : "usted no es administrador" });
    };
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
    res.status(404).json({ message: error.message });
  }
};

const getReservationByFieldId = async (req, res) => {
  try {
    const fieldId = req.params.fieldid;
    const reservations = await reservationModel.find({ IdField: { $eq: fieldId }});
    res.status(200).json(reservations);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
    const id = req.params.id;
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
  getReservation,
  getReservationIdReservation,
  deleteIdReservation,
  putReservation,
  cancelledReservation,
  getReservationByFieldId
};
