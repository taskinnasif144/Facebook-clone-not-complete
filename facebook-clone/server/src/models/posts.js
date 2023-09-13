import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: String,
    image: String,
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [mongoose.Schema.Types.ObjectId],
    comments: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
