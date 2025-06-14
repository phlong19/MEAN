import { Schema, model } from 'mongoose';
import { Post as PostSchema } from '../../app/app.model';
import { Models } from '../constant/constant';

const postSchema = new Schema<PostSchema>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Post = model(Models.Post.name, postSchema, Models.Post.collection);
export default Post;
