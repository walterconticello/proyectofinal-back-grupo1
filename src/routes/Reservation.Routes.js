import express from "express";
import reservationControllers from '../controllers/reservation-controllers.js';
import { verifyUser } from "../utils/verifyToken.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/reservation", auth, verifyUser, reservationControllers.postReservation);
router.get("/reservation", auth, verifyUser, reservationControllers.getReservation);
router.get("/reservation/:id", auth, verifyUser, reservationControllers.getReservationIdReservation);
router.get("/reservation/field/:id", auth, verifyUser, reservationControllers.getReservationByFieldId);
router.delete("/reservation/:id",  auth, verifyUser,reservationControllers.deleteIdReservation);
router.delete("/reservation/:id", auth, verifyUser, reservationControllers.cancelledReservation);
router.put("/reservation/:id", auth, verifyUser, reservationControllers.putReservation);

export default router;