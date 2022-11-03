import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from "../Controllers/HotelController.js";
import { verifyAdmin } from "../Utils/Verify.js";

const router = express.Router();

// GET Hotel
router.get("/get/:id", getHotel);

// ADD Hotel
router.post("/create", verifyAdmin, createHotel);

// DELETE Hotel
router.delete("/delete/:id", verifyAdmin, deleteHotel);

// UPDATE Hotel
router.put("/update/:id", verifyAdmin, updateHotel);

// GET ALL Hotels
router.get("/getall", getAllHotel);

export default router;
