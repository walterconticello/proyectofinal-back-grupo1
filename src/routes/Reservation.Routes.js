import express from "express";
import reservationControllers from "../controllers/reservation-controllers.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/reservation", verifyUser, reservationControllers.postReservation);
router.get("/reservation", verifyUser, reservationControllers.getReservation);
router.get(
  "/reservation/:id",
  verifyUser,
  reservationControllers.getReservationIdReservation
);
router.get(
  "/reservation/field/:fieldid",
  verifyUser,
  reservationControllers.getReservationByFieldId
);
router.delete(
  "/reservation/:id",
  verifyUser,
  reservationControllers.deleteIdReservation
);
router.delete(
  "/reservation/:id",
  verifyUser,
  reservationControllers.cancelledReservation
);
router.put(
  "/reservation/:id",
  verifyUser,
  reservationControllers.putReservation
);

export default router;
