import { useEffect, useState } from "react";
import axios from "axios";
import {
  IUserDecoded,
  getDecodedJwt,
  getDecodedRefreshJwt,
  getRefreshToken,
  removeToken,
  setToken,
} from "../api/Auth";
import { baseURL } from "../api/Api";

const useRoleAuthentication = (): {
  loading: boolean;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  decodedToken?: IUserDecoded;
} => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const decodedToken = getDecodedJwt();
  const refreshJwt = async () => {
    const response = await axios.post(`${baseURL}/users/refresh`, {
      token: getRefreshToken(),
    });
    setToken(response.data.data.accessToken);
    setAuthenticated(true);
    setLoading(false);
  };
  useEffect(() => {
    if (decodedToken && decodedToken.id) {
      const { exp } = decodedToken;

      if (exp) {
        if (exp * 1000 > Date.now()) {
          setLoading(false);
          setAuthenticated(true);
        } else {
          const decodedRefreshToken = getDecodedRefreshJwt();
          const { exp: refreshExpiry } = decodedRefreshToken;
          if (refreshExpiry) {
            if (refreshExpiry * 1000 > Date.now()) {
              try {
                refreshJwt();
              } catch (e) {
                removeToken();
                setLoading(false);
                setAuthenticated(false);
              }
            } else {
              removeToken();
              setLoading(false);
              setAuthenticated(false);
            }
          } else {
            removeToken();
            setLoading(false);
            setAuthenticated(false);
          }
        }
      }
    } else {
      setLoading(false);
      setAuthenticated(false);
    }
  }, []);
  return {
    loading,
    authenticated,
    // ...(role.includes(decodedToken.role as keyof typeof RolesEnum) && {
    //   decodedToken,
    // }),
    setAuthenticated,
  };
};

export default useRoleAuthentication;
