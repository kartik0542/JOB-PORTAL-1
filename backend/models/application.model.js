import mongoose, { mongo } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // student
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    //   resume: {
    //     type: String, // resume URL cloudinary se
    //     required: true,
    //   },

    //   coverLetter: {
    //     type: String,
    //   },
  },
  { timestamps: true },
);

export const Application = mongoose.model("Application", applicationSchema);

// APPLICATION SCHEMA – “KIS STUDENT NE KIS JOB PE APPLY KIYA?”

