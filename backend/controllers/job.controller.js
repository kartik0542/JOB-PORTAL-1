import { Job } from "../models/job.model.js";

// Admin (recruiter) new job create karega

export const postJob = async (req, res) => {
  try {
    // 🔹 Request body se job details nikal rahe hain
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // Logged-in user ka id (JWT middleware se aa raha hai)
    const userId = req.id;

    // Basic validation: koi required field missing na ho
    // experience === undefined isliye use kiya kyunki 0 valid ho sakta hai wo false dega is liye waha postjob hi nahi hogi
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      experience === undefined ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    // Database me new job create kar rahe hain
    const job = await Job.create({
      title,
      description,
      // requirements string ko array me convert kiya
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId, // recruiter/admin id
    });

    return res.status(201).json({
      message: "New Job created successfully",
      job,
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

// Job list with search (title / description) (student)

export const getAllJobs = async (req, res) => {
  try {
    // Query parameter se keyword le rahe hain
    const keyword = req.query.keyword || "";

    // Search query (case-insensitive)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    // Jobs fetch + company details + latest job first
    const jobs = await Job.find(query)
      .populate({
        path: "company", // company ka data bhi chahiye
      })
      .sort({ createdAt: -1 }); // latest job upar
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
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

// Job details page ke liye (student)

export const getJobById = async (req, res) => {
  try {
    // URL se job id le rahe hain
    const jobId = req.params.id;

    // Job find + company populate
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
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

// Admin dashboard ke liye

export const getAdminJobs = async (req, res) => {
  try {
    //  Admin id JWT middleware se aa rahi hai
    const adminId = req.id;

    //  Sirf wahi jobs jo is admin ne create ki hain
    //  Latest job upar dikhane ke liye sorting
    const jobs = await Job.find({ created_by: adminId })
      .sort({
        createdAt: -1, // -1 => newest first, 1 => oldest first
      })
      .populate({
        path: "company",
      });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
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
