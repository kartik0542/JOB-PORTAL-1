import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery} `,
          {
            withCredentials: true,
          },
        );

        if (res.data?.jobs) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(setAllJobs([]));
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
