import mongoose from "mongoose";
const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    IdUser: { type: mongoose.ObjectId, require: true },
    IdSportCenter: { type: mongoose.ObjectId, require: true },
    IdField: { type: mongoose.ObjectId, require: true },
    ReservationTime: { type: Date, require: true },
    Status: {
      type: String,
      enum: ["confirmada", "cancelada"],
      default: "pendiente",
    },
  },
  { versionKey: false }
);

export default mongoose.model("Reservations", reservationSchema);
