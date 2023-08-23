import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoute from "./routes/auth.route.js"
import usersRoute from "./routes/users.route.js"
import privadoRoute from "./routes/private.route.js"
import mongoose from "mongoose";
import connect from "./database/db.js"
import { verifyToken, verifyUser } from "./utils/verifyToken.js";

const app = express();
dotenv.config()

app.listen(process.env.PORT, () => {
	connect()
	console.log("Conectado al backend");
})


//MIDDLEWARE


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use('/privado', verifyToken, privadoRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo esta mal!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

