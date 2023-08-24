import express from "express";
import reservationControllers from '../controllers/reservation-controllers.js';

const router = express.Router();

router.post("/reservation" , reservationControllers.postReservation);
router.get("/reservation", reservationControllers.getReservation);
router.get("/reservation/:id", reservationControllers.getReservationIdReservation);
router.get("/reservation/field/:fieldid", reservationControllers.getReservationByFieldId);
router.delete("/reservation/:id", reservationControllers.deleteIdReservation);
router.delete("/reservation/:id", reservationControllers.cancelledReservation);
router.put("/reservation/:id",reservationControllers.putReservation);

export default router;