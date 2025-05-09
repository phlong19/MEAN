import { Schema, model } from 'mongoose';
import { Post as PostSchema } from '../../app/post.model';

const postSchema = new Schema<PostSchema>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = model('post', postSchema, 'post');
export default Post;
