import logo from "../../assets/logo.png";
const LoadingLogo = () => {
  return (
    <div>
      <img src={logo} className="animate-bounce animate-spin w-full h-full" />
    </div>
  );
};

export default LoadingLogo;
