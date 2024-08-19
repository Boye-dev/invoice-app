import Button from "../shared/components/Button";
import { FaVideo } from "react-icons/fa";
import logo from "../assets/logo.png";
import page from "../assets/page.png";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../constants/routes";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-dvh pb-10 md:pb-0 bg-[url(/src/assets/confetti.png)]">
      <div className="flex justify-between items-center px-10 h-[80px] mb-10">
        <img src={logo} className="w-16 h-16" />

        <div className="flex gap-5 items-center">
          <Button text="Login" onClick={() => navigate(AUTH_ROUTES.LOGIN)} />
        </div>
      </div>
      <div className="flex flex-col items-center w-full min-h-[calc(100dvh-80px-60dvh)] ">
        <p className="font-extrabold text-6xl md:text-8xl text-center">
          All your payments{" "}
        </p>
        <p className="font-extrabold text-6xl md:text-8xl text-center">
          {" "}
          in one dashboard
        </p>
        <p className="text-slate-500 text-center text-xl">
          Manage all your invoices, quotations and products in one dashboard
        </p>
        <div className="flex items-center gap-5 mt-10 ">
          <Button
            text="Get started"
            onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
          />
          <Button
            text="See how it works"
            leftSection={<FaVideo />}
            variant="outlined"
          />
        </div>
      </div>
      <div className="flex justify-center mt-10 px-5 md:px-0">
        <img
          src={page}
          className="w-[700px] h-auto border border-slate-700 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Home;
