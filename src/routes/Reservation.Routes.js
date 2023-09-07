import express from "express";
import reservationControllers from '../controllers/reservation-controllers.js';
import { auth } from "../middlewares/auth.js";
import { verifyAdmin, verifyOwner, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/reservation", auth,  reservationControllers.postReservation);
router.get("/reservation", auth, verifyAdmin, reservationControllers.getAllReservation);
router.get("/reservation/user", auth, verifyUser , reservationControllers.getUserReservation);
router.get("/reservation/owner", auth ,  reservationControllers.getOwnerReservation);
router.get("/reservation/:id", auth,  reservationControllers.getReservationIdReservation);
router.put("/reservation/:id", auth,  reservationControllers.cancelledReservation);

export default router;