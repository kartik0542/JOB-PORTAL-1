import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-6 my-8 md:my-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-5">
          <div className="w-full sm:w-auto">
            <h1 className="text-xl font-bold text-gray-800 mb-3 sm:mb-0 md:hidden">
              Companies
            </h1>
            <Input
              className="w-full sm:w-64"
              placeholder="Filter by company name..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5B30a6]"
          >
            + New Company
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
