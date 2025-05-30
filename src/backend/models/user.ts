import { Schema, model } from 'mongoose';
import { Models } from '../constant/constant';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model(Models.User.name, userSchema, Models.User.collection);
export default User;
