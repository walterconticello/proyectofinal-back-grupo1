import express from "express";
import reservationControllers from "../controllers/reservation-controllers.js";
import { verifyAdmin, verifyOwner, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/reservation", reservationControllers.postReservation);
router.get("/reservation", verifyAdmin, reservationControllers.getAllReservation);
router.get("/reservation/user", verifyUser, reservationControllers.getUserReservation);
router.get("/reservation/owner", reservationControllers.getOwnerReservation);
router.get("/reservation/:id", reservationControllers.getReservationIdReservation);
router.put("/reservation/:id", reservationControllers.cancelledReservation);

export default router;
