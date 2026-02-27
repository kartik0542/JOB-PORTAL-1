import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "N/A";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 md:p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full">
      
      {/* Top Row - Date & Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {/* <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button> */}
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-base md:text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-base md:text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold text-xs" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold text-xs" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold text-xs" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 md:gap-4 mt-4">
        <Button
          onClick={() => navigate(`/jobs/description/${job?._id}`)}
          variant="outline"
          className="bg-white text-[#7209b7] flex-1 md:flex-none text-sm hover:bg-[#5f078f] hover:text-white"
        >
          Details
        </Button>
        {/* <Button
          className="bg-[#7209b7] text-white flex-1 md:flex-none text-sm hover:bg-[#5f078f]"
          variant="outline"
        >
          Save For Later
        </Button> */}
      </div>
    </div>
  );
};

export default Job;