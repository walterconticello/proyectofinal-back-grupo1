import express from "express";
import dotenv from "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import fieldsRoute from "./routes/fields.routes.js";
import productsRoute from "./routes/products.route.js";
import salesRoute from "./routes/sales.route.js";
import usersRoute from "./routes/users.route.js";
import commentsRoute from "./routes/comments.routes.js";
import reservationroutes from "./routes/reservation.routes.js";
import complexRouter from "./routes/sportCenter.routes.js";
import connectDB from "./database/db.js";
import fileUpload from "express-fileupload";

// dotenv.config();

const app = express();

app.set("port", process.env.PORT || 5500);

const initApp = async () => {
  try {
    await connectDB();
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

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api", fieldsRoute);
app.use("/api", productsRoute);
app.use("/api", salesRoute);
app.use("/api", commentsRoute);
app.use("/api", reservationroutes);
app.use("/api", complexRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo esta mal!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
