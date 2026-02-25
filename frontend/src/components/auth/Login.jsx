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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
          className="w-full sm:w-[80%] md:w-[55%] lg:w-[40%] bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-6 text-gray-800">
            Login
          </h1>

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

          {/* Role Selection */}
          <div className="my-4">
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Role
            </Label>
            <RadioGroup className="flex items-center gap-6">
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
              Login
            </Button>
          )}

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#6A38C2] font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
