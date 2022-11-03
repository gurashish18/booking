import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/Verify.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("Hello user you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user you can CRUD your account");
// });

// router.get("/checkAdmin", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin you can CRUD all accounts");
// });

// GET USER
router.get("/get/:id", verifyUser, getUser);

// DELETE USER
router.delete("/delete/:id", verifyUser, deleteUser);

// UPDATE USER
router.put("/update/:id", verifyUser, updateUser);

// GET ALL USERS
router.get("/getall", verifyAdmin, getAllUsers);

export default router;
