import mongoose from 'mongoose';

const commentlistSchema = new mongoose.Schema(
  {
    comment_code: {
      type: String,
      required: true,
      unique: true,
    },
    comment: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CommentList', commentlistSchema);
