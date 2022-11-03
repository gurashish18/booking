import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./Routes/AuthRoute.js";
import HotelRoute from "./Routes/HotelRoute.js";
import RoomRoute from "./Routes/RoomRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to DB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/hotels", HotelRoute);
app.use("/api/rooms", RoomRoute);

// error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to port!");
});
