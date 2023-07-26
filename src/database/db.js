const mongoose = require('mongoose');
const ReservationModel = require('../models/reservation-model');

const uri = process.env.PORTDB;
const db = process.env.DB;

const conectDb = async () => {
    try{
        mongoose.connect(`${uri}/${db}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected!');
        const allReservation = await ReservationModel.find();
        console.log(allReservation);
    }catch (error) {
        console.log(error)
    }
}

module.exports = conectDb;