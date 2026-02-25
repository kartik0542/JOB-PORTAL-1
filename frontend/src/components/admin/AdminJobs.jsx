import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 my-8 md:my-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-5">
          <div className="w-full sm:w-auto">
            <h1 className="text-xl font-bold text-gray-800 mb-3 md:hidden">
              Admin Jobs
            </h1>
            <Input
              className="w-full sm:w-64"
              placeholder="Filter by name, role..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5B30a6]"
          >
            + New Job
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
