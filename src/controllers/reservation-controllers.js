const { default: mongoose } = require("mongoose");
const ReservationModel = require("../models/reservation-model");

//CREATE O POST

const postReservation = async (req , res) => {
    try{
        const reservation = new ReservationModel({
            IdUser : req.body.IdUser,
            IdSportCenter : req.body.IdSportCenter ,
            IdField : req.body.IdField ,
            ReservationTime: req.body.ReservationTime , 
        });
        await reservation.save();
        res.status(201).json(reservation);
    }catch (error) {
        console.log(error);
    }
}

//GET's

const getReservation = async(req ,res) => {
    try {
        const allReservation = await ReservationModel.find();
        res.status(200).json(allReservation);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

const getReservationIdReservation = async(req,res) => {
        const id = req.params.id;
        const reservation = await ReservationModel.findById(id);
        if(reservation){
            res.json(reservation)
        }else{
            res.status(404).json({ message: "Reservation not found" })
        }
    };

    const deleteIdReservation = async (req, res) => {
        try {
          const id = req.params.id;
          const reservation = await ReservationModel.findByIdAndDelete(id);
          if(reservation){
            res.status(200).json({ message: "Reservation deleted" });
        }else{
            res.status(404).json({ message: "Reservation not found" })
        }
        } catch (err) {
          console.log(err);
        }
      };

// PUT

const putReservation = async (req, res) => {
    try{
        const id = req.params.id;
        const reservation = await ReservationModel.findById(id);
        if(reservation){
           // if(req.body.IdField &&  req.body.ReservationTime){
                reservation.IdField = req.body.IdField;
                reservation.ReservationTime = req.body.ReservationTime;
                await reservation.save();
                res.status(200).json(reservation);
            // }else{
            //     res.status(404).json({ error: "Cancha  o horario no disponible" });
            // }
        }else{
            res.status(404).json({ error: "Reserva no encontrada" });
        }
    }catch(error){
        console.log(error);
    }
}



module.exports = {postReservation, getReservation , getReservationIdReservation, deleteIdReservation, putReservation};