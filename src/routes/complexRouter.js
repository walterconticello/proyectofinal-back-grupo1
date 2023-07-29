import express from "express";
import complexController from "../controllers/complexController";

const router= express.Router(); 

router.post("/complex", complexController.postComplex,);
router.get("/complex", complexController.getAllComplex);
router.get("/complex/:id", complexController.getComplexById);
router.put("/complex/:id", complexController.putComplex);
router.delete("/complex/:id", complexController.deleteComplex);

module.exports = router;
