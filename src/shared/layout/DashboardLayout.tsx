import React from "react";
import logo from "../../assets/logo.png";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <>
      <div>
        <div className="w-[250px] h-dvh bg-blue-100">
          <div className="flex w-full justify-center h-20 items-center">
            <img src={logo} className="w-16 h-16" />
          </div>
          <div className="flex w-full justify-center items-center mt-5 px-5">
            <Button text="New Invoice" fullWidth leftSection={<FaPlus />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
