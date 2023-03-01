const PostRouter = require("express").Router();
const { PostModel } = require("../Models/post.model");
const {UserModel} = require("../Models/user.model");

// Create a post

PostRouter.post("/", async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).send(err);
  }
});

// Update a post

PostRouter.put("/update/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Your post has been updated");
    } else {
      res.status(403).json("You can update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
PostRouter.delete("/delete/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("Your post has been deleted");
    } else {
      res.status(403).json("You can delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like/ disliked a post

PostRouter.put("/like/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Your post has been Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Your post has been disLiked");
    }
  } catch (error) {
    res.send(500).json(error);
  }
});

// get a post
PostRouter.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// getTimeLine Posts
PostRouter.get("/timeline/all", async (req, res) => {
  let postArray = [];
  try {

    const currentUser = await UserModel.findById(req.body.userId)
    const userPost = await PostModel.find({userId: currentUser._id})
    const friendPost = await Promise.all(
        currentUser.followings.map(friendId=>
            {
               return PostModel.find({userId: friendId})
            })
    )
    res.json(userPost.concat(...friendPost))

  } catch (error) {
    res.status(500).json(error);
  }
});

// get all posts

module.exports = { PostRouter };
