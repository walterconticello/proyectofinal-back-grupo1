const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
    IdUser : {type: String, require } ,
    IdSportCenter : { type: String , require },
    IdField : { type: String, require  },
    ReservationTime: { type: String, require  }
}, {versionKey : false});

const ReservationModel = mongoose.model("reservations", reservationSchema); //Creamos la coleccion en la base de datos

module.exports = ReservationModel;