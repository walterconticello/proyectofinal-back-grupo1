import express from "express";
import reservationControllers from '../controllers/reservation-controllers.js';
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/reservation", auth,  reservationControllers.postReservation);
router.get("/reservation", auth,  reservationControllers.getReservation);
router.get("/reservation/:id", auth,  reservationControllers.getReservationIdReservation);
router.get("/reservation/field/:id", auth,  reservationControllers.getReservationByFieldId);
router.delete("/reservation/:id",  auth, reservationControllers.deleteIdReservation);
router.delete("/reservation/:id", auth,  reservationControllers.cancelledReservation);
router.put("/reservation/:id", auth, reservationControllers.putReservation);

export default router;