import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error();
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          dispatch(setSingleJob(null));
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const jobDetails = [
    { label: "Role", value: singleJob?.title },
    { label: "Location", value: singleJob?.location },
    { label: "Description", value: singleJob?.description },
    { label: "Experience", value: `${singleJob?.experience} Years` },
    { label: "Salary", value: `${singleJob?.salary} LPA` },
    { label: "Total Applicants", value: singleJob?.applications?.length },
    { label: "Posted Date", value: singleJob?.createdAt?.split("T")[0] },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-8 my-8 md:my-10">
        
        {/* Header - Title, Badges, Apply Button */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-bold text-xl md:text-2xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold" variant="outline">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="outline">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="outline">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg w-full sm:w-auto ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f178f]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Heading */}
        <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4">
          Job Description
        </h2>

        {/* Job Details */}
        <div className="flex flex-col gap-3">
          {jobDetails.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
            >
              <span className="font-bold text-gray-800 sm:min-w-40">
                {label} :
              </span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;