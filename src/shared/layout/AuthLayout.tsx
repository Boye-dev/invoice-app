import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AUTH_ROUTES } from "../../constants/routes";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full min-h-dvh  p-5 md:p-0 md:py-10 flex justify-center items-center ">
        <div className="w-full md:w-[500px] shadow-md min-h-11 rounded-md p-5 flex flex-col items-center gap-5">
          <img
            src={logo}
            className="w-20 h-20 cursor-pointer"
            onClick={() => navigate(AUTH_ROUTES.HOME)}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
