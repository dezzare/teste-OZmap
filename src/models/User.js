import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  idade: { type: Number, required: true }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

export default User;
