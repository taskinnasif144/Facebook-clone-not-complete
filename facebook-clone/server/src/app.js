import { userRouter } from "./routers/userRouter.js";
import { postRouter } from "./routers/postRouter.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const url =
  "mongodb+srv://DewanNasif:FbMern100@fb.lzksjxb.mongodb.net/fb?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => app.listen(3001))
  .then(() => console.log("Server connected and database is also connected"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/posts", postRouter);
