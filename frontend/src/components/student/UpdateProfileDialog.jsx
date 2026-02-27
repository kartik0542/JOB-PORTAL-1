import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const fields = [
  { id: "name", label: "Name", name: "fullname", type: "text" },
  { id: "email", label: "Email", name: "email", type: "email" },
  { id: "number", label: "Number", name: "phoneNumber", type: "text" },
  { id: "bio", label: "Bio", name: "bio", type: "text" },
  { id: "skills", label: "Skills", name: "skills", type: "text" },
];

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(", "),
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[95vw] max-w-lg rounded-xl p-5 md:p-6"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-3">
            {/* Text Fields */}
            {fields.map(({ id, label, name, type }) => (
              <div
                key={id}
                className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-1 sm:gap-4"
              >
                <Label
                  htmlFor={id}
                  className="text-left sm:text-right font-medium text-sm text-gray-600"
                >
                  {label}
                </Label>
                <Input
                  id={id}
                  name={name}
                  type={type}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="sm:col-span-3"
                />
              </div>
            ))}

            {/* Resume Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-1 sm:gap-4">
              <Label
                htmlFor="file"
                className="text-left sm:text-right font-medium text-sm text-gray-600"
              >
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="sm:col-span-3 cursor-pointer text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              {loading ? (
                <Button disabled className="w-full sm:flex-1">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full sm:flex-1 bg-[#6A38C2] hover:bg-[#5B30a6]"
                >
                  Update
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
