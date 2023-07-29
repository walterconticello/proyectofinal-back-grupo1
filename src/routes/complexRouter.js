import express from "express";
import complexController from "../controllers/complexController";

const router= express.Router(); 

router.get("/complex", complexController.getComplex);
router.post("/complex", complexController.postComplex);
router.put("/complex/:id", complexController.putComplex);
router.delete("/complex/:id", complexController.deleteComplex);

module.exports = router;
//