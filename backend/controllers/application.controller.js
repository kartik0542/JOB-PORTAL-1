import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";


export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // logged-in student
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "job id is required.",
        success: false,
      });
    }

    // role check
    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(403).json({
        message: "Only students can apply for jobs",
        success: false,
      });
    }

    // job exist check
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    // already applied check
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // create application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // push application into job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
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

// STUDENT: GET MY APPLIED JOBS

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    // if (!application) {
    //   return res.status(404).json({
    //     message: "No Applications",
    //     success: false,
    //   });
    // } // find() kabhi null return nahi karta, empty array deta hai.
    if (application.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }
    return res.status(200).json({
      application,
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


// RECRUITER: GET APPLICATIONS FOR A JOB

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.id;

    // role check (sirf recruiter)
    const user = await User.findById(recruiterId);
    if (!user || user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applicants",
        success: false,
      });
    }

    // job find + applications populate
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // ownership check (job isi recruiter ki ho)
    if (job.created_by.toString() !== recruiterId) {
      return res.status(403).json({
        message: "You are not authorized to view applicants for this job",
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


// RECRUITER: UPDATE APPLICATION STATUS

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const recruiterId = req.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    //find the application by application id
    const application = await Application.findById(applicationId).populate({
      path: "job",
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // recruiter ownership check
    if (application.job.created_by.toString() !== recruiterId) {
      return res.status(403).json({
        message: "You are not authorized to update this application",
        success: false,
      });
    }

    // upadted status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully ",
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
