import logo from "../../assets/logo.png";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import { navItems } from "../../constants/navItems";
import SidebarItems from "../components/SidebarItems";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_PATHS } from "../../constants/routes";
import { convertAllLowercaseToSentenceCase } from "../../utils/textHelpers";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex relative">
        <div className="hidden md:block w-[250px] h-dvh bg-blue-50 sticky left-0 top-0">
          <div className="flex w-full justify-center h-[100px] items-center">
            <img src={logo} className="w-16 h-16" />
          </div>
          <div className="flex w-full justify-center items-center  px-5  h-[100px]">
            <Button
              text="New Invoice"
              fullWidth
              leftSection={<FaPlus />}
              onClick={() => navigate(DASHBOARD_PATHS.NEW_INVOICE)}
            />
          </div>
          <div className="flex flex-col justify-between h-[calc(100dvh-200px)] overflow-auto gap-20">
            <div className="px-5 ">
              {navItems
                .filter((item) => !item.bottom)
                .map((value) => {
                  return (
                    <SidebarItems
                      key={value.name}
                      data={value}
                      active={value.path === location.pathname}
                    />
                  );
                })}
            </div>
            <div className="px-5 ">
              {navItems
                .filter((item) => item.bottom)
                .map((value) => {
                  return (
                    <SidebarItems
                      key={value.name}
                      data={value}
                      active={value.path === location.pathname}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[calc(100%-250px)] min-h-dvh">
          <div className="w-full h-[80px] bg-blue-50 flex justify-between items-center px-10 sticky top-0">
            <p className="text-2xl font-bold">
              {navItems.find((item) => location.pathname === item.path)
                ? navItems.find((item) => location.pathname === item.path)?.name
                : convertAllLowercaseToSentenceCase(
                    location.pathname
                      .split("/")[1]
                      .replace(/-/g, " ")
                      .replace(/\//g, "")
                  )}
            </p>
            <div className="flex items-center">
              <img src={logo} className="w-12 h-18 rounded-full" />
              <p className="text-md font-bold ml-3">Oyelola Adeboye</p>
            </div>
          </div>
          <div className="bg-slate-50 h-[calc(100%-80px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
