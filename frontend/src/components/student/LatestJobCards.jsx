import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/jobs/description/${job._id}`)}
      className="p-4 md:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-medium text-base md:text-lg">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title & Description */}
      <div className="mt-2">
        <h1 className="font-bold text-base md:text-lg my-1 md:my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="outline">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
