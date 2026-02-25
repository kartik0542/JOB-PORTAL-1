import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob); // student → job apply
router.route("/get").get(isAuthenticated, getAppliedJobs); // student → applied jobs dekhe
router.route("/:id/applicants").get(isAuthenticated, getApplicants); // recruiter → job applications dekhe
router.route("/status/:id/update").post(isAuthenticated, updateStatus); // recruiter → accept / reject kare

export default router;
