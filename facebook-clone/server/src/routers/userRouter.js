import express from "express";
import {
  createUser,
  loginUser,
  deleteUser,
  userDpSet,
  userCoverSet,
  getUserInfo,
  userBioSet,
} from "../controller/userController.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/userDpSet", userDpSet);
router.put("/userCoverSet", userCoverSet);
router.put("/userBioSet", userBioSet);
router.get("/getUserInfo/:uid", getUserInfo);

export { router as userRouter };
