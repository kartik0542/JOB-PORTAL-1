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
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusColor = (status) => {
    if (status === "rejected") return "bg-red-400";
    if (status === "pending") return "bg-gray-400";
    return "bg-green-400";
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-120">
        <TableCaption className="text-sm text-gray-500 mb-2">
          A list of your applied jobs.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-400"
              >
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                {/* Date - hidden on mobile */}
                <TableCell className="hidden sm:table-cell text-sm text-gray-600">
                  {appliedJob.createdAt.split("T")[0]}
                </TableCell>

                {/* Job Role */}
                <TableCell className="font-medium">
                  <div>
                    {appliedJob.job.title}
                    {/* Date under title on mobile */}
                    <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                      {appliedJob.createdAt.split("T")[0]}
                    </p>
                  </div>
                </TableCell>

                {/* Company */}
                <TableCell className="text-sm text-gray-600">
                  {appliedJob.job.company.name}
                </TableCell>

                {/* Status */}
                <TableCell className="text-right">
                  <Badge
                    className={`${getStatusColor(appliedJob?.status)} text-white text-xs`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
