const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
    IdUser : {type: String , } ,
    IdSportCenter : { type: String, },
    IdField : { type: String, },
    IdReservation :{ type: String, },
    ReservationTime: { type: String, },
    ReservationState: {type: String}
}, {versionKey : false});

const ReservationModel = mongoose.model("reservation", reservationSchema); //Creamos la coleccion en la base de datos

module.exports = ReservationModel;