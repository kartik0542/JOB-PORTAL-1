import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// CREATE COMPANY 
export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // check recruiter : Only recruiter can create company
    const userId = req.id; // auth middleware se aata hai
    const user = await User.findById(userId);
    if (!user || user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can create company",
        success: false,
      });
    }

    // check company already exists
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }

    // create company
    company = await Company.create({
      name,
      description,
      website,
      location,
      userId,
    });

    // recruiter profile me company attach karo
    user.profile.company = company._id;
    await user.save();

    return res.status(201).json({
      message: "Company register successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// GET ALL COMPANIES (RECRUITER)
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in hua he uska userid hai
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error();
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// GET COMPANY BY ID 
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// UPDATE COMPANY 
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;

    let updateData = { name, description, website, location };

    // Agar file hai tabhi upload karo
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error();
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
