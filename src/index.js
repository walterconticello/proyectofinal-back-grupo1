import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./database/db";
import cookieParser from "cookie-parser";

const app = express();

app.set("port", process.env.PORT || 5500);

const initApp = async () => {
  try {
    await connectDb();
    app
      .listen(app.get("port"), () => {
        console.log(`Backend conectado al puerto: ${app.get("port")}`);
      })
      .on("error", (error) => {
        console.log("ERROR:", error);
        process.exit(1);
      });
  } catch (error) {
    console.log("ERROR:", error);
    process.exit(1);
  }
};

initApp();

//MIDDLEWARE
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo esta mal!"
  return res.status(errorStatus).json ({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Descomentar cuando tengamos las rutas
// app.use("/api", require("./routes/Rutes"));
