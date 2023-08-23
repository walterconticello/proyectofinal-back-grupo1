import express from "express";

const router = express.Router();

router.get('/admin', (req, res) => {
	res.json({
		data: {
			title: "Ruta Privada",
			user: req.user
		}
	})
})

export default router