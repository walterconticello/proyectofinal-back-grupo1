const express = require('express');
const router = express.Router();

const reservationControllers = require('../controllers/reservation-controllers');

 //Create o POST

router.post("/reservation" , reservationControllers.postReservation);

// GET's

 router.get("/reservation", reservationControllers.getReservation)
 router.get("/reservation/:id", reservationControllers.getReservationIdReservation)

 //Delete
 router.delete("/reservation/:id", reservationControllers.deleteIdReservation)

module.exports = router;