import { Schema, model } from 'mongoose';
import { Models } from '../constant/constant';
import { User as UserSchema } from '../../app/app.model';

const userSchema = new Schema<UserSchema>({
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
