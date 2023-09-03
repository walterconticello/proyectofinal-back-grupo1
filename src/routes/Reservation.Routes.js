import express from "express";
import reservationControllers from '../controllers/reservation-controllers.js';
import { auth } from "../middlewares/auth.js";
import { verifyAdmin, verifyOwner, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/reservation", auth,  reservationControllers.postReservation);
router.get("/reservation", auth, verifyAdmin, reservationControllers.getAllReservation);
router.get("/reservation/user", auth, reservationControllers.getUserReservation);
router.get("/reservation/owner", auth,  reservationControllers.getOwnerReservation);
router.get("/reservation/:id", auth,  reservationControllers.getReservationIdReservation);
router.get("/reservation/field/:id", auth,  reservationControllers.getReservationByFieldId);
router.delete("/reservation/:id",  auth, reservationControllers.deleteIdReservation);
router.delete("/reservation/:id", auth,  reservationControllers.cancelledReservation);
router.put("/reservation/:id", auth, reservationControllers.putReservation);

export default router;