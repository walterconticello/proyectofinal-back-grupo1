import mongoose from "mongoose";
const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    IdUser: { type: String, require: true },
    IdSportCenter: { type: String, require: true },
    IdField: { type: String, require: true },
    ReservationTime: { type: Date, require: true },
  },
  { versionKey: false }
);

const ReservationModel = mongoose.model("reservations", reservationSchema);
export default ReservationModel;
//Creamos la coleccion en la base de datos
