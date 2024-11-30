import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model<UserInterface>("User", UserSchema);
