
const ReservationModel = require("../models/reservation-model");

//CREATE O POST

const postReservation = async (req , res) => {
    try{
        const reservation = new ReservationModel(req.body);
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
    

module.exports = {postReservation, getReservation};