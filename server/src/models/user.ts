import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import UserInterface from './user.interface';

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Encrypt/hash password prior to saving user
UserSchema.pre('save', async function(next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  next();
});

// Compare passwords on login
UserSchema.methods.comparePasswords = async function(submittedPassword) {
  const user = this;

  try {
    return await bcrypt.compare(submittedPassword, user.password);
  } catch (error) {
    throw new Error(error);
  }
};
 
const User = mongoose.model<UserInterface & mongoose.Document>('User', UserSchema);
 
export default User;
