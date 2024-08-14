import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../services/user.service";
import { AUTH_ROUTES } from "../../constants/routes";
import LoadingLogo from "../../shared/components/LoadingLogo";
import Button from "../../shared/components/Button";

const Verify = () => {
  const { id = "", token = "" } = useParams();

  const navigate = useNavigate();
  const { isFetching, isError } = useQuery({
    queryKey: ["verify-user"],
    queryFn: () => verifyUser({ token, id }),
  });
  return (
    <>
      <div className="flex flex-col justify-center w-full h-dvh">
        <div className="flex items-center justify-center">
          {isFetching ? (
            <p className="text-center ">We are setting up your account</p>
          ) : isError ? (
            <p
              className="text-center cursor-pointer"
              onClick={() => navigate(AUTH_ROUTES.LOGIN)}
            >
              Error setting up your account. Login?
            </p>
          ) : (
            <p
              className="text-center cursor-pointer"
              onClick={() => navigate(AUTH_ROUTES.LOGIN)}
            >
              Account setup complete Login?
            </p>
          )}
          {isFetching && (
            <div className="ml-10 w-20">
              <LoadingLogo />
            </div>
          )}
        </div>

        {isError || isFetching || (
          <>
            <div className="flex flex-col items-center justify-center">
              <p className="text-center my-5 font-bold ">
                Welcome to the Incoice App
              </p>

              <Button
                text="Login"
                size="md"
                onClick={() => navigate(AUTH_ROUTES.LOGIN)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Verify;
