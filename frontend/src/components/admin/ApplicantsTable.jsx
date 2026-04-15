import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-175">
        <TableCaption className="text-sm text-gray-500 mb-2">
          A list of applicants for this job.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Full Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                {/* Full Name */}
                <TableCell className="font-medium">
                  <div>
                    {item?.applicant?.fullname}
                    <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                      {item?.applicant?.email}
                    </p>
                    <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                      {item?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="hidden sm:table-cell text-sm text-gray-600">
                  {item?.applicant?.email}
                </TableCell>

                {/* Contact */}
                <TableCell className="hidden md:table-cell text-sm text-gray-600">
                  {item?.applicant?.phoneNumber}
                </TableCell>

                {/* Resume - yahan <a> tag fix kiya */}
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline cursor-pointer text-sm"
                      href={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.applicant?.profile?.resume)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-red-400 text-sm">NA</span>
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="hidden sm:table-cell text-sm text-gray-600">
                  {item?.createdAt?.split("T")[0]}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-gray-100 transition">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer transition text-sm font-medium ${
                            status === "Accepted"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-gray-400"
              >
                No applicants yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
