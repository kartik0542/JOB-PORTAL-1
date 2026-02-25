import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { name: companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-10">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-bold text-xl md:text-2xl text-gray-800">
              Your Company Name
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              What would you like to give your company name? You can change this
              later.
            </p>
          </div>

          {/* Input */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              type="text"
              className="my-2 w-full"
              placeholder="JobHunt, Microsoft etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              disabled={!companyName.trim()}
              className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5B30a6] disabled:opacity-50"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
