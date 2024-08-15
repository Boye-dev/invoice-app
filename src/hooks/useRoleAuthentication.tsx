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
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
} => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [decodedToken, setDecodeToken] = useState<IUserDecoded | null>(
    getDecodedJwt()
  );
  useEffect(() => {
    const decoded = getDecodedJwt();
    setDecodeToken(decoded);
  }, [refresh]);
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
  }, [decodedToken]);
  return {
    loading,
    authenticated,
    ...(decodedToken && {
      decodedToken,
    }),
    setAuthenticated,
    refresh,
    setRefresh,
  };
};

export default useRoleAuthentication;
