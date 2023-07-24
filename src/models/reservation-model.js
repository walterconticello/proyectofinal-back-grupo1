const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
    IdUser : {type: String , require : true} ,
    IdSportCenter : { type: String, require : true},
    IdField : { type: String, require : true},
    IdReservation :{ type: String, require : true},
    ReservationTime: { type: Date, require : true}
}, {versionKey : false});

const ReservactionModel = mongoose.model("reservation", reservationSchema); //Creamos la coleccion en la base de datos

module.exports = ReservactionModel;