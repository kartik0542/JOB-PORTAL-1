import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allAdminJobs) return;

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-130">
        <TableCaption className="text-sm text-gray-500 mb-2">
          A list of your recent posted jobs.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {job?.company?.name}
                </TableCell>
                <TableCell>
                  <div>
                    {job?.title}
                    {/* Date under role on mobile */}
                    <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                      {job?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600 text-sm">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-gray-100 transition">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2">
                      {/* <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Edit</span>
                      </div> */}
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer transition mt-1"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-400"
              >
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
