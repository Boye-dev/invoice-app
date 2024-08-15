import React, { createContext, useContext } from "react";
import useRoleAuthentication from "../hooks/useRoleAuthentication";
import { IUserDecoded } from "../api/Auth";

interface IUserContext {
  loading: boolean;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  decodedToken?: IUserDecoded;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}
const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    loading,
    authenticated,
    setAuthenticated,
    decodedToken,
    setRefresh,
    refresh,
  } = useRoleAuthentication();
  const contextValue = React.useMemo(
    () => ({
      loading,
      authenticated,
      decodedToken,
      setAuthenticated,
      setRefresh,
      refresh,
    }),
    [
      loading,
      authenticated,
      decodedToken,
      setAuthenticated,
      setRefresh,
      refresh,
    ]
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useAdmincontext must be used within a AdmincontextProvider"
    );
  }
  return context;
};
