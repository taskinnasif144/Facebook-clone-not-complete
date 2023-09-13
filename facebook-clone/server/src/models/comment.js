import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text: String,
    image: String,
    userOwner: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
