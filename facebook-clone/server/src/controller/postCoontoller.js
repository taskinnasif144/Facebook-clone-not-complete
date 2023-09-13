import postModel from "../models/posts.js";
import userModel from "../models/user.js";
import commentModel from "../models/comment.js";

export const createPost = async (req, res) => {
  const { userID, caption, image } = req.body;
  const newPost = new postModel({
    userOwner: userID,
    caption: caption,
    image: image,
    likes: [],
    comments: [],
  });
  try {
    const post = await newPost.save();

    const user = await userModel.findOne({ _id: userID });
    if (user) {
      user.ownPosts.push(post._id);
      await user.save();
    }
    res.json({ post: newPost });
  } catch (error) {
    console.error(error);
  }
};

export const getAllPosts = async (req, res) => {
  let posts;

  try {
    posts = await postModel.find({});
    posts.reverse();
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id, uid } = req.params;

  try {
    const post = await postModel.findOne({ _id: id });
    if (post.userOwner == uid) {
      const deletedPost = await postModel.findByIdAndDelete(id);
      const user = await userModel.findOne({ _id: uid });

      if (deletedPost) {
        if (user.ownPosts.includes(id)) {
          user.ownPosts.remove(id);
          user.save();
        }
        if (user.savedPosts.includes(id)) {
          user.savedPosts.remove(id);
          user.save();
        }
        res.json({ message: "Post has been deleted successfully" });
      } else {
        res.json({ message: "Post not found or already deleted" });
      }
    } else {
      res.json({ message: "You are not authorized to delete this post" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to delete the post" });
  }
};

export const updateLike = async (req, res) => {
  const { postID, userID } = req.body;
  try {
    const post = await postModel.findOne({ _id: postID });
    if (post) {
      if (post.likes.includes(userID)) {
        post.likes.remove(userID);
        res.json({ message: "0" });
      } else {
        post.likes.push(userID);
        res.json({ message: "1" });
      }
      await post.save();
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to delete the post" });
  }
};

export const findPostOwner = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findOne({ _id: uid });
    if (user) {
      res.json({ name: user.name, dp: user.dp });
    }
  } catch (error) {
    console.log(error);
  }
};

export const shuffleSavedPost = async (req, res) => {
  const { userID, postID } = req.body;

  try {
    const user = await userModel.findOne({ _id: userID });
    if (user) {
      if (user.savedPosts.includes(postID)) {
        user.savedPosts.remove(postID);
        res.json({ message: "0" });
      } else {
        user.savedPosts.push(postID);
        res.json({ message: "1" });
      }
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPost = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userModel.findOne({ _id: uid });
    if (user) {
      const savedPosts = user.savedPosts;
      res.json({ saved: savedPosts });
    } else {
      res.json({ message: "Find User Failed" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

export const getPostData = async (req, res) => {
  const { pid } = req.params;
  try {
    const post = await postModel.findOne({ _id: pid });
    if (post) {
      res.json(post);
    } else {
      res.json({ message: "Finding Post Failed" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const isPostSaved = async (req, res) => {
  const { pid, uid } = req.params;

  try {
    const user = await userModel.findOne({ _id: uid });
    if (user) {
      if (user.savedPosts.includes(pid)) {
        res.json({ message: "1" });
      } else {
        res.json({ message: "0" });
      }
    }
  } catch (error) {}
};

export const createComment = async (req, res) => {
  const { text, image, userOwner } = req.body;
  const { pid } = req.params;

  const newComment = new commentModel({
    text,
    image,
    userOwner,
  });

  try {
    const comment = await newComment.save();

    const post = await postModel.findOne({ _id: pid });
    if (post) {
      post.comments.push(comment._id);
      await post.save();
      res.json({ message: "1" });
    }
  } catch (error) {
    res.json({ message: "0" });
  }
};

export const getComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await commentModel.findOne({ _id: id });
    if (comment) {
      const user = await userModel.findOne({ _id: comment.userOwner });
      if (user) {
        res.json({
          username: user.name,
          userdp: user.dp,
          comment: comment.text,
          commentImg: comment.image,
          created: comment.createdAt,
        });
      }
    }
  } catch (error) {
    res.json({ message: "Danger" });
  }
};
