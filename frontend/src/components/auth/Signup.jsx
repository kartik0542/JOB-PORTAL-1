import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, resetLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Page open hote hi loading reset
  useEffect(() => {
    dispatch(resetLoading());
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error();
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-6 text-gray-800">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="my-3">
            <Label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Fullname"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="my-3">
            <Label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Email"
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="my-3">
            <Label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="PhoneNumber"
              className="w-full"
            />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full"
            />
          </div>

          {/* Role + Profile Photo */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-4">
            {/* Role Radio */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">
                Role
              </Label>
              <RadioGroup className="flex items-center gap-5">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"
                  />
                  <Label className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"
                  />
                  <Label className="cursor-pointer">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-gray-700">
                Profile Photo
              </Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer text-sm w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button disabled className="w-full my-4 bg-[#6A38C2]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#6A38C2] hover:bg-[#5B30a6]"
            >
              Signup
            </Button>
          )}

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#6A38C2] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
