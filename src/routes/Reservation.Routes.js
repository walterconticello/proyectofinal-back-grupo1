import express from "express";
import reservationControllers from "../controllers/reservation-controllers.js";
import { verifyAdmin, verifyOwner, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get(
  "/reservation/:id",
  reservationControllers.getReservationIdReservation
);
router.put("/reservation/:id", reservationControllers.cancelledReservation);
router.post("/reservation", verifyUser, reservationControllers.postReservation);
router.get(
  "/reservationUser",
  verifyUser,
  reservationControllers.getUserReservation
);
router.get(
  "/reservation/field/:field",
  verifyUser,
  reservationControllers.getReservationByField
);
router.get(
  "/reservationOwner",
  verifyOwner,
  reservationControllers.getOwnerReservation
);
router.get(
  "/reservation",
  verifyAdmin,
  reservationControllers.getAllReservation
);

export default router;
