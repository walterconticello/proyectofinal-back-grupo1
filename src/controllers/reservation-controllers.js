const { default: mongoose } = require("mongoose");
const ReservationModel = require("../models/reservation-model");

//CREATE O POST

const postReservation = async (req , res) => {
    try{
        const reservation = new ReservationModel({
            IdReservation : new mongoose.Types.ObjectId(),
            IdUser : req.body.IdUser,
            IdSportCenter : req.body.IdSportCenter ,
            IdField : req.body.IdField ,
            ReservationTime: req.body.ReservationTime ,
            ReservationState: "active" ,
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
        const reservation = await ReservationModel.findOne({IdReservation : (id)});
        if(reservation){
            res.json(reservation)
        }else{
            res.status(404).json({ message: "Reservation not found" })
        }
    };

    const deleteProduct = async (req, res) => {
        try {
          const id = req.params.id;
          await productSchema.findOneAndDelete({ _id: id });
          res.status(200).json({ message: "product deleted" });
        } catch (err) {
          console.log(err);
        }
      };

module.exports = {postReservation, getReservation , getReservationIdReservation};