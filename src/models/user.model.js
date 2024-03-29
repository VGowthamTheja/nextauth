import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Plase provide a username"],
      unique: [true, "Username already exists"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Plase provide an email"],
      unique: [true, "Email already exists"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Plase provide a password"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    methods: {
      getPublicFields() {
        return {
          id: this._id,
          username: this.username,
          email: this.email,
          isVerified: this.isVerified,
          isAdmin: this.isAdmin,
        };
      },
    },
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
