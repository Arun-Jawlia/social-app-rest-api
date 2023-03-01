const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 100,
    },
    img: { type: String },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
