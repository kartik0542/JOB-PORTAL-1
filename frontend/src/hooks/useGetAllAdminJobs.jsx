import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        console.log("ADMIN JOBS API RESPONSE:", res.data);

        if (res.data?.jobs) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);
        dispatch(setAllAdminJobs([]));  
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
