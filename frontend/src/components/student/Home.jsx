import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlertCircle, X, ChevronRight } from "lucide-react";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "student") {
      const isBioMissing = !user?.profile?.bio;
      const isSkillsMissing =
        !user?.profile?.skills || user.profile.skills.length === 0;
      const isResumeMissing = !user?.profile?.resume;

      if (isBioMissing || isSkillsMissing || isResumeMissing) {
        setShowBanner(true);
      }
    }
  }, [user]);

  // Konsi fields missing hain
  const missingFields = [];
  if (!user?.profile?.bio) missingFields.push("Bio");
  if (!user?.profile?.skills || user.profile.skills.length === 0)
    missingFields.push("Skills");
  if (!user?.profile?.resume) missingFields.push("Resume");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Profile Completion Banner */}
      {showBanner && user?.role === "student" && (
        <div className="bg-[#f3eeff] border-b border-[#c4b5fd]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <AlertCircle className="text-[#6A38C2] flex-shrink-0" size={20} />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                <p className="text-sm font-semibold text-[#3b1f8c]">
                  Complete Your Profile
                </p>
                <p className="text-sm text-gray-600 truncate">
                  <span className="font-medium text-[#6A38C2]">
                    {missingFields.join(", ")}
                  </span>{" "}
                  missing — help recruiters discover you faster.
                </p>
              </div>
            </div>

            {/* Right: CTA + Close */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-1 bg-[#6A38C2] hover:bg-[#5B30a6] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                Update Profile
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-white/60 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        <HeroSection />
        <CategoryCarousel />
        <LatestJob />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
