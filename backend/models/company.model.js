import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
    },

    website: {
      type: String,
    },

    location: {
      type: String,
    },

    logo: {
      type: String, // company logo URL from cloudinary
      default: "",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // recruiter
      required: true,
    },

    // jobs: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Job",
    //   },
    // ],
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);

// COMPANY SCHEMA – “RECRUITER KI COMPANY KAUNSI HAI?”

