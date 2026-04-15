import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

// salary range parse karne ka helper
const matchesSalary = (jobSalary, query) => {
  if (query === "0-5 LPA") return jobSalary >= 0 && jobSalary <= 5;
  if (query === "5-10 LPA") return jobSalary > 5 && jobSalary <= 10;
  if (query === "10-20 LPA") return jobSalary > 10 && jobSalary <= 20;
  if (query === "20+ LPA") return jobSalary > 20;
  return false;
};

const salaryQueries = ["0-5 LPA", "5-10 LPA", "10-20 LPA", "20+ LPA"];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!allJobs) return;

    if (searchedQuery) {
      // salary filter hai?
      if (salaryQueries.includes(searchedQuery)) {
        const filtered = allJobs.filter((job) =>
          matchesSalary(job?.salary, searchedQuery),
        );
        setFilterJobs(filtered);
      } else {
        // location / industry filter
        const filtered = allJobs.filter(
          (job) =>
            job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()),
        );
        setFilterJobs(filtered);
      }
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-5">
        {/* Mobile Filter Toggle */}
        <div className="flex md:hidden justify-between items-center mb-3">
          <p className="text-sm text-gray-500">
            {filterJobs.length} jobs found
          </p>
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-sm font-medium"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Mobile Drawer */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowFilter(false)}
            />
            <div className="relative z-10 w-[80%] max-w-xs bg-white h-full overflow-y-auto p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setShowFilter(false)}>
                  <X size={20} />
                </button>
              </div>
              <FilterCard />
            </div>
          </div>
        )}

        <div className="flex gap-5">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-[22%] sticky top-4 self-start">
            <FilterCard />
          </div>

          {/* Jobs Grid */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <p className="text-gray-500 text-lg">No jobs found</p>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
