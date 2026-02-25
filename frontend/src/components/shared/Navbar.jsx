import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredential: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error();
      toast.error(error.response.data.message);
    }
  };

  const navLinks =
    user && user?.role === "recruiter" ? (
      <>
        <li>
          <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>
            Companies
          </Link>
        </li>
        <li>
          <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/browse" onClick={() => setMenuOpen(false)}>
            Browse
          </Link>
        </li>
      </>
    );

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">{navLinks}</ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className=" cursor-pointer bg-[#6A38C2] hover:bg-[#5B30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="grayscale"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 items-center space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="grayscale"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user?.role === "student" && (
                    <div className="flex items-center">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center">
                    <LogOut />
                    <Button
                      variant="link"
                      className="cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="grayscale"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex gap-2 items-center space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="grayscale"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user?.role === "student" && (
                    <div className="flex items-center">
                      <User2 />
                      <Button variant="link" className="cursor-pointer">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center">
                    <LogOut />
                    <Button
                      variant="link"
                      className="cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 shadow-md">
          <ul className="flex flex-col font-medium gap-4 text-gray-700">
            {navLinks}
          </ul>

          {!user && (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5B30a6] cursor-pointer">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
