import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 my-8 md:my-10">
        {/* Heading */}
        <h1 className="font-bold text-lg md:text-xl my-5 md:my-8 text-gray-800">
          Search Results{" "}
          <span className="text-[#6A38C2]">({allJobs.length})</span>
        </h1>

        {/* Jobs Grid */}
        {allJobs.length <= 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-lg">No jobs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
