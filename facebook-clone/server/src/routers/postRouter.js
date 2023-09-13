import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  updateLike,
  findPostOwner,
  shuffleSavedPost,
  getSavedPost,
  getPostData,
  isPostSaved,
  createComment,
  getComment,
} from "../controller/postCoontoller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/", getAllPosts);
router.get("/:pid", getPostData);
router.delete("/delete/:id/:uid", deletePost);
router.put("/updateLike", updateLike);
router.get("/user/:uid", findPostOwner);
router.put("/user/shuffleSavedPost", shuffleSavedPost);
router.get("/user/savedPosts/:uid", getSavedPost);
router.get("/user/isPostSaved/:pid/:uid", isPostSaved);
router.post("/user/comment/create/:pid", createComment);
router.get("/user/comment/get/:id", getComment);

export { router as postRouter };
