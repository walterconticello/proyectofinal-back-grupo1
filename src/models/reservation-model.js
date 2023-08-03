import mongoose from "mongoose";
const { Schema } = mongoose;

const reservationSchema = new Schema({
    IdUser : {type: String, require } ,
    IdSportCenter : { type: String , require },
    IdField : { type: String, require  },
    ReservationTime: { type: Date, require  }
}, {versionKey : false});

export default ReservationModel = mongoose.model("reservations", reservationSchema); //Creamos la coleccion en la base de datos
