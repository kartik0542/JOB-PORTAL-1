import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const isResume = true;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-0 my-5">

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8">

          {/* Top Row - Avatar, Name, Edit Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 shrink-0">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="font-medium text-lg md:text-xl">{user?.fullname}</h1>
                <p className="text-gray-500 text-sm mt-1">{user?.profile?.bio}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="shrink-0"
            >
              <Pen className="w-4 h-4" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="my-5 space-y-2">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-4 h-4 shrink-0 text-gray-500" />
              <span className="text-sm md:text-base break-all">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="w-4 h-4 shrink-0 text-gray-500" />
              <span className="text-sm md:text-base">{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="my-5">
            <h1 className="font-semibold text-gray-800 mb-2">Skills</h1>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span className="text-gray-400 text-sm">NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="my-5">
            <Label className="text-sm font-bold text-gray-800">Resume</Label>
            <div className="mt-1">
              {isResume ? (
                <a
                  target="blank"
                  href={user?.profile?.resume}
                  className="text-blue-500 text-sm hover:underline cursor-pointer break-all"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-400 text-sm">NA</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-2xl mt-5">
          <h1 className="font-bold text-lg my-4">Applied Jobs</h1>
          <div className="overflow-x-auto">
            <AppliedJobTable />
          </div>
        </div>

      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;