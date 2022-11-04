import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../Controllers/RoomController.js";
import { verifyAdmin } from "../Utils/Verify.js";

const router = express.Router();

// GET ROOM
router.get("/get/:id", getRoom);

// ADD ROOM
router.post("/create/:hotelid", verifyAdmin, createRoom);

// DELETE ROOM
router.delete("/delete/:id/:hotelid", verifyAdmin, deleteRoom);

// UPDATE ROOM
router.put("/update/:id", verifyAdmin, updateRoom);

// GET ALL ROOMS
router.get("/getall", getAllRooms);

export default router;
