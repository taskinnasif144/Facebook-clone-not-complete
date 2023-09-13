import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dp: String,
    cover: String,
    ownPosts: [mongoose.Schema.Types.ObjectId],
    friends: [mongoose.Schema.Types.ObjectId],
    friendRequests: [mongoose.Schema.Types.ObjectId],
    date: String,
    gender: String,
    savedPosts: [mongoose.Schema.Types.ObjectId],
    bio: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
