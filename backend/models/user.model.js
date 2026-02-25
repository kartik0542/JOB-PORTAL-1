import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // response me password na aaye
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student",
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // resume file URL
      resumeOriginalName: { type: String },
      experience: { type: Number, default: 0 },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // only recruiter
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

// USER SCHEMA – “KAUN HAI YE USER?”
