import { Express } from "express";
import { ComplexController } from "../controllers/complexController";

const router= express.Router(); 

router.get("/", ComplexController.getComplex);
router.post("/", ComplexController.postComplex);
router.put("/:id", ComplexController.putComplex);
router.delete("/:id", ComplexController.deleteComplex);

module.exports = router;
//