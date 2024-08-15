import logo from "../../assets/logo.png";
import Button from "../components/Button";
import { FaBars, FaPlus } from "react-icons/fa";
import { navItems } from "../../constants/navItems";
import SidebarItems from "../components/SidebarItems";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, DASHBOARD_PATHS } from "../../constants/routes";
import { convertAllLowercaseToSentenceCase } from "../../utils/textHelpers";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import clsx from "clsx";
import { useUserContext } from "../../contexts/UserContext";
import LoadingLogo from "../components/LoadingLogo";

const DashboardLayout = () => {
  const { loading, authenticated, decodedToken } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dashboardStyles = "bg-blue-50 left-0 z-[3000]";
  const combinedDashboardStyles = clsx(dashboardStyles, {
    "w-full md:w-[250px] top-[70px] h-dvh md:top-0 hidden md:block md:sticky":
      !open,
    "fixed top-[70px] md:top-0 w-full md:w-[250px] md:sticky h-dvh overflow-auto":
      open,
  });
  const close = () => {
    setOpen(false);
  };
  return loading ? (
    <div className="fixed bg-white w-full h-dvh flex justify-center items-center top-0">
      <div className="w-20">
        <LoadingLogo />
      </div>
    </div>
  ) : !authenticated ? (
    <Navigate to={AUTH_ROUTES.LOGIN} />
  ) : (
    <>
      <div className="flex relative">
        <div className={combinedDashboardStyles}>
          <div className="flex w-full justify-center md:h-[100px] items-center">
            <img src={logo} className="w-16 h-16 hidden md:block" />
          </div>
          <div className="flex w-full justify-center items-center  px-5  h-[100px]">
            <Button
              text="New Invoice"
              fullWidth
              leftSection={<FaPlus />}
              onClick={() => {
                close();
                navigate(DASHBOARD_PATHS.NEW_INVOICE);
              }}
            />
          </div>
          <div className="flex flex-col justify-between h-[calc(100dvh-200px)] overflow-auto gap-20">
            <div className="px-5 ">
              {navItems
                .filter((item) => !item.bottom)
                .map((value) => {
                  return (
                    <SidebarItems
                      close={close}
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
                      close={close}
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
          <div className="w-full h-[80px] bg-blue-50 flex justify-between items-center px-10 sticky top-0 z-[3000] ">
            <p className="text-lg md:text-2xl font-bold">
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
              <img
                src={decodedToken?.profilePicture}
                className="w-10 h-10 rounded-full "
              />
              <p className="text-md font-bold ml-3">
                {decodedToken?.firstname} {decodedToken?.lastname}
              </p>
            </div>
            <div onClick={() => setOpen(!open)} className="md:hidden">
              {open ? <FaXmark /> : <FaBars />}
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
