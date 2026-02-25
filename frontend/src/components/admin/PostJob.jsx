import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formFields = [
  { label: "Title", name: "title", type: "text" },
  { label: "Description", name: "description", type: "text" },
  { label: "Requirements", name: "requirements", type: "text" },
  { label: "Salary", name: "salary", type: "text" },
  { label: "Location", name: "location", type: "text" },
  { label: "Job Type", name: "jobType", type: "text" },
  { label: "Experience Level", name: "experience", type: "text" },
  { label: "No of Positions", name: "position", type: "number" },
];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const validateForm = () => {
    if (!input.title.trim()) return "Title is required";
    if (!input.description.trim()) return "Description is required";
    if (!input.requirements.trim()) return "Requirements are required";
    if (!input.salary.trim()) return "Salary is required";
    if (!input.location.trim()) return "Location is required";
    if (!input.jobType.trim()) return "Job Type is required";
    if (!input.experience.trim()) return "Experience level is required";
    if (!input.position || input.position <= 0)
      return "Position must be greater than 0";
    if (!input.companyId) return "Please select a company";
    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <form
          onSubmit={submitHandler}
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 md:p-8"
        >
          {/* Heading */}
          <h1 className="font-bold text-xl md:text-2xl text-gray-800 mb-6">
            Post a New Job
          </h1>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formFields.map(({ label, name, type }) => (
              <div key={name}>
                <Label className="block mb-1 text-sm font-medium text-gray-700">
                  {label}
                </Label>
                <Input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={changeEventhandler}
                  className="w-full focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </div>
            ))}

            {/* Company Select */}
            {companies.length > 0 && (
              <div className="sm:col-span-2">
                <Label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Company
                </Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* No Company Warning */}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center mt-4">
              * Please register a company first before posting a job.
            </p>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            {loading ? (
              <Button disabled className="w-full bg-[#6A38C2]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5B30a6]"
              >
                Post New Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
