const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
    IdReservation :{ type: String},
    IdUser : {type: String, require } ,
    IdSportCenter : { type: String , require },
    IdField : { type: String, require  },
    ReservationTime: { type: String, require  },
    ReservationState: {type: String}
}, {versionKey : false});

const ReservationModel = mongoose.model("reservation", reservationSchema); //Creamos la coleccion en la base de datos

module.exports = ReservationModel;